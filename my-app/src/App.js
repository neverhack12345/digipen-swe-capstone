import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./Component/NavBar";
import Home from "./Pages/SignIn";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Plan from "./Pages/Home";
import Budget from "./Pages/Forms";
import Footer from "./Component/Footer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Plan" element={<Plan />} />
        <Route path="/Budget" element={<Budget />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
