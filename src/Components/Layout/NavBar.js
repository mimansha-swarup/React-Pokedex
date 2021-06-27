
import { NavLink } from "react-router-dom";
import "../../nav-bg.png";

const NavBar = ({ pokeObj }) => {
  return (
    <nav>
      <img
        src="https://www.freepnglogos.com/uploads/pokeball-png/pokeball-alexa-style-blog-pokemon-inspired-charmander-daily-8.png"
        alt="navlogo"
      />
      <NavLink className="brand" to={`/`}>
        Pokédex
      </NavLink>
    </nav>
  );
};
export default NavBar;
