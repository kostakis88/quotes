import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

class QuotesDisplay extends Component {
  state = {
    quotes: {}
  }

  fetchQuote(id) {
    axios.get(`api/quotes/${id}`)
    .then(response => {
      this.setState({ quote: response.data });
    })
    .catch(error => { 
      console.error(error);
    })
  }

  render() {
    return(
      <div>QuotesDisplay</div>
    );
  }
}

export default QuotesDisplay;