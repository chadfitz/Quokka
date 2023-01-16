import SignupForm from "../SessionForms/SignupForm";
import './MainPage.css'


function MainPageSignup() {
  
  
  return (
    <div className="splash-container">
      <div className="splash-login-container">
        <div className="splash-login-left">
          <h1>Quokka</h1>
          <h3>Meaningful meories. Real Connections.</h3>
        </div>
        <SignupForm />
      </div>

      <p>Our Own Idividual App</p>
      <footer>
        Copyright &copy; 2023 Quokka
      </footer>
    </div>
  );
}

export default MainPageSignup;