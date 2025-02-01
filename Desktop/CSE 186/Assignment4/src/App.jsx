/*
#######################################################################
#
# Copyright (C) 2020-2025  David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/
import React from 'react';
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
 * Simple component with no state.
 *
 * See the basic-react from lecture for an example of adding and
 * reacting to changes in state.
 * @returns {object} JSX
 */
// const menuPages = [mail[0].name, mail[1].name, mail[2].name];
function App() {
  {/* mui.com/material-ui/react-app-bar */}
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [navPage, setNavPage] = React.useState(mail[0].name);
  const [selectedEmail, setSelectedEmail] = React.useState(null);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuItemClicked = (pageName) => {
    setNavPage(pageName);
    handleDrawerToggle();
  };

  const handleRowClick = (email) => {
    setSelectedEmail(email);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Inbox', 'Important', 'Trash'].map((text, index) => (
          <ListItem key={text} disablePadding
            // onClick = {() => handleMenuItemClicked(text)}
            aria-label = {text}
          >
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
  );

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
            <Typography variant="h6" noWrap component="div">
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
            ModalProps={{
              keepMounted: true, // Better open performance on mobile
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
      <AppBar />
      <Toolbar />

      <table>
        <tbody>
          {mailLabel.mail.map((email) => (
            <tr key={email.id}
              onClick = {() => handleRowClick(email)}
              aria-label = {email.subject}
              style={{cursor: 'pointer'}}>
              <td>{email.from.name}</td>
              <td>{email.subject}</td>
              <td>{email.received}</td>
            </tr>
          ),
          )}
        </tbody>
      </table>

      {/* Selected Email Details */}
      {selectedEmail && (
        <div style={{marginTop: '20px',
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '5px'}}
        >
          <p>From: {selectedEmail.from.name} (@{selectedEmail.from.address})</p>
        </div>
      )};
      {/* Your comment here
      <div>
        <h2>Let&apos;s make this look way better with Material-UI, eh?</h2>
        <table>
          <tbody>
            {mail.map((mailbox) => (
              mailbox.mail.map((email) => (
                <tr key={email.id}>
                  <td>{mailbox.name}</td>
                  <td>{email.from.name}</td>
                  <td>{email.subject}</td>
                  <td>{email.received}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
      */}
    </div>
  );
}

export default App;
