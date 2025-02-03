import {useNavigate} from 'react-router-dom';
import {useEmail} from './EmailContext';
import mail from './data/mail.json';
import {useHeader} from './HeaderContext';
import Box from '@mui/material/Box';

/**
 * This file displays the inbox and sets the selected
 * email in React Context when clicked.
 * @returns {object} JSX
 */
function InboxPage() {
  {/* mui.com/material-ui/react-app-bar */}
  const {setSelectedEmail} = useEmail();
  const {navPage} = useHeader();
  const navigate = useNavigate();

  const mailLabel = mail.find((m) => m.name === navPage);

  return (
    <Box sx={{mt: 6, display: 'flex', justifyContent: 'space-between'}}>
      <table>
        <tbody>
          {mailLabel.mail.map((email) => (
            <tr key={email.id}
              onClick = {() => {
                setSelectedEmail(email);
                navigate(`/email/${email.id}`);
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
    </Box>
  );
}

export default InboxPage;
