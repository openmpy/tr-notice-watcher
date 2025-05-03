import fs from "fs/promises";
import { STORAGE_FILE } from "../config.js";

export class StorageService {
  static async loadWatchList() {
    try {
      const data = await fs.readFile(STORAGE_FILE, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return {
        notice: { subject: "" },
        update: { subject: "" },
        event: { subject: "" },
        pierrot: { subject: "" },
        issue: { subject: "" },
        league: { subject: "" },
      };
    }
  }

  static async saveWatchList(data) {
    await fs.writeFile(STORAGE_FILE, JSON.stringify(data));
  }
}
