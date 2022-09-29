import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import pokemonLogo from "../assets/pokemonLogo.png";

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemonById, setPokemonById] = useState();
  const [color, setColor] = useState("");
  const [fontSizeType, setFontSizeType] = useState("14px");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`).then((res) => {
      setPokemonById(res.data);
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
      if ((res.data.abilities?.[0].ability.name).length >= 7) {
        setFontSizeType("12px");
      }
    });
  }, []);

  // document.body.style.background = color
  function firstLetter(string) {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }

  return (
    <div className="pokemon-detail-container">
      <div className="container-pokemon">
        <div className="btn-back-pokemon-detail">
          <i
            onClick={() => navigate("/pokedex")}
            className="fa-solid fa-angle-left"
          ></i>
        </div>
        <div className="title-pokemon-detail">
          <img
            className="pokemon-logo-detail"
            src={pokemonLogo}
            alt="pokemon-logo"
          />
        </div>
      </div>

      <div className="about-pokemon" style={{ background: color }}>
        <img
          className="pokemon-solo"
          src={pokemonById?.sprites.other.home?.front_default}
          alt=""
        />
        <div className="about-pokemon-id">
          <h3>#{pokemonById?.id}</h3>
          <h3 className="name-pokemon-solo" style={{ color: color }}>
            {firstLetter(pokemonById?.species.name)}
          </h3>
          <div className="pokemon-id-weight-height">
            <h3>
              Height:
              <span style={{ color: color }}> {pokemonById?.height}</span>
            </h3>
            <h3>
              {" "}
              Weight:{" "}
              <span style={{ color: color }}>{pokemonById?.weight}</span>
            </h3>
          </div>
          <div className="pokemon-detail-specs" style={{ background: color }}>
            <div
              className="pokemon-type-in-pokemon-detail"
              style={{ background: color }}
            >
              <h3 className="sub-titile">Type</h3>
              <div className="order-type">
                {pokemonById?.types.map((type) => (
                  <b className="type">{firstLetter(type.type.name)}</b>
                ))}
              </div>
            </div>

            <div className="pokemon-ability" style={{ background: color }}>
              <h3 className="sub-titile">Abilities </h3>
              <div className="order-abilities">
                {pokemonById?.abilities.map((ability) => (
                  <b className="ability" style={{ fontSize: fontSizeType }}>
                    {firstLetter(ability.ability.name)}
                  </b>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="moves-container" style={{ background: color }}>
        <h3 className="sub-titile movement">Movements</h3>
        <div className="moves">
          <ul>
            {pokemonById?.moves.map((move) => (
              <li className="move" key={move.id}>
                {firstLetter(move.move.name)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
