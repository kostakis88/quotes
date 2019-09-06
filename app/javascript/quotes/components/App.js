import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import QuotesDisplay from './QuotesDisplay';

const App = (props) => (
  <Router>
    <div>
      <Route 
          path='/'
          startingQuoteId={props.startingQuoteId}
          render={(routeProps) => <QuotesDisplay {...props} {...routeProps} />}
      />
    </div>
  </Router>
);

export default App;