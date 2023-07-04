import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from "./pages/Layout";
import Vista1 from "./pages/Vista1";
import Vista2 from "./pages/Vista2";
import Vista3 from "./pages/Vista3";


function App() {
  return (
    <div>
      <h1>Vistas</h1>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/vista1" element={<Vista1 />} />
          <Route path="/vista2" element={<Vista2 />} />
          <Route path="/vista3" element={<Vista3 />} />

        </Route>
      </Routes>
    </div>
  );
}

export default App;
