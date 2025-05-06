import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {EmailProvider} from './EmailContext';
import InboxPage from './InboxPage';
import EmailDetailsPage from './EmailDetailsPage';
import Layout from './Layout';
import {Header} from './HeaderContext';

/**
 * ChatGPT outlined/recommended using Routes
 * Understanding <Routes> and <Route path=...> 
 * https://hygraph.com/blog/routing-in-react
 * https://www.w3schools.com/react/react_router.asp
 */

/**
 * Wraps everything with EmailProvider and handles routing.
 * @returns {object} JSX
 */
function App() {
  return (
    <EmailProvider>
      <Router>
        <Header>
          <Layout>
            <Routes>
              <Route path='/' element={<InboxPage />} />
              <Route path='/important' element={<InboxPage />} />
              <Route path='/trash' element={<InboxPage />} />
              <Route path='/email/:id' element={<EmailDetailsPage />} />
            </Routes>
          </Layout>
        </Header>
      </Router>
    </EmailProvider>
  );
}

export default App;
