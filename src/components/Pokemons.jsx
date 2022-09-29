import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import pokedex from "../assets/PokedexLogo.png";
import ReactPaginate from 'react-paginate';

const Pokemons = () => {
  const name = useSelector((state) => state.userName);
  const navigate = useNavigate();

  const [pokemonsList, setPokemonsList] = useState([]);
  const [pokemonType, setPokemonType] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=1154")
      .then((res) => setPokemonsList(res.data.results));

    axios
      .get(`https://pokeapi.co/api/v2/type/`)
      .then((res) => setPokemonType(res.data.results));
  }, []);

  const searchPokemon = () => {
    navigate(`/pokedex/${input}`);
  };
  const searchPokemonByType = (typeUrl) => {
    if (typeUrl) {
      axios.get(typeUrl).then((res) => setPokemonsList(res.data?.pokemon));
    } else {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/?offset=20&limit=1154`)
        .then((res) => setPokemonsList(res.data.results));
    }
  };
const [page, setPage] = useState(1);
  const pokemonPerPage = 10;
  const lastPokemonIndex = page * pokemonPerPage;
  const firstPokemonIndex = lastPokemonIndex - pokemonPerPage;
  const pokemonPaginated = pokemonsList.slice(firstPokemonIndex, lastPokemonIndex);
  const totalPages = Math.ceil(pokemonsList.length / pokemonPerPage);
  // const pagesNumbers = [];
  // for (let i = 1; i <= totalPages; i++) {
  //   pagesNumbers.push(i);
  // }

  const changePage = ({selected})=>{
    setPage(selected+1)
  };



  const pageNumbers = [];
  for (let index = 1; index <= totalPages; index++) {
    pageNumbers.push(index);
  }

  function firstLetter(string) {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
  }
  return (
    <div className="pokemon-component">
      <img className="pokedex" src={pokedex} alt="" />
      <h2 className="welcome-title">Welcome <span className="user-trainer">{firstLetter(name)}!</span></h2>
      {/*search */}
      <div className="search-select-container">
          
          <div className="search-select-3d">
            <div className="search-pokemon-container">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search by name"
              />
              <button onClick={searchPokemon}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            <div className="select-option">
              <select
                className="pokemon-type"
                id="pokemon-type"
                onChange={(e) => searchPokemonByType(e.target.value)}
              >
                <option value="">All Pokemon</option>
                {pokemonType.map((type) => (
                  <option value={type.url} key={type.name}>
                    {firstLetter(type.name)}
                  </option>
                ))}
              </select>
              <i className="fa-solid fa-angle-down"></i>
            </div>
          </div>
      </div>
      
    
      <div className="pokemon-list">
        <ul>
          {pokemonPaginated.map((pokemon) => (
            <PokemonCard
              url={pokemon.url ? pokemon.url : pokemon.pokemon.url}
              key={pokemon.url ? pokemon.url : pokemon.pokemon.url}
            />
          ))}
        </ul>
      </div>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={totalPages}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
};

export default Pokemons;
