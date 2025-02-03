import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import {useNavigate} from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import {useHeader} from './HeaderContext';

/**
 * Render the App Bar Menu on each page.
 * @returns {object} JSX
 */
function HeaderDetailsPage() {
  const {navPage, setNavPage, mobileOpen, setMobileOpen} = useHeader();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path.path);
    setNavPage(path.text);
    setMobileOpen(false); // Close drawer after navigation
  };

  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label = {mobileOpen ? 'hide mailboxes' : 'show mailboxes'}
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap
            sx={{flexGrow: 1, textAlign: 'left'}}>
            CSE186 Mail - {navPage}
          </Typography>
          <IconButton
            color='inherit'
            aria-label='close mail reader'
            edge='end'
            onClick={() => navigate('/')}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={Boolean(mobileOpen)}
          onClose={handleDrawerToggle}
          PaperProps={{style: {width: '250px'}}}
          ModalProps={{keepMounted: true}}
        >
          <Toolbar />
          <List>
            {[
              {text: 'Inbox', path: '/'},
              {text: 'Important', path: '/important'},
              {text: 'Trash', path: '/trash'},
            ].map((item, index) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => handleNavigation(item)}>
                  <ListItemIcon aria-label={item.text}>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </Box>
  );
}

export default HeaderDetailsPage;
