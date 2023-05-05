const { createContext, useState } = require("react");

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
