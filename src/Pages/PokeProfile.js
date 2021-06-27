import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PokeContext } from "../Context/PokeContext";
import PokeDataCard from "../Components/Pokemon/PokeDataCard";
import PokeStats from "../Components/Pokemon/PokeStats";
import EggCard from "../Components/Pokemon/EggCard";

const typeColor={
  bug:"#a8b821",
  dark:"#705949",
  dragon:"#7039f7",
  electric:"#f6d132",
  fairy:"#feaec9",
  fighting:"#be2e25",
  fire:"#ef7e2e",
  flying:"#a890f0",
  ghost:"#705798",
  grass:"#78c84f",
  ground:"#e3c061",
  ice:"#98d8d8",
  normal:"#a8a67d",
  poison:"#9b459e",
  psychic:"#f45887",
  rock:"#b8a139",
  steel:"#b8b8d0",
  water:"#698ff4"



}

const PokeProfile = () => {
  const { id } = useParams();

  const pokeDataUrl = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  const pokeSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;

  const displayId =
    id.length === 1 ? `#00${id}` : id.length === 2 ? `#0${id}` : `#0${id}`;


  const [loading, setLoading] = useState(false);
  const [pokeData, setPokeData] = useState({
    animated:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif",
    name: "",
    pokemonIndex: "",
    baseExp:"",
    imageUrl: "",
    types: [],
    description: "",
    stats: {
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        specialAttack: "",
        specialDefense: ""
      },
    height: "",
    weight: "",
    catchRate: "",
    abilities: [],
    hatchSteps: "",
    themeColor: "",
    baseHappiness: "",
    eggGroups: [],
  });

  const state = {
    
    statTitleWidth: 3,
    statBarWidth: 9,
   
    eggGroups: [],
   
    genderRatioMale: "",
    genderRatioFemale: "",
    evs: "",

  };

  useEffect(() => {
    setLoading(true);
    Axios.all([
      Axios.get(pokeDataUrl),
      Axios.get(pokeSpeciesUrl),
    ]).then(
      Axios.spread(function(res1, res2) {
        const realPokeData =res1.data
        const realPokeSpecies =res2.data
        const tempPoke = {
          name: realPokeData.name,
          id: realPokeData.id,
          animated:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${realPokeData.id}.gif`,
          types: realPokeData.types.map((t) => t.type),
          height: realPokeData.height,
          weight: realPokeData.weight,
          img: realPokeData.sprites.other["official-artwork"]["front_default"],
          stats: {
            hp: realPokeData.stats[0].base_stat,
            attack: realPokeData.stats[1].base_stat,
            defense: realPokeData.stats[2].base_stat,
            speed: realPokeData.stats[5].base_stat,
            specialAttack: realPokeData.stats[3].base_stat,
            specialDefense: realPokeData.stats[4].base_stat
          },
          abilities: realPokeData.abilities.map((ele) => ele),
          sprites: realPokeData.sprites,
          description: realPokeSpecies["flavor_text_entries"][0]["flavor_text"],
          catchRate: realPokeSpecies["capture_rate"],
          themeColor: realPokeSpecies.color.name,
          habitat:realPokeSpecies.habitat,
          hatchSteps: realPokeSpecies["hatch_counter"],
          baseExp: realPokeData["base_experience"],
          eggGroups: realPokeSpecies["egg_groups"],
          baseHappiness: realPokeSpecies["base_happiness"],

        };
        setPokeData(tempPoke);
        setLoading(false);
      })
    ).catch((err) => {
      toast("Something went wrong", {
        type: "error"
      });
    });



   
  }, [pokeDataUrl,pokeSpeciesUrl]);

  if (loading) {
    return "Loading...";
  }

  return (
    <PokeContext.Provider value={{ pokeData,typeColor}}>

    
      <div className="glass-cont" style={{ textAlign: "center" }}>
    
        {
        console.log(pokeData)
        }
        <h1 style={{alignSelf:"center"}}>
          <img src={pokeData.animated}  alt="img"/ >
          {pokeData.name} <span style={{alignSelf:"center"}}>{displayId}</span>{" "}
        </h1>
        <div style={{padding:"1rem 0"}} className="row">
          <div className="col">
         
          
          <div style={{ textAlign: "center"}} className="prof-pic-card">
          <img  className="prof-pic" alt={pokeData.name} src={pokeData.img} />
        </div>
          </div>
        <div className="col ">
          <p className="desc">
          { pokeData.description.replace(""," ")}
          </p>
          
          <PokeDataCard/>
          </div>
        </div>
        <div className="row">
        <PokeStats/>
        <EggCard/>
        </div>

       
      </div>
    </PokeContext.Provider>
  );
};
export default PokeProfile;
