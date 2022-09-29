import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PokemonCard = ({ url }) => {
  const [pokemon, setPokemon] = useState({});
  const navigate = useNavigate();
  const [color, setColor] = useState("");
  const [fontSizeTitle, setFontSizeTitle] = useState("25px")

  useEffect(() => {
    axios.get(url)
    .then((res) => {
      setPokemon(res.data);
      let pokemonTypeColor = {
        bug: "#1c4b27",
        dark: "#040606",
        dragon: "#448a95",
        electric: "#63631d",
        fairy: "#961945",
        fighting: "#994025",
        fire: "#ab1f24",
        flying: "#4a677d",
        ghost: "#33336b",
        grass: "#137b3d",
        ground: "#a8702d",
        ice: "#86d2f5",
        normal: "#75525c",
        poison: "#5e2d89",
        psychic: "#a52a6c",
        rock: "#48180a",
        steel: "#60756e",
        water: "#1552e1",
      };
      setColor(pokemonTypeColor[res.data.types?.[0].type?.name]);
      if((res.data.name).length > 11){
        setFontSizeTitle("18px")
      }
      if((res.data.name).length > 13){
        setFontSizeTitle("15px")
      } 
    });
  }, []);

  function firstLetter(string) {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }

  function separateTypes(array) {
    let newArray = array?.map((type) => firstLetter(type.type.name));
    let finalString = newArray?.join(" / ");
    return finalString;
  }

  return (
    <li onClick={() => navigate(`/pokedex/${pokemon.id}`)}>
      <div className="pokemon-card" style={{ background: color }}>
        <img
          className="pokemon-img"
          src={pokemon.sprites?.other.home?.front_default}
          alt=""
        />

        <div className="specs">
          <h3 className="pokemon-name" style={{ color: color, fontSize: fontSizeTitle }}>
            {firstLetter(pokemon.name)}
          </h3>
          <div className="specs-section-one">
            <h5 className="pokemon-type" style={{ color: color }}>
              TYPE <br />
              <span className="specs-description">
                <b>{separateTypes(pokemon.types)}</b>
              </span>
            </h5>
          </div>
          
          <div className="specs-section-two" style={{ color: color }}>
            <h5 className="abilities">
              HP <br />
              <span className="specs-description">
                <b>{pokemon.stats?.[0].base_stat}</b>
              </span>
            </h5>
            <h5 className="abilities">
              ATTACK <br /> <span className="specs-description">
              <b>{pokemon.stats?.[1].base_stat}</b>
              </span></h5>
          </div>

          <div className="specs-section-three" style={{ color: color }}>
            <h5 className="abilities">
              DEFENSE <br />
              <span className="specs-description">
                <b>{pokemon.stats?.[2].base_stat}</b>
              </span>
            </h5>
            <h5 className="abilities">
              SPEED <br />
              <span className="specs-description">
                <b>{pokemon.stats?.[5].base_stat}</b>
              </span>
            </h5>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PokemonCard;
