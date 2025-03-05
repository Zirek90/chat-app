import { openDatabaseAsync } from 'expo-sqlite';

export async function getDbConnection() {
  const db = await openDatabaseAsync('chat.db');
  return db;
}

//! FOR TESTING
export async function flushDatabase(): Promise<void> {
  const db = await getDbConnection();
  const tables = await db.getAllAsync<{ name: string }>(
    `SELECT name FROM sqlite_master WHERE type='table';`,
  );

  for (const table of tables) {
    const tableName = table.name;
    if (tableName !== 'sqlite_sequence') {
      await db.runAsync(`DELETE FROM ${tableName};`);
    }
  }
  console.log('Database flushed.');
}
