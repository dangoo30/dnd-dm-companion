import { rollDice, randomInt } from './random.js';

export function getLootTier(cr) {
  if (cr <= 4) return 'bajo';
  if (cr <= 10) return 'medio';
  if (cr <= 16) return 'alto';
  return 'epico';
}

export const RARITIES_BY_TIER = {
  bajo: ['common', 'uncommon'],
  medio: ['uncommon', 'rare'],
  alto: ['rare', 'very rare'],
  epico: ['very rare', 'legendary'],
};

const COIN_TABLE = {
  bajo: { gp: [2, 6, 10], sp: [3, 6, 10] },
  medio: { gp: [4, 6, 25], sp: [2, 6, 10] },
  alto: { gp: [6, 6, 100], pp: [1, 6, 5] },
  epico: { gp: [8, 6, 250], pp: [2, 6, 10] },
};

export function generateCoins(cr) {
  const tier = getLootTier(cr);
  const table = COIN_TABLE[tier];
  const coins = {};
  Object.entries(table).forEach(([currency, [dice, sides, multiplier]]) => {
    coins[currency] = rollDice(dice, sides) * multiplier;
  });
  return coins;
}

export function getItemCount(cr) {
  const tier = getLootTier(cr);
  const ranges = { bajo: [0, 2], medio: [1, 3], alto: [1, 4], epico: [2, 5] };
  const [min, max] = ranges[tier];
  return randomInt(min, max);
}

export function formatCoins(coins) {
  const labels = { pp: 'pp', gp: 'po', sp: 'pp (plata)', cp: 'pc' };
  return Object.entries(coins)
    .filter(([, amount]) => amount > 0)
    .map(([currency, amount]) => ({ currency, amount, label: labels[currency] || currency }));
}
