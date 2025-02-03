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

  const sortedEmails = mailLabel.mail.sort((a, b) => {
    const dateA = new Date(a.received);
    const dateB = new Date(b.received);
    return dateB - dateA;
  });

  const formatDate = (receivedDate) => {
    const date = new Date(receivedDate);
    const now = new Date();

    if (date.toDateString() === now.toDateString()) {
      return `${String(date.getHours())
          .padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    } else if (date.getFullYear() === now.getFullYear()) {
      const options = {month: 'short', day: 'numeric'};
      return date.toLocaleDateString('en-US', options);
    } else {
      return date.getFullYear();
    }
  };

  return (
    <Box sx={{mt: 6, display: 'flex', flexDirection: 'column', gap: '10px'}}>
      {sortedEmails.map((email) => (
        <div key={email.id}
          onClick = {() => {
            setSelectedEmail(email);
            navigate(`/email/${email.id}`);
          }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '5px',
            cursor: 'pointer'}}>
          <span>{email.from.name}</span>
          <span>{email.subject}</span>
          <span>{formatDate(email.received)}</span>
        </div>
      ))}
    </Box>
  );
}

export default InboxPage;
