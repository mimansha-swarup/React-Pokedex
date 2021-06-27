
import { NavLink } from "react-router-dom";

const PokemonCard = ({ pokeObj }) => {
  const id = pokeObj.url.split("/").slice(-2, -1)[0];
  const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  const displayId =
    id.length === 1 ? `#00${id}` : id.length === 2 ? `#0${id}` : `#0${id}`;

  return (
    <NavLink to={`/pokemon/${id}`}>
      <li className="card">
        <div className="img-cont">
          <img src={url} loading="lazy" alt="pokemon"/>
        </div>
        <div className="data-preview">
          <p className="id-preview">{displayId}</p>
          <p className="name-preview">{pokeObj.name}</p>
        </div>
      </li>
    </NavLink>
  );
};
export default PokemonCard;
