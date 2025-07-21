import axios from "axios";
import { formatEventDate } from "../utils/dateUtils.js";

function isWithinDays(date) {
  const now = new Date();
  const target = new Date(date);
  const diff = Math.abs(now - target);
  return diff <= 7 * 24 * 60 * 60 * 1000;
}

export async function sendDiscordNotification(
  webhookUrl,
  startAt,
  subject,
  names,
  urls,
  id
) {
  if (!isWithinDays(startAt)) return;

  const content =
    `${subject}\n` +
    names.map((name, idx) => `[${name}](${urls[idx]}/${id})`).join(" · ");

  await axios.post(
    webhookUrl,
    {
      content,
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
  names,
  urls,
  link,
  startAt,
  endAt,
  imageUrl
) {
  if (!isWithinDays(startAt)) return;

  const content = names
    .map((name, idx) => `[${name}](${urls[idx]}${link})`)
    .join(" · ");

  await axios.post(
    webhookUrl,
    {
      embeds: [
        {
          title: subject,
          color: 0x000000,
          description: content,
          image: {
            url: imageUrl,
          },
          footer: {
            text: `${formatEventDate(startAt)} ~ ${formatEventDate(endAt)}`,
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
  if (!isWithinDays(startAt)) return;

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
