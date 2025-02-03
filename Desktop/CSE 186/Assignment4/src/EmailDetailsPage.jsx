import {useNavigate} from 'react-router-dom';
import {useEmail} from './EmailContext';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

/**
 * Displays email details when an email is selected.
 * @returns {object} JSX
 */
function EmailDetailsPage() {
  const {selectedEmail} = useEmail();
  const navigate = useNavigate();

  if (!selectedEmail) {
    return (
      <div style={{padding: '20px'}}>
        <Button variant="container"
          onClick={() => navigate('/')}>
          Go to Inbox
        </Button>
      </div>
    );
  }

  return (
    <Box>
      <p>From: {selectedEmail.from.name} (@{selectedEmail.from.address})</p>
      <p>To: {selectedEmail.to.name} ({selectedEmail.to.address})</p>
      <p>Received: {selectedEmail.received}</p>
      <p>{selectedEmail.subject}</p>
      <p>{selectedEmail.content}</p>
      <Button variant="contained" aria-label = 'go back'
        onClick={() => navigate('/')}>
          Back to Inbox
      </Button>
    </Box>
  );
}

export default EmailDetailsPage;
