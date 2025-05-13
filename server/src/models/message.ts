import { db } from '../db';

export async function saveMessage(channelId: number, userId: number, content: string) {
  const result = await db.query(
    `INSERT INTO messages (channel_id, user_id, content) VALUES ($1, $2, $3) RETURNING *`,
    [channelId, userId, content]
  );
  return result.rows[0];
}
