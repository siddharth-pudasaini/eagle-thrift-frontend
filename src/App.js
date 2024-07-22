import Home from "./pages/home";
import SignInPage from "./pages/sigIn";
import AddListing from "./pages/addListing";
import Search from "./pages/search";
import NotFound from "./pages/404Error";
import SignUp from "./pages/signUp";
import AccountInfo from "./pages/account";
import MessagePage from "./pages/message";
import ListingDetails from "./pages/singleListing";

import { AuthProvider } from "./providers/AuthProvider";
import { UIProvider } from "./providers/UIprovider";
import { MessageProvider } from "./providers/MessageProvider";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <UIProvider>
          <MessageProvider>
            <Routes>
              <Route path="/signIn" excat element={<SignInPage />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/add-listing" excat element={<AddListing />} />
              <Route path="/search" excat element={<Search />} />
              <Route path="/account-info" excat element={<AccountInfo />} />
              <Route path="/" excat element={<Home />} />
              <Route path="/messages/:listing_id" element={<MessagePage />} />
              <Route path="/listing/:listing_id" element={<ListingDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MessageProvider>
        </UIProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
