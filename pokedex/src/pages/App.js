import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import { Link } from 'react-router-dom';

export default function App() {
  const BASE_URL = 'https://pokeapi.co/api/v2';
  const ITEMS_PER_PAGE = 16;
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch(`${BASE_URL}/pokemon?offset=${(currentPage - 1) * ITEMS_PER_PAGE}&limit=${ITEMS_PER_PAGE}`);
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon list');
        }
        const data = await response.json();
        const pokemonWithTypes = await Promise.all(data.results.map(async pokemon => {
          const pokemonData = await fetchPokemonData(`${BASE_URL}/pokemon/${pokemon.name}`);
          const types = pokemonData.types ? pokemonData.types.map(type => type.type.name) : [];
          return {
            ...pokemonData,
            type: types,
            url: pokemon.url
          };
        }));
        setPokemonList(pokemonWithTypes);
      } catch (error) {
        console.error('Error fetching Pokémon list:', error);
      }
    };

    fetchPokemonList();
  }, [currentPage]);
  const fetchPokemonData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon data');
    }
    return response.json();
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

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
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const pokemonListItems = pokemonList.map((pokemon, index) => (
    <Link to={`pokemon/${pokemon.name}`} className="pokemon-link">
      <div className="pokemon-box" style={{ backgroundColor: typeColorMap[pokemon.type[0]] }}>
        <div id="photo-box">
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split("/")[6]}.png`} alt={pokemon.name} />
        </div>
        <div className="pokemon-details">
          <p className="pokemon-name">{capitalizeFirstLetter(pokemon.name)}</p>
        </div>
      </div>
    </Link>
  ));

  return (
    <>
      <div className="pokemon-container">
        {pokemonListItems}
      </div>

      <div id="buttonRow">
        <button onClick={goToPrevPage} disabled={currentPage === 1}>Previous Page</button>
        <button onClick={goToNextPage}>Next Page</button>
      </div>
    </>

  );
}


