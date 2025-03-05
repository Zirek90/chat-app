import { openDatabaseAsync } from 'expo-sqlite';

export async function getDbConnection() {
  const db = await openDatabaseAsync('chat.db');
  return db;
}
