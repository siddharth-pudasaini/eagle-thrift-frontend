import Home from "./pages/home";
import SignInPage from "./pages/sigIn";
import AddListing from "./pages/addListing";
import Search from "./pages/search";
import NotFound from "./pages/404Error";
import SignUp from "./pages/signUp";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signIn" excat element={<SignInPage />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/add-listing" excat element={<AddListing />} />
        <Route path="/search" excat element={<Search />} />
        <Route path="/" excat element={<Home />} />
        <Route path="*"  element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
