import { db } from '../db';

export async function updateLastRead(userId: number, channelId: number) {
  await db.query(
    `UPDATE channel_user SET last_read_at = NOW() WHERE user_id = $1 AND channel_id = $2`,
    [userId, channelId]
  );
}
