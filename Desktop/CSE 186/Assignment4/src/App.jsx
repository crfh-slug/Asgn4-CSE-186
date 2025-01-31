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

import mail from './data/mail.json';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


/**
 * Simple component with no state.
 *
 * See the basic-react from lecture for an example of adding and
 * reacting to changes in state.
 * @returns {object} JSX
 */
// const menuPages = [mail[0].name, mail[1].name, mail[2].name];
function App() {
  // const [menuNav, setMenuNav] = React.useState(null);

  // const handleOpenMenu = (event) => {
  // setMenuNav(event.currentTarget);
  // }

  // const handleCloseMenu = () => {
  // setMenuNav(null);
  // }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <Typography>
            CSE186 Mail - Inbox
          </Typography>
        </Toolbar>
      </AppBar>
      <table>
        <tbody>
          <tr>
            <td>{mail[0].mail.at(0).from.name} {' '}</td>
            <td>{mail[0].mail.at(0).subject} {' '}</td>
            <td>{mail[0].mail.at(0).received} {' '}</td>
          </tr>
          <tr>
            <td>{mail[0].mail.at(1).from.name} {' '}</td>
            <td>{mail[0].mail.at(1).subject} {' '}</td>
            <td>{mail[0].mail.at(1).received} {' '}</td>
          </tr>
        </tbody>
      </table>
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
