import { useState } from 'react';
import Card from './Card.jsx';
import { fetchMagicItemList, fetchMagicItem, fetchEquipmentList, fetchEquipment, getImageUrl } from '../api/dnd.js';
import { getLootTier, generateCoins, getItemCount, formatCoins, RARITIES_BY_TIER } from '../utils/loot.js';
import { pickRandom } from '../utils/random.js';

const CR_OPTIONS = [0, 0.125, 0.25, 0.5, ...Array.from({ length: 30 }, (_, i) => i + 1)];

const crLabel = (cr) => (cr === 0.125 ? '1/8' : cr === 0.25 ? '1/4' : cr === 0.5 ? '1/2' : String(cr));

let magicListCache = null;
let equipmentListCache = null;

async function getMagicList() {
  if (!magicListCache) magicListCache = (await fetchMagicItemList()).results;
  return magicListCache;
}

async function getEquipmentList() {
  if (!equipmentListCache) equipmentListCache = (await fetchEquipmentList()).results;
  return equipmentListCache;
}

async function findMagicItems(count, allowedRarities) {
  const list = await getMagicList();
  const found = [];
  const seen = new Set();
  let attempts = 0;

  while (found.length < count && attempts < 25) {
    attempts += 1;
    const candidate = pickRandom(list);
    if (seen.has(candidate.index)) continue;
    seen.add(candidate.index);

    const detail = await fetchMagicItem(candidate.index);
    if (allowedRarities.includes(detail.rarity?.name?.toLowerCase())) {
      found.push({
        name: detail.name,
        description: detail.desc?.[0] ?? '',
        kind: 'Objeto mágico',
        rarity: detail.rarity.name,
        image: getImageUrl(detail.image),
      });
    }
  }
  return found;
}

async function findEquipment(count) {
  const list = await getEquipmentList();
  const items = [];
  for (let i = 0; i < count; i += 1) {
    const detail = await fetchEquipment(pickRandom(list).index);
    items.push({
      name: detail.name,
      description: `Valor: ${detail.cost?.quantity ?? '?'} ${detail.cost?.unit ?? ''}`,
      kind: detail.equipment_category?.name ?? 'Equipo',
      rarity: null,
      image: getImageUrl(detail.image),
    });
  }
  return items;
}

export default function LootGenerator() {
  const [cr, setCr] = useState(1);
  const [loot, setLoot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const tier = getLootTier(cr);

  async function generate() {
    setLoading(true);
    setError(null);
    try {
      const coins = generateCoins(cr);
      const itemCount = getItemCount(cr);

      const magicCount = tier === 'bajo' ? 0 : Math.ceil(itemCount / 2);
      const equipCount = itemCount - magicCount;

      const [magic, equipment] = await Promise.all([
        magicCount > 0 ? findMagicItems(magicCount, RARITIES_BY_TIER[tier]) : [],
        equipCount > 0 ? findEquipment(equipCount) : [],
      ]);

      setLoot({ coins, items: [...magic, ...equipment] });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="module">
      <div className="toolbar">
        <label className="field">
          <span>Nivel de Desafío del monstruo derrotado</span>
          <select className="input" value={cr} onChange={(e) => setCr(Number(e.target.value))}>
            {CR_OPTIONS.map((option) => (
              <option key={option} value={option}>
                CR {crLabel(option)}
              </option>
            ))}
          </select>
        </label>
        <span className="toolbar__count">Botín nivel: {tier}</span>
      </div>

      <button className="btn btn--primary" onClick={generate} disabled={loading}>
        {loading ? 'Generando botín…' : 'Generar botín'}
      </button>

      {error && <p className="status status--error">Error: {error}</p>}

      {loot && (
        <div className="loot">
          <Card title="Monedas" highlight>
            <div className="coins">
              {formatCoins(loot.coins).map((coin) => (
                <span className="coin" key={coin.currency}>
                  {coin.amount} {coin.label}
                </span>
              ))}
              {formatCoins(loot.coins).length === 0 && <span>Sin monedas</span>}
            </div>
          </Card>

          <div className="grid">
            {loot.items.map((item, idx) => (
              <Card
                key={`${item.name}-${idx}`}
                title={item.name}
                subtitle={item.kind}
                image={item.image}
                stats={item.rarity ? [{ label: 'Rareza', value: item.rarity }] : []}
              >
                {item.description && <p className="card__text">{item.description}</p>}
              </Card>
            ))}
          </div>
          {loot.items.length === 0 && <p className="status">No se encontraron objetos para este nivel.</p>}
        </div>
      )}
    </section>
  );
}
