import fs from "fs/promises";
import { STORAGE_FILE } from "../config.js";

export class StorageService {
  static async loadWatchList() {
    try {
      const data = await fs.readFile(STORAGE_FILE, "utf-8");
      const parsed = JSON.parse(data);

      // 모든 필수 타입이 있는지 확인하고 없으면 기본값 추가
      const defaultData = {
        notice: { subject: "", startAt: "" },
        update: { subject: "", startAt: "" },
        event: { subject: "", startAt: "", endAt: "" },
        winner: { subject: "", startAt: "" },
        pierrot: { subject: "", startAt: "" },
        issue: { subject: "", startAt: "" },
        league: { subject: "", startAt: "" },
      };

      return { ...defaultData, ...parsed };
    } catch (error) {
      console.error("저장된 데이터를 불러오는데 실패했습니다:", error.message);
      return {
        notice: { subject: "", startAt: "" },
        update: { subject: "", startAt: "" },
        event: { subject: "", startAt: "", endAt: "" },
        winner: { subject: "", startAt: "" },
        pierrot: { subject: "", startAt: "" },
        issue: { subject: "", startAt: "" },
        league: { subject: "", startAt: "" },
      };
    }
  }

  static async saveWatchList(data) {
    await fs.writeFile(STORAGE_FILE, JSON.stringify(data));
  }
}
