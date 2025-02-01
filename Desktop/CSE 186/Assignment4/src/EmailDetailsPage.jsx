import {useNavigate} from 'react-router-dom';
import {useEmail} from './EmailContext';
import Button from '@mui/material/Button';

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
        <Button variant="contained" onClick={() => navigate('/')}>
          Go to Inbox
        </Button>
      </div>
    );
  }

  console.log('I made it!');

  return (
    <div>
      <p>From: {selectedEmail.from.name} (@{selectedEmail.from.address})</p>
      <p>To: {selectedEmail.to.name} ({selectedEmail.to.address})</p>
      <p>Received: {selectedEmail.received}</p>
      <p>{selectedEmail.subject}</p>
      <br />
      <p>{selectedEmail.content}</p>
      <Button variant="contained"
        onClick={() => navigate('/')}>
          Back to Inbox
      </Button>
    </div>
  );
}

export default EmailDetailsPage;
