import { fetchData, fetchEventData } from "./api.js";
import {
  sendDiscordEventNotification,
  sendDiscordNotification,
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

      for (const item of newItems) {
        await sendDiscordNotification(
          config.webhookUrl,
          item.subject,
          `${config.baseUrl}/${item.id}`,
          item.startAt
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

      for (const item of newItems) {
        await sendDiscordEventNotification(
          config.webhookUrl,
          item.subject,
          item.url,
          item.startAt,
          item.endAt,
          item.imageUrl
        );
      }
    }
  }

  await saveData(config.dataFile, newList);
}
