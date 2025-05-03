import axios from "axios";
import { DISCORD_WEBHOOK_URLS } from "../config.js";
import { formatDate, formatEventDate } from "../utils/dateUtils.js";

export class NotificationService {
  static async sendDiscordNotification(content, url, type, date, imageUrl) {
    try {
      const webhookUrl = this.getWebhookUrl(type);
      const payload = this.createDiscordPayload(
        content,
        url,
        type,
        date,
        imageUrl
      );

      await this.sendToDiscord(webhookUrl, payload);
    } catch (error) {
      console.error(
        "디스코드 알림 전송 실패:",
        error.response?.data || error.message
      );
    }
  }

  static getWebhookUrl(type) {
    const webhookUrl = DISCORD_WEBHOOK_URLS[type];

    if (!webhookUrl) {
      throw new Error(`웹훅 URL이 설정되지 않았습니다: ${type}`);
    }
    return webhookUrl;
  }

  static createDiscordPayload(content, url, type, date, imageUrl) {
    if (type === "EVENT") {
      return this.createEventPayload(content, url, date, imageUrl);
    }
    return this.createDefaultPayload(content, url, date);
  }

  static createEventPayload(content, url, date, imageUrl) {
    const eventDate = `기간: ${formatEventDate(
      date.startAt
    )} ~ ${formatEventDate(date.endAt)}`;

    return {
      embeds: [
        {
          title: content,
          url: url,
          color: 0x000000,
          description: eventDate,
          image: {
            url: imageUrl,
          },
        },
      ],
    };
  }

  static createDefaultPayload(content, url, date) {
    const message = `[${content}](${url})\n${formatDate(date)}`;

    return {
      content: message,
      flags: 4,
    };
  }

  static async sendToDiscord(webhookUrl, payload) {
    try {
      const headers = { "Content-Type": "application/json" };

      await axios.post(webhookUrl, payload, { headers });
    } catch (error) {
      throw error;
    }
  }
}
