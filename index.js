import axios from "axios";
import { CHECK_INTERVAL, TR_API_URLS, TR_BASE_URLS } from "./config.js";
import { NotificationService } from "./services/notificationService.js";
import { StorageService } from "./services/storageService.js";

let isChecking = false;

const TR_URLS = {
  NOTICE: (id) => `${TR_BASE_URLS.NOTICE}/${id}?page=1`,
  UPDATE: (id) => `${TR_BASE_URLS.UPDATE}/${id}?page=1`,
  EVENT: (link) => `${TR_BASE_URLS.EVENT}${link}`,
  WINNER: (id) => `${TR_BASE_URLS.WINNER}/${id}?page=1`,
  PIERROT: (id) => `${TR_BASE_URLS.PIERROT}/${id}?page=1`,
  ISSUE: (id) => `${TR_BASE_URLS.ISSUE}/${id}?page=1`,
  LEAGUE: (id) => `${TR_BASE_URLS.LEAGUE}/${id}?page=1`,
};

async function checkNewPosts(type, response, previous, getContent) {
  const newPosts = [];

  for (const post of response.data.result.list) {
    if (!post) {
      continue;
    }
    if (getContent(post) === getContent(previous[type])) {
      break;
    }

    newPosts.push(post);
  }
  return newPosts;
}

async function checkUpdate() {
  if (isChecking) {
    console.error("타이머가 이미 실행중입니다.");
    return;
  }

  try {
    isChecking = true;

    const responses = await Promise.all(
      Object.values(TR_API_URLS).map((url) => axios.get(url))
    );

    const previous = await StorageService.loadWatchList();
    const newPosts = {};

    // 각 타입별로 새로운 게시글 확인
    const types = [
      "NOTICE",
      "UPDATE",
      "EVENT",
      "WINNER",
      "PIERROT",
      "ISSUE",
      "LEAGUE",
    ];
    const contentGetters = {
      NOTICE: (post) => post.subject,
      UPDATE: (post) => post.subject,
      EVENT: (post) => post.subject,
      WINNER: (post) => post.subject,
      PIERROT: (post) => post.subject,
      ISSUE: (post) => post.subject,
      LEAGUE: (post) => post.subject,
    };

    const dateGetters = {
      NOTICE: (post) => post.startAt,
      UPDATE: (post) => post.startAt,
      EVENT: (post) => ({ startAt: post.startAt, endAt: post.endAt }),
      WINNER: (post) => post.startAt,
      PIERROT: (post) => post.startAt,
      ISSUE: (post) => post.startAt,
      LEAGUE: (post) => post.startAt,
    };

    for (let i = 0; i < types.length; i++) {
      const type = types[i];

      newPosts[type] = await checkNewPosts(
        type.toLowerCase(),
        responses[i],
        previous,
        contentGetters[type]
      );
    }

    // 새로운 게시글 알림 전송
    for (const type of types) {
      const posts = newPosts[type].reverse();

      for (const post of posts) {
        const content = contentGetters[type](post);
        const date = dateGetters[type](post);
        const url = TR_URLS[type](type === "EVENT" ? post.link : post.id);
        const imageUrl = type === "EVENT" ? post.imageUrl : undefined;

        await NotificationService.sendDiscordNotification(
          content,
          url,
          type,
          date,
          imageUrl
        );
      }
    }

    // 가장 최근 게시글 저장
    const latestPosts = Object.fromEntries(
      types.map((type, index) => [
        type.toLowerCase(),
        responses[index].data.result.list[0],
      ])
    );

    await StorageService.saveWatchList(latestPosts);
  } catch (error) {
    console.error("에러 발생: ", error.message);
  } finally {
    isChecking = false;
  }
}

setInterval(checkUpdate, CHECK_INTERVAL);
checkUpdate();
