import { useEffect, useMemo, useState } from 'react';
import Card from './Card.jsx';
import { fetchMonsterList, fetchMonster, getImageUrl } from '../api/dnd.js';

const PAGE_SIZE = 24;

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getArmorClass(monster) {
  return monster.armor_class?.[0]?.value;
}

export default function Bestiary() {
  const [monsters, setMonsters] = useState([]);
  const [details, setDetails] = useState({});
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMonsterList()
      .then((data) => setMonsters(shuffle(data.results)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return monsters;
    return monsters.filter((m) => m.name.toLowerCase().includes(term));
  }, [monsters, search]);

  const pageItems = filtered.slice(0, visible);

  useEffect(() => {
    const missing = pageItems.filter((m) => !details[m.index]);
    if (missing.length === 0) return;

    Promise.all(missing.map((m) => fetchMonster(m.index)))
      .then((results) => {
        setDetails((prev) => {
          const next = { ...prev };
          results.forEach((monster) => {
            next[monster.index] = monster;
          });
          return next;
        });
      })
      .catch((err) => setError(err.message));
  }, [pageItems.map((m) => m.index).join(',')]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [search]);

  if (loading) return <p className="status">Cargando bestiario…</p>;
  if (error) return <p className="status status--error">No se pudo cargar: {error}</p>;

  return (
    <section className="module">
      <div className="toolbar">
        <input
          type="search"
          className="input"
          placeholder="Buscar enemigo por nombre (ej. goblin, dragon)…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="btn btn--ghost"
          onClick={() => {
            setMonsters((prev) => shuffle(prev));
            setVisible(PAGE_SIZE);
          }}
        >
          Mezclar
        </button>
        <span className="toolbar__count">{filtered.length} resultados</span>
      </div>

      <div className="grid">
        {pageItems.map((item) => {
          const monster = details[item.index];
          if (!monster) {
            return (
              <Card key={item.index} title={item.name} subtitle="Cargando detalles…" />
            );
          }
          return (
            <Card
              key={item.index}
              title={monster.name}
              subtitle={`${monster.size} · ${monster.type}`}
              image={getImageUrl(monster.image)}
              stats={[
                { label: 'Clase de Armadura', value: getArmorClass(monster) },
                { label: 'Puntos de Golpe', value: monster.hit_points },
                { label: 'Nivel de Desafío', value: monster.challenge_rating },
              ]}
            />
          );
        })}
      </div>

      {visible < filtered.length && (
        <button className="btn btn--ghost" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
          Mostrar más
        </button>
      )}
    </section>
  );
}
