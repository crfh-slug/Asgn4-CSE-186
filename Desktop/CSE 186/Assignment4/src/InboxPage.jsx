import {useNavigate} from 'react-router-dom';
import {useEmail} from './EmailContext';
import mail from './data/mail.json';
import {useHeader} from './HeaderContext';
import Box from '@mui/material/Box';
import {useEffect} from 'react';

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navPage]); // Runs whenever `navPage` changes

  const formatDate = (receivedDate) => {
    const date = new Date(receivedDate);
    const now = new Date();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(now.getFullYear()-1);

    if (date.toDateString() === now.toDateString()) {
      return `${String(date.getHours())
          .padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday`;
    } else if (date >= oneYearAgo) {
      const options = {month: 'short', day: 'numeric'};
      return date.toLocaleDateString('en-US', options);
    } else {
      return date.getFullYear();
    }
  };

  return (
    <Box sx={{
      mt: 6, display: 'flex'}}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}>
        {sortedEmails.map((email) => (
          <div key={email.id}
            onClick = {() => {
              setSelectedEmail(email);
              navigate(`/email/${email.id}`);
            }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              cursor: 'pointer'}}>
            <span style={{width: '25%'}}>{email.from.name}</span>
            <span style={{
              width: '50%',
              textAlign: 'left',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'}}>
              {email.subject}</span>
            <span style={{width: '15%',
              textAlign: 'left',
            }}>{formatDate(email.received)}</span>
          </div>
        ))}
      </Box>
    </Box>
  );
}

export default InboxPage;
