import { useState } from 'react';
import Bestiary from './components/Bestiary.jsx';
import LootGenerator from './components/LootGenerator.jsx';
import DiceTray from './components/DiceTray.jsx';
import { PokemonBasic } from './components/PokemonBasic.jsx';

const SECTIONS = [
  { id: 'bestiario', label: 'Bestiario', Component: Bestiary },
  { id: 'loot', label: 'Botín', Component: LootGenerator },
  { id: 'dados', label: 'Dados', Component: DiceTray },
  { id: 'pokemon', label: 'Pokémon', Component: PokemonBasic },
];

export default function App() {
  const [activeId, setActiveId] = useState('bestiario');
  const active = SECTIONS.find((s) => s.id === activeId);
  const ActiveComponent = active.Component;

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">
          <svg
            className="app__logo"
            viewBox="0 0 48 48"
            width="30"
            height="30"
            aria-hidden="true"
            style={{ verticalAlign: 'middle', marginRight: 8 }}
          >
            <polygon
              points="24,3 43,14 43,34 24,45 5,34 5,14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <polygon points="24,3 5,14 24,25 43,14" fill="currentColor" opacity="0.35" />
            <text x="24" y="31" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor">
              d20
            </text>
          </svg>
          Dangronito
        </h1>
        <nav className="tabs" aria-label="Secciones">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              className={`tab ${section.id === activeId ? 'tab--active' : ''}`}
              onClick={() => setActiveId(section.id)}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="app__main">
        <ActiveComponent />
      </main>

      <footer className="app__footer">
        Datos: API pública D&amp;D 5e (dnd5eapi.co) y PokeAPI
      </footer>
    </div>
  );
}
