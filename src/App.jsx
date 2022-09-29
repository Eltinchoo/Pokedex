import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import UserInput from "./components/UserInput";
import Pokemons from "./components/Pokemons";
import PokemonDetail from "./components/PokemonDetail";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useState } from "react";

function App() {

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<UserInput />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/pokedex" element={<Pokemons />} />
            <Route path="/pokedex/:id" element={<PokemonDetail />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
