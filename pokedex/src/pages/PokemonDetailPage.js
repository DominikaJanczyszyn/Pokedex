import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/PokemonDetailPage.css'

export default function PokemonDetailPage() {
  const BASE_URL = 'https://pokeapi.co/api/v2';
  const { pokemonName } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/pokemon/${pokemonName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon details');
        }
        const data = await response.json();
        console.log(data.types[0].type)
        setPokemonDetails(data);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      }
    };

    fetchPokemonDetails();
  }, [pokemonName]);

  if (!pokemonDetails) {
    return <div>Loading...</div>;
  }
  const typeColorMap = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
  };
  return (
    <>
      <div class="main-board">
        <div class="pokemon-box1" style={{ backgroundColor: typeColorMap[pokemonDetails.types[0].type.name] }}>
          <div class="pokemon-name1">
            <h2>{pokemonDetails.name}</h2>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetails.id}.png`} alt={pokemonDetails.name} />
            <div class="pokemon-type" style={{ backgroundColor: typeColorMap[pokemonDetails.types[0].type.name] }}>{pokemonDetails.types[0].type.name}</div>
            {pokemonDetails.types.length > 1 && (
              <div class="pokemon-type" style={{ backgroundColor: typeColorMap[pokemonDetails.types[1].type.name] }}>{pokemonDetails.types[1].type.name}</div>
            )}
          </div>
          <div class="pokemon-stats">
            <p>Base Stats</p>
            <span>HP</span>
            <progress max="255" value={pokemonDetails.stats[0].base_stat}></progress>
            <span>Attack</span>
            <progress max="255" value={pokemonDetails.stats[1].base_stat}></progress>
            <span>Defence</span>
            <progress max="255" value={pokemonDetails.stats[2].base_stat}></progress>
            <span>Special Attack</span>
            <progress max="255" value={pokemonDetails.stats[3].base_stat}></progress>
            <span>Special Defence</span>
            <progress max="255" value={pokemonDetails.stats[4].base_stat}></progress>
            <span>Speed</span>
            <progress max="255" value={pokemonDetails.stats[5].base_stat}></progress>
            <h4>Total : {pokemonDetails.stats[0].base_stat + pokemonDetails.stats[1].base_stat + pokemonDetails.stats[2].base_stat +
              pokemonDetails.stats[3].base_stat + pokemonDetails.stats[4].base_stat + pokemonDetails.stats[5].base_stat}</h4>
          </div>

        </div>
      </div>
      <Link class="back-button" to="/" > back</Link>
    </>
  );
}


