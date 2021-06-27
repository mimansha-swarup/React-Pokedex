import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./Pages/Home";
import PokeProfile from "./Pages/PokeProfile";
import NavBar from "./Components/Layout/NavBar";

export default function App() {
  return (
    
      <Router>
        <div className="App">
          <NavBar />
          <ToastContainer />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/pokemon/:id" component={PokeProfile} />
            {/*  */}
          </Switch>
        </div>
      </Router>
   
  );
}
