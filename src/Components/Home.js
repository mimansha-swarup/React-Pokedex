import Axios from "axios";
import React, { useEffect, useState } from "react";
import PokemonCard from "./Pokemon/PokemonCard";
import { toast } from "react-toastify";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);

  const [limit, setLimit] = useState(151);
  const [offset, setOffset] = useState(0);
  // const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  // const [pokeIndex, setPokeIndex] = useState([]);

  const currentPageUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  const [loading, setLoading] = useState(false);
  const fetchPokeUrl = async (url) => {
  
    setLoading(true);
    Axios.get(url)
      .then((res) => {
        setPokemons(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        toast("Something went wrong", {
          type: "error"
        });
      });
  };
  useEffect(() => {
    fetchPokeUrl(currentPageUrl);
  }, [currentPageUrl]);

  if (loading) {
    return "Loading...";
  }

  return (
    <ul className="grid-view glass-cont">
    {pokemons.map((pokemon, i) => (
      <PokemonCard key={i} pokeObj={pokemon} />
      ))}
      </ul>
     
  );
};
export default Home;
