import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useEmail} from './EmailContext';
import mail from './data/mail.json';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {Divider} from '@mui/material';

/**
 * This file displays the inbox and sets the selected
 * email in React Context when clicked.
 * @returns {object} JSX
 */
function InboxPage() {
  {/* mui.com/material-ui/react-app-bar */}
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [navPage, setNavPage] = React.useState(mail[0].name);
  const {setSelectedEmail} = useEmail();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuItemClicked = (pageName) => {
    setNavPage(pageName);
    handleDrawerToggle();
  };

  const handleEmailClick = (emailId) => {
    navigate(`/email/${emailId}`);
  };

  const mailLabel = mail.find((m) => m.name === navPage);

  return (
    <div>
      {/* mui.com/material-ui/react-app-bar */}
      <Box sx={{display: 'flex'}}>
        <CssBaseline />
        <AppBar
          position='fixed'
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
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
            <Typography variant="h6" noWrap>
              CSE186 Mail - {navPage}
            </Typography>
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
            <div>
              <Toolbar />
              <Divider />
              <List>
                {['Inbox', 'Important', 'Trash'].map((text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton onClick={() => handleMenuItemClicked(text)}>
                      <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </div>
          </Drawer>
        </Box>
      </Box>
      <AppBar />
      <Toolbar />

      <table>
        <tbody>
          {mailLabel.mail.map((email) => (
            <tr key={email.id}
              onClick = {() => {
                setSelectedEmail(email);
                navigate(`/email/${email.id}`);
                handleEmailClick(email.id);
              }}
              style={{cursor: 'pointer'}}>
              <td>{email.from.name}</td>
              <td>{email.subject}</td>
              <td>{email.received}</td>
            </tr>
          ),
          )}
        </tbody>
      </table>
    </div>
  );
}

export default InboxPage;
