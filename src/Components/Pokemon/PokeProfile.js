import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

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
    name: "",
    pokemonIndex: "",
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
    themeColor: ""
  });

  const state = {
    // name: "",
    // pokemonIndex: "",
    // imageUrl: "",
    // types: [],
    // description: "",
    statTitleWidth: 3,
    statBarWidth: 9,
    // stats: {
    //   hp: "",
    //   attack: "",
    //   defense: "",
    //   speed: "",
    //   specialAttack: "",
    //   specialDefense: ""
    // },
    // height: "",
    // weight: "",
    eggGroups: "",
    // catchRate: "",
    // abilities: "",
    genderRatioMale: "",
    genderRatioFemale: "",
    evs: "",
    // hatchSteps: "",
    // themeColor: "#EF5350"
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
    <div className="glass-cont" style={{ textAlign: "center" }}>
  
    {
     console.log(pokeData)
    }
      <h1>
        {pokeData.name} <span>{displayId}</span>{" "}
      </h1>
      <div style={{padding:"3rem 0"}} className="row">
      <div style={{ textAlign: "center"}} className="prof-pic-card">
      <img  className="prof-pic" alt={pokeData.name} src={pokeData.img} />
      </div>
        <div className="col right-cont">
        <p className="desc">
       { pokeData.description.replace(""," ")}
        </p>
        
          <div className="data-card">
          
          {/*Height*/}
          <div className="row">
              <p className="data-label" >Height: </p>
              <p className="data-label" >:</p>
              <p>{pokeData.height}</p>
              </div>
              {/*Weight*/}
              <div className="row">
              <p className="data-label">Weight</p>
              <p className="data-label" >:</p>
              <p>{pokeData.weight}</p>
            </div>
              
              {/*Type*/}
              
              <p className="data-label" >Type</p>
              <div className="row">
              {
                pokeData.types.map((type,i)=>(
                  <div key={i} style={{background:typeColor[type.name] }} className="poke-badge" >{type.name}</div>
                  ))
                }
                </div>
                {/*Abilities*/}
            <p className="data-label" >Abilities</p>
            <div className="row">
            {
              pokeData.abilities.map((ability,i)=>(
                <div key={i}  style={{background:ability["is_hidden"]? "#78716C":"#64748B" }} className="poke-badge" >{ability.ability.name}</div>
              ))
            }
            </div>
             {/*Habitat*/}
             <div className="row">
             <p className="data-label" >Habitat</p>
             <p className="data-label" >:</p>
             <p>{pokeData.habitat?.name}</p>
             </div>

          </div>
        </div>
      </div>

  
  <div style={{display:"flex"}}>
  <p>Sp. Dff</p>
  <div style={{width:pokeData.stats?.specialDefense,height:".5rem", background:"red" }}></div>
  <div >{pokeData.stats?.specialDefense}</div>
  </div>
  


      <h1>{(pokeData.stats)?pokeData["hp"]:null}</h1>
      {
        // user && user.personalInfo ? user.personalInfo.name : null;
      }
    </div>
  );
};
export default PokeProfile;
