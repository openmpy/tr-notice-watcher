import fs from "fs/promises";
import path from "path";

export async function readExistingData(filename) {
  try {
    const data = await fs.readFile(path.join("data", filename), "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(`${filename} 파일이 없습니다.`);
    return [];
  }
}

export async function saveData(filename, data) {
  await fs.writeFile(
    path.join("data", filename),
    JSON.stringify(data, null, 2)
  );
}
