import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './Component/NavBar';
import Home from './Pages/Home'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} /> */}
       </Routes>
    </div>
  );
}

export default App;
