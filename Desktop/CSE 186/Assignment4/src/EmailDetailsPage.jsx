import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {useEmail} from './EmailContext';
import Box from '@mui/material/Box';

const formatDate = (receivedDate) => {
  const date = new Date(receivedDate);

  return `${date.toLocaleDateString('en-US', {month: 'long'})} `+
    `${date.getDate()}, ${date.getFullYear()} ` +
    `at ${String(date.getHours()).padStart(2, '0')}:` +
    `${String(date.getMinutes()).padStart(2, '0')}`;
};

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
    <Box sx={{mt: 6}}>
      <p>From: {selectedEmail.from.name} (@{selectedEmail.from.address})</p>
      <p>To: {selectedEmail.to.name} ({selectedEmail.to.address})</p>
      <p>Received: {formatDate(selectedEmail.received)}</p>
      <p>{selectedEmail.subject}</p>
      <p>{selectedEmail.content}</p>
    </Box>
  );
}

export default EmailDetailsPage;
