import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {useEmail} from './EmailContext';
import Box from '@mui/material/Box';

/**
 * Displays email details when an email is selected.
 * @returns {object} JSX
 */
function EmailDetailsPage() {
  const {selectedEmail} = useEmail();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedEmail) {
      navigate('/');
    }
  }, [selectedEmail, navigate]);

  if (!selectedEmail) {
    return null;
  }

  return (
    <Box>
      <p>From: {selectedEmail.from.name} (@{selectedEmail.from.address})</p>
      <p>To: {selectedEmail.to.name} ({selectedEmail.to.address})</p>
      <p>Received: {selectedEmail.received}</p>
      <p>{selectedEmail.subject}</p>
      <p>{selectedEmail.content}</p>
    </Box>
  );
}

export default EmailDetailsPage;
