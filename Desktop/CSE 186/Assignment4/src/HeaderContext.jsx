import {createContext, useState, useContext} from 'react';
import PropTypes from 'prop-types';

// Create Context
const HeaderContext = createContext();

// Custom hook to use the EmailContext
export const useHeader = () => useContext(HeaderContext);

// EmailProvider Component
export const Header = ({children}) => {
  const [navPage, setNavPage] = useState('Inbox');
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <HeaderContext.Provider value={{navPage, setNavPage,
      mobileOpen, setMobileOpen}}>
      {children}
    </HeaderContext.Provider>
  );
};

Header.propTypes = {children: PropTypes.node.isRequired};

export default Header;
