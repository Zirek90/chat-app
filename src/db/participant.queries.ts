import { getDbConnection } from './db';

export async function createParticipantsTable(): Promise<void> {
  const db = await getDbConnection();
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS participants (
        id TEXT PRIMARY KEY,
        username TEXT,
        avatar TEXT,
        last_updated INTEGER
      );`,
  );
}

export async function insertOrUpdateParticipantInDb(user: {
  id: string;
  username: string;
  avatar: string | null;
}): Promise<void> {
  const db = await getDbConnection();
  await db.runAsync(
    `INSERT OR REPLACE INTO participants (id, username, avatar, last_updated)
       VALUES (?, ?, ?, ?);`,
    [user.id, user.username, user.avatar, Date.now()],
  );
}

export async function getUserFromParticipantsFromDb(
  userId: string,
): Promise<{ id: string; username: string; avatar: string | null; last_updated: number } | null> {
  const db = await getDbConnection();
  return await db.getFirstAsync<{
    id: string;
    username: string;
    avatar: string | null;
    last_updated: number;
  }>(`SELECT * FROM participants WHERE id = ?;`, [userId]);
}
