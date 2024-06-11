import Home from "./pages/home";
import SignInPage from "./pages/sigIn";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sigIn" element={<SignInPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
