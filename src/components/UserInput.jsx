import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeName } from "../store/slices/userName.slice";
import pokemonLogo from "../assets/pokemonLogo.png";
import pikachu from "../assets/pikachu.png";

const UserInput = () => {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const dispatchUserName = () => {
    dispatch(changeName(userName));
    navigate("/pokedex");
  };

  return (
    <div className="login-container">
      <img className="pokemon-logo" src={pokemonLogo} alt="pokemon-logo" />
      <div className="input-and-pikachu">
        <div className="input-name">
          <form onSubmit={dispatchUserName}>
          <input
            className="input-user"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder=" Write your name to start"
          />
          <button className="set-name">
            <i className="fa-solid fa-paper-plane"></i>
          </button>
          </form>
        </div>

        <img className="pikachu" src={pikachu} alt="" />
      </div>
    </div>
  );
};

export default UserInput;
