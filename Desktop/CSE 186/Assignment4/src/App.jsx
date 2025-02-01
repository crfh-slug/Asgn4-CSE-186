import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {EmailProvider} from './EmailContext';
import InboxPage from './InboxPage';
import EmailDetailsPage from './EmailDetailsPage';

/**
 * Wraps everything with EmailProvider and handles routing.
 * @returns {object} JSX
 */
function App() {
  return (
    <div>
      <EmailProvider>
        <Router>
          <Routes>
            <Route path="/" element={<InboxPage />} />
            <Route path="/email/:id" element={<EmailDetailsPage />} />
          </Routes>
        </Router>
      </EmailProvider>
    </div>
  );
}

export default App;
