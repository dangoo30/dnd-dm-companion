const ORIGIN = 'https://www.dnd5eapi.co';
const BASE_URL = `${ORIGIN}/api`;

export function getImageUrl(path) {
  if (!path) return null;
  return path.startsWith('http') ? path : `${ORIGIN}${path}`;
}

async function getJson(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Error ${response.status} al consultar ${path}`);
  }
  return response.json();
}

export function fetchMonsterList() {
  return getJson('/monsters');
}

export function fetchMonster(index) {
  return getJson(`/monsters/${index}`);
}

export function fetchEquipmentList() {
  return getJson('/equipment');
}

export function fetchMagicItemList() {
  return getJson('/magic-items');
}

export function fetchMagicItem(index) {
  return getJson(`/magic-items/${index}`);
}

export function fetchEquipment(index) {
  return getJson(`/equipment/${index}`);
}
