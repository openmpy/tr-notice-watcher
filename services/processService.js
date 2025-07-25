import { fetchData, fetchEventData } from "./api.js";
import {
  sendDiscordEventNotification,
  sendDiscordNotification,
  sendDiscordVideoNotification,
} from "./discordService.js";
import { readExistingData, saveData } from "./fileService.js";

export async function processData(type, config) {
  const newList = await fetchData(config);
  const existingList = await readExistingData(config.dataFile);

  if (existingList.length > 0) {
    const existingIds = new Set(existingList.map((item) => item.id));
    const newItems = newList
      .filter((item) => !existingIds.has(item.id))
      .sort((a, b) => a.id - b.id);

    if (newItems.length > 0) {
      console.log(`새로운 ${type}가 ${newItems.length}개 있습니다.`);

      const urls = config.baseUrl.split(",");
      const names = ["라온", "한게임", "스토브"];

      for (const item of newItems) {
        await sendDiscordNotification(
          config.webhookUrl,
          item.startAt,
          item.subject,
          names,
          urls,
          item.id
        );
      }
    }
  }

  await saveData(config.dataFile, newList);
}

export async function processEventData(type, config) {
  const newList = await fetchEventData(config);
  const existingList = await readExistingData(config.dataFile);

  if (existingList.length > 0) {
    const existingIds = new Set(existingList.map((item) => item.id));
    const newItems = newList
      .filter((item) => !existingIds.has(item.id))
      .sort((a, b) => a.id - b.id);

    if (newItems.length > 0) {
      console.log(`새로운 ${type}가 ${newItems.length}개 있습니다.`);

      const urls = config.baseUrl.split(",");
      const names = ["라온", "한게임", "스토브"];

      for (const item of newItems) {
        await sendDiscordEventNotification(
          config.webhookUrl,
          item.subject,
          names,
          urls,
          item.link,
          item.startAt,
          item.endAt,
          item.imageUrl
        );
      }
    }
  }

  await saveData(config.dataFile, newList);
}

export async function processVideoData(type, config) {
  const newList = await fetchEventData(config);
  const existingList = await readExistingData(config.dataFile);

  if (existingList.length > 0) {
    const existingIds = new Set(existingList.map((item) => item.id));
    const newItems = newList
      .filter((item) => !existingIds.has(item.id))
      .sort((a, b) => a.id - b.id);

    if (newItems.length > 0) {
      console.log(`새로운 ${type}가 ${newItems.length}개 있습니다.`);

      for (const item of newItems) {
        await sendDiscordVideoNotification(
          config.webhookUrl,
          item.subject,
          item.link,
          item.imageUrl
        );
      }
    }
  }

  await saveData(config.dataFile, newList);
}
