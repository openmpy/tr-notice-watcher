import dotenv from "dotenv";

dotenv.config();

export const STORAGE_FILE = "watch_list.json";

export const DISCORD_WEBHOOK_URLS = {
  NOTICE: process.env.DISCORD_WEBHOOK_URL_NOTICE,
  UPDATE: process.env.DISCORD_WEBHOOK_URL_UPDATE,
  EVENT: process.env.DISCORD_WEBHOOK_URL_EVENT,
  WINNER: process.env.DISCORD_WEBHOOK_URL_WINNER,
  PIERROT: process.env.DISCORD_WEBHOOK_URL_PIERROT,
  ISSUE: process.env.DISCORD_WEBHOOK_URL_ISSUE,
  LEAGUE: process.env.DISCORD_WEBHOOK_URL_LEAGUE,
};

export const TR_API_URLS = {
  NOTICE: process.env.TR_NOTICE_API_URL,
  UPDATE: process.env.TR_UPDATE_API_URL,
  EVENT: process.env.TR_EVENT_API_URL,
  WINNER: process.env.TR_WINNER_API_URL,
  PIERROT: process.env.TR_PIERROT_API_URL,
  ISSUE: process.env.TR_ISSUE_API_URL,
  LEAGUE: process.env.TR_LEAGUE_API_URL,
};

export const TR_BASE_URLS = {
  NOTICE: process.env.TR_NOTICE_BASE_URL,
  UPDATE: process.env.TR_UPDATE_BASE_URL,
  EVENT: process.env.TR_EVENT_BASE_URL,
  WINNER: process.env.TR_WINNER_BASE_URL,
  PIERROT: process.env.TR_PIERROT_BASE_URL,
  ISSUE: process.env.TR_ISSUE_BASE_URL,
  LEAGUE: process.env.TR_LEAGUE_BASE_URL,
};

export const CHECK_INTERVAL = 10000;
