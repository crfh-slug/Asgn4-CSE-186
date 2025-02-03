import {createContext, useState, useContext} from 'react';
import PropTypes from 'prop-types';

// Create Context
const EmailContext = createContext();

// Custom hook to use the EmailContext
export const useEmail = () => useContext(EmailContext);

// EmailProvider Component
export const EmailProvider = ({children}) => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);

  return (
    <EmailContext.Provider value={{emails, setEmails,
      selectedEmail, setSelectedEmail}}>
      {children}
    </EmailContext.Provider>
  );
};

EmailProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
