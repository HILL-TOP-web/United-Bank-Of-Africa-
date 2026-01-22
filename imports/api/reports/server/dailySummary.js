import { Ledger } from '../../ledger/ledger';

export function dailySummary(date) {
  return Ledger.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(`${date}T00:00:00`),
          $lte: new Date(`${date}T23:59:59`)
        }
      }
    },
    {
      $group: {
        _id: '$currency',
        total: { $sum: '$amount' }
      }
    }
  ]);
}
