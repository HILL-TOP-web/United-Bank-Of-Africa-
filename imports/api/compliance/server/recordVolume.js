import { DailyVolumes } from '../dailyVolume';

export function recordDailyVolume({ userId, amount }) {
  const date = new Date().toISOString().slice(0, 10);

  DailyVolumes.upsert(
    { userId, date },
    {
      $inc: { amount },
      $setOnInsert: { createdAt: new Date() }
    }
  );
}
