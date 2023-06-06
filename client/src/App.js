import "./Styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthApp from "./Components/AuthApp";
import MainMenu from "./Components/Menu";
import Draw from "./Components/Draw";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AuthApp />}></Route>
          <Route path="/menu" element={<MainMenu />} />
          <Route path="/draw" element={<Draw />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
