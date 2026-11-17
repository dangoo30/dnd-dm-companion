import { useState } from 'react';
import { randomInt } from '../utils/random.js';

const DICE = [4, 6, 8, 10, 12, 20, 100];

export default function DiceTray() {
  const [selected, setSelected] = useState(20);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [rolling, setRolling] = useState(false);

  function roll() {
    setRolling(true);
    let ticks = 0;
    const interval = setInterval(() => {
      setResult(randomInt(1, selected));
      ticks += 1;
      if (ticks >= 8) {
        clearInterval(interval);
        const final = randomInt(1, selected);
        setResult(final);
        setHistory((prev) => [{ dice: selected, value: final, id: Date.now() }, ...prev].slice(0, 10));
        setRolling(false);
      }
    }, 60);
  }

  const isCritical = selected === 20 && result === 20;
  const isFumble = selected === 20 && result === 1;

  return (
    <section className="module">
      <h2 className="module__title">Bandeja de dados</h2>

      <div className="dice-selector" role="radiogroup" aria-label="Tipo de dado">
        {DICE.map((sides) => (
          <button
            key={sides}
            role="radio"
            aria-checked={selected === sides}
            className={`die-btn ${selected === sides ? 'die-btn--active' : ''}`}
            onClick={() => {
              setSelected(sides);
              setResult(null);
            }}
          >
            d{sides}
          </button>
        ))}
      </div>

      <div className="dice-display">
        <div
          className={[
            'dice-result',
            rolling ? 'dice-result--rolling' : '',
            isCritical ? 'dice-result--crit' : '',
            isFumble ? 'dice-result--fumble' : '',
          ].join(' ')}
          aria-live="polite"
        >
          {result ?? '?'}
        </div>
        <p className="dice-caption">
          d{selected}
          {isCritical && ' · ¡Crítico natural!'}
          {isFumble && ' · Pifia natural'}
        </p>
      </div>

      <button className="btn btn--primary btn--big" onClick={roll} disabled={rolling}>
        {rolling ? 'Lanzando…' : `Lanzar d${selected}`}
      </button>

      {history.length > 0 && (
        <div className="history">
          <h3>Historial</h3>
          <ul>
            {history.map((entry) => (
              <li key={entry.id}>
                d{entry.dice} → <strong>{entry.value}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
