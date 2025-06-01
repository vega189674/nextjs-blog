import path from 'path';
import fs from 'fs';

const appsFile = path.join(process.cwd(), 'misc', 'apps.json');

export function getAppsData() {
  try {
    const fileContents = fs.readFileSync(appsFile, 'utf8');
    const appsData = JSON.parse(fileContents);
    return appsData.apps;
  } catch (error) {
    console.error('アプリデータの読み込みに失敗しました:', error);
    return [];
  }
} 