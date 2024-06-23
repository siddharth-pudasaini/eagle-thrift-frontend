import React, { createContext, useState } from "react";

// Create UI Context
const UIContext = createContext();

const UIProvider = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <UIContext.Provider value={{ drawerOpen, toggleDrawer }}>
      {children}
    </UIContext.Provider>
  );
};

export { UIProvider, UIContext };
