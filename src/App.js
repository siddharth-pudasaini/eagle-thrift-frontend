import Home from "./pages/home";
import SignInPage from "./pages/sigIn";
import AddListing from "./pages/addListing";
import Search from "./pages/search";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signIn" excat element={<SignInPage />} />
        <Route path="/add-listing" excat element={<AddListing />} />
        <Route path="/search" excat element={<Search />} />
        <Route path="/" excat element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
