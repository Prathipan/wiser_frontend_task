import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Portal from "./Portal";
import CreateNote from "./components/CreateNote";
import EditNote from "./components/EditNote";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="" element={<Portal />}>
            <Route path="/" element={<Home />} />
            <Route path="create-note" element={<CreateNote />} />
            <Route path=":id" element={<EditNote />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
