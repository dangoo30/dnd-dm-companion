import { useState, useEffect, useCallback } from 'react';

const TOTAL_POKEMON = 1025;

export function PokemonBasic() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRandomPokemon = useCallback(() => {
    const randomId = Math.floor(Math.random() * TOTAL_POKEMON) + 1;
    setLoading(true);
    setError(null);

    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((data) => setPokemon(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchRandomPokemon();
  }, [fetchRandomPokemon]);

  const artwork =
    pokemon?.sprites?.other?.['official-artwork']?.front_default ?? pokemon?.sprites?.front_default;

  return (
    <section className="module pokemon">
      <h2 className="module__title">Pokémon aleatorio</h2>

      {error && <p className="status status--error">No se pudo cargar: {error}</p>}
      {loading && !pokemon && <p className="status">Cargando Pokémon…</p>}

      {pokemon && (
        <div className="card pokemon__card">
          <h3 className="card__title">
            #{pokemon.id} · {pokemon.name.toUpperCase()}
          </h3>
          {artwork && <img className="pokemon__img" src={artwork} alt={pokemon.name} />}
          <p className="card__subtitle">
            Tipo: {pokemon.types.map((t) => t.type.name).join(', ')}
          </p>
        </div>
      )}

      <button className="btn btn--primary" onClick={fetchRandomPokemon} disabled={loading}>
        {loading ? 'Cargando…' : 'Obtener otro Pokémon'}
      </button>
    </section>
  );
}
