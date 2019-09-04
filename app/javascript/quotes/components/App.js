import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import QuotesDisplay from './QuotesDisplay';

const App = (props) => (
  <Router>
    <div>
      <Route 
          path='/'
          component={QuotesDisplay}
      />
    </div>
  </Router>
);

export default App;