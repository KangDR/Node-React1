import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import LangingPage from './components/views/LandingPage/LangingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth'
function App() {
  const landingPage = Auth( {LangingPage} ,null);
  const loginPage=Auth( {LoginPage} ,false);
  const registerPage=Auth({RegisterPage},false);
  return (
    <div>
    <Router>
        <Routes>
          <Route exact path="/" element = {<LangingPage />} />
          <Route path="/login" element = {<LoginPage />} />
          <Route path="/register" element = {<RegisterPage />} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}