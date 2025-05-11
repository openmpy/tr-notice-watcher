import axios from "axios";
import { formatDate, formatEventDate } from "../utils/dateUtils.js";

export async function sendDiscordNotification(
  webhookUrl,
  subject,
  url,
  startAt
) {
  await axios.post(
    webhookUrl,
    {
      content: `[${subject}](${url})\n${formatDate(startAt)}`,
      flags: 4,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function sendDiscordEventNotification(
  webhookUrl,
  subject,
  url,
  startAt,
  endAt,
  imageUrl
) {
  await axios.post(
    webhookUrl,
    {
      embeds: [
        {
          title: subject,
          url: url,
          color: 0x000000,
          description: `${formatEventDate(startAt)} ~ ${formatEventDate(
            endAt
          )}`,
          image: {
            url: imageUrl,
          },
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function sendDiscordVideoNotification(
  webhookUrl,
  subject,
  link,
  imageUrl
) {
  await axios.post(
    webhookUrl,
    {
      embeds: [
        {
          title: subject,
          url: link,
          color: 0x000000,
          image: {
            url: imageUrl,
          },
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
