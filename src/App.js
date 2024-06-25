import Home from "./pages/home";
import SignInPage from "./pages/sigIn";
import AddListing from "./pages/addListing";
import Search from "./pages/search";
import NotFound from "./pages/404Error";
import SignUp from "./pages/signUp";
import AccountInfo from "./pages/AccountInfo";

import { AuthProvider } from "./providers/AuthProvider";
import { UIProvider } from "./providers/UIprovider";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";

function App() {
  return (
    <AuthProvider>
      <UIProvider>
        <Router>
          <Routes>
            <Route path="/signIn" excat element={<SignInPage />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/add-listing" excat element={<AddListing />} />
            <Route path="/search" excat element={<Search />} />
            <Route path="/accountInfo" excat element={<AccountInfo />} />
            <Route path="/" excat element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </UIProvider>
    </AuthProvider>
  );
}

export default App;
