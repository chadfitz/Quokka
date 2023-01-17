import LoginForm from "../SessionForms/LoginForm";
import GoogleMaps from "./GoogleMaps";
import './MainPage.css'
import Quokkas from "./QuokkaModel";
import Statistics from "./Statistics";
import Aos from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react";
import Footer from "../Footer/Footer";


function MainPage() {
  useEffect(()=> { 
    Aos.init({duration: 2000})
  }, [])
  
  return (
    <div className="splash-container">
      <div className="splash-login-container">
        <div className="splash-login-left">
          <h1 id="main-title">Quokka</h1>
          <h3 id="main-subtitle">Real Connections.</h3>
          <h3 id="main-subtitle">Meaningful Memories.</h3>
        </div>
        <LoginForm />
      </div>
      <div className="grids">
        <Quokkas />
        <GoogleMaps />
        <Statistics/>
      </div>

      <p>Our Own Idividual App</p>
      <Footer/>
    </div>
  );
}

export default MainPage;