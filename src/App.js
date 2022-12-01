import "./App.css";
import { Routes, Route } from "react-router-dom";
import Subscribe from "./Pages/Subscribe";
import Details from "./Pages/Details";
import FinalPage from "./Pages/FinalPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Subscribe />} />
        <Route path="/details/:email_address" element={<Details />} />
        <Route path="/confirm" element={<FinalPage />} />
      </Routes>
    </div>
  );
}

export default App;
