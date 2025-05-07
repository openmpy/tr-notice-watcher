import { CONFIG } from "./config.js";
import { processData, processEventData } from "./services/processService.js";

async function main() {
  try {
    await processData("notice", CONFIG.notice);
    await processData("update", CONFIG.update);
    await processEventData("event", CONFIG.event);
    await processData("winner", CONFIG.winner);
    await processData("pierrot", CONFIG.pierrot);
    await processData("issue", CONFIG.issue);
    await processData("league", CONFIG.league);

    console.log("모든 데이터 처리 완료");
  } catch (error) {
    console.error("처리 중 오류가 발생했습니다:", error);
  }
}

// 10초마다 main 함수 실행
setInterval(main, 10000);

// 초기 실행
main();
