import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {EmailProvider} from './EmailContext';
import InboxPage from './InboxPage';
import EmailDetailsPage from './EmailDetailsPage';
import Layout from './Layout';
import {HeaderProvider} from './HeaderContext';

/**
 * Wraps everything with EmailProvider and handles routing.
 * @returns {object} JSX
 */
function App() {
  return (
    <EmailProvider>
      <HeaderProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path='/' element={<InboxPage />} />
              <Route path='/important' element={<InboxPage />} />
              <Route path='/trash' element={<InboxPage />} />;
              <Route path='/email/:id' element={<EmailDetailsPage />} />
            </Routes>
          </Layout>
        </Router>
      </HeaderProvider>
    </EmailProvider>
  );
}

export default App;
