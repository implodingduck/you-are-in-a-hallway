//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Encounter from "./pages/Encounter";
import NoPage from "./pages/NoPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>You are in a hallway...</p>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="map/:id/:x/:y" element={<Map />} />
              <Route path="encounter/:id" element={<Encounter />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
        
      </header>
    </div>
  );
}

export default App;
