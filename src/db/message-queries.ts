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
    timestamp: string;
  }>(`SELECT * FROM messages WHERE chatroom_id = ? ORDER BY timestamp ASC;`, [chatroom_id]);

  return result.map((row) => ({
    ...row,
    edited: (row.edited as unknown as number) === 1,
    files: row.files ? JSON.parse(row.files) : [],
  }));
}

export async function updateMessageInDb(
  id: string,
  content: string,
  edited: boolean,
): Promise<void> {
  const db = await getDbConnection();
  await db.runAsync(
    `UPDATE messages 
     SET content = ?, edited = ? 
     WHERE id = ?;`,
    [content, edited ? 1 : 0, id],
  );
}

export async function deleteMessageFromDb(messageId: string): Promise<void> {
  const db = await getDbConnection();
  await db.runAsync(`DELETE FROM messages WHERE id = ?;`, [messageId]);
}
