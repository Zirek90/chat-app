import { getDbConnection } from './db';

export async function createUserTable(): Promise<void> {
  const db = await getDbConnection();
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT,
      username TEXT,
      avatar TEXT
    );`,
  );
}

export async function insertOrUpdateUserInDb(user: {
  id: string;
  email: string;
  username: string;
  avatar: string | null;
}): Promise<void> {
  const db = await getDbConnection();
  await db.runAsync(
    `INSERT OR REPLACE INTO users (id, email, username, avatar)
     VALUES (?, ?, ?, ?);`,
    [user.id, user.email, user.username, user.avatar],
  );
}

export async function getUserFromDb(
  userId?: string,
): Promise<{ id: string; email: string; username: string; avatar: string | null } | null> {
  const db = await getDbConnection();
  const user = await db.getFirstAsync<{
    id: string;
    email: string;
    username: string;
    avatar: string | null;
  }>(`SELECT * FROM users ${userId ? 'WHERE id = ?' : ''};`, userId ? [userId] : []);

  return user
    ? {
        id: user.id,
        email: user.email || '',
        username: user.username || '',
        avatar: user.avatar || null,
      }
    : null;
}

export async function updateUserAvatarInDb(userId: string, avatar: string): Promise<void> {
  const db = await getDbConnection();
  await db.runAsync(`UPDATE users SET avatar = ? WHERE id = ?;`, [avatar, userId]);
}

export async function clearUserTable(): Promise<void> {
  const db = await getDbConnection();
  await db.runAsync(`DELETE FROM users;`);
}
