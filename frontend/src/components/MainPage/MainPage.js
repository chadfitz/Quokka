import LoginForm from "../SessionForms/LoginForm";
import './MainPage.css'


function MainPage() {
  
  
  return (
    <div className="splash-container">
      <div className="splash-login-container">
        <div className="splash-login-left">
          <h1>Quokka</h1>
          <h3>Meaningful meories. Real Connections.</h3>
        </div>
        <LoginForm />
      </div>

      <p>Our Own Idividual App</p>
      <footer>
        Copyright &copy; 2023 Quokka
      </footer>
    </div>
  );
}

export default MainPage;