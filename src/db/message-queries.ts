import { MessageInterface } from '../features';
import { getDbConnection } from './db';

export async function createMessagesTable(): Promise<void> {
  const db = await getDbConnection();
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      chatroom_id TEXT,
      sender_id TEXT,
      sender_name TEXT,
      content TEXT,
      timestamp TEXT,
      edited INTEGER,
      files TEXT
    );`,
  );
}

export async function insertMessageToDb(message: MessageInterface): Promise<void> {
  const filesData = message.files ? JSON.stringify(message.files) : '[]';

  const db = await getDbConnection();
  await db.runAsync(
    `INSERT INTO messages (id, chatroom_id, sender_id, sender_name, content, timestamp, edited, files)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
    [
      message.id,
      message.chatroom_id || '',
      message.sender_id,
      message.sender_name,
      message.content,
      message.timestamp,
      message.edited ? 1 : 0, // SQL store bool as integer
      filesData,
    ],
  );
}

export async function fetchMessagesFromDb(chatroom_id: string): Promise<MessageInterface[]> {
  const db = await getDbConnection();
  const result = await db.getAllAsync<{
    id: string;
    chatroom_id: string | undefined;
    sender_id: string;
    sender_name: string;
    content: string;
    edited: number;
    files: string | null;
    timestamp: number;
  }>(`SELECT * FROM messages WHERE chatroom_id = ? ORDER BY timestamp ASC;`, [chatroom_id]);

  return result.map((row) => ({
    ...row,
    edited: (row.edited as unknown as number) === 1,
    files: row.files ? JSON.parse(row.files) : [],
  }));
}

//! FOR TESTING
export async function deleteMessageFromDb(messageId: string): Promise<void> {
  const db = await getDbConnection();
  await db.runAsync(`DELETE FROM messages WHERE id = ?;`, [messageId]);
}

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
