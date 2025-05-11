import dotenv from "dotenv";

dotenv.config();

export const CONFIG = {
  notice: {
    webhookUrl: process.env.DISCORD_WEBHOOK_URL_NOTICE,
    apiUrl: process.env.TR_NOTICE_API_URL,
    pinnedApiUrl: process.env.TR_PINNED_NOTICE_API_URL,
    baseUrl: process.env.TR_NOTICE_BASE_URL,
    dataFile: "notices.json",
  },
  update: {
    webhookUrl: process.env.DISCORD_WEBHOOK_URL_UPDATE,
    apiUrl: process.env.TR_UPDATE_API_URL,
    pinnedApiUrl: process.env.TR_PINNED_UPDATE_API_URL,
    baseUrl: process.env.TR_UPDATE_BASE_URL,
    dataFile: "updates.json",
  },
  event: {
    webhookUrl: process.env.DISCORD_WEBHOOK_URL_EVENT,
    apiUrl: process.env.TR_EVENT_API_URL,
    baseUrl: process.env.TR_EVENT_BASE_URL,
    dataFile: "events.json",
  },
  winner: {
    webhookUrl: process.env.DISCORD_WEBHOOK_URL_WINNER,
    apiUrl: process.env.TR_WINNER_API_URL,
    pinnedApiUrl: process.env.TR_PINNED_WINNER_API_URL,
    baseUrl: process.env.TR_WINNER_BASE_URL,
    dataFile: "winners.json",
  },
  pierrot: {
    webhookUrl: process.env.DISCORD_WEBHOOK_URL_PIERROT,
    apiUrl: process.env.TR_PIERROT_API_URL,
    pinnedApiUrl: process.env.TR_PINNED_PIERROT_API_URL,
    baseUrl: process.env.TR_PIERROT_BASE_URL,
    dataFile: "pierrots.json",
  },
  issue: {
    webhookUrl: process.env.DISCORD_WEBHOOK_URL_ISSUE,
    apiUrl: process.env.TR_ISSUE_API_URL,
    pinnedApiUrl: process.env.TR_PINNED_ISSUE_API_URL,
    baseUrl: process.env.TR_ISSUE_BASE_URL,
    dataFile: "issues.json",
  },
  league: {
    webhookUrl: process.env.DISCORD_WEBHOOK_URL_LEAGUE,
    apiUrl: process.env.TR_LEAGUE_API_URL,
    pinnedApiUrl: process.env.TR_PINNED_LEAGUE_API_URL,
    baseUrl: process.env.TR_LEAGUE_BASE_URL,
    dataFile: "leagues.json",
  },
  video: {
    webhookUrl: process.env.DISCORD_WEBHOOK_URL_VIDEO,
    apiUrl: process.env.TR_VIDEO_API_URL,
    dataFile: "videos.json",
  },
};
