
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export function rollDice(count, sides) {
  let total = 0;
  for (let i = 0; i < count; i += 1) {
    total += randomInt(1, sides);
  }
  return total;
}
