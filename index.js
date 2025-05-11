import { CONFIG } from "./config.js";
import {
  processData,
  processEventData,
  processVideoData,
} from "./services/processService.js";

let isRunning = false;

async function main() {
  try {
    if (!isRunning) {
      console.log(
        `게시물 감지가 시작되었습니다. ${new Date().toLocaleString()}`
      );
      isRunning = true;
    }

    await processData("notice", CONFIG.notice);
    await processData("update", CONFIG.update);
    await processEventData("event", CONFIG.event);
    await processData("winner", CONFIG.winner);
    await processData("pierrot", CONFIG.pierrot);
    await processData("issue", CONFIG.issue);
    await processData("league", CONFIG.league);
    await processVideoData("video", CONFIG.video);
  } catch (error) {
    console.error("처리 중 오류가 발생했습니다:", error);
  }
}

// 10초마다 main 함수 실행
setInterval(main, 10000);

// 초기 실행
main();
