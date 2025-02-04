import {Box} from '@mui/material';
import HeaderDetailsPage from './HeaderDetailsPage';
import PropTypes from 'prop-types';

/**
 * ChatGPT: Recommended adding something similar to this file to
 * help with formatting.
 * Code wasn't copied, but the idea was from ChatGPT
 */

const Layout = ({children}) => {
  return (
    <Box sx={{display: 'flex'}}>
      <HeaderDetailsPage />
      <Box component='main' sx={{flexGrow: 1, p: 3}}>
        {children}
      </Box>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
