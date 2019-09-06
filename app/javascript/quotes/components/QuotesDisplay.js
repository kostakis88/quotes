import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

class QuotesDisplay extends Component {
  state = {
    quote: {}
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

  handleQuoteId(qs) {
    this.qsParams = queryString.parse(qs);
    if (this.qsParams.quote) {
      this.quoteId = Number(this.qsParams.quote);
    } else {
      this.quoteId = this.props.startingQuoteId;
      this.props.history.push(`/?quote=${this.quoteId}`);
    }
  }

  componentDidMount() {
    this.handleQuoteId(this.props.location.search);
    this.fetchQuote(this.quoteId);
  }

  componentWillReceiveProps(nextProps) {
    this.handleQuoteId(nextProps.location.search);
    this.fetchQuote(this.quoteId);
  }

  render() {
    const quote = this.state.quote;
    const nextQuoteId = quote.next_id;
    const previousQuoteId = quote.previous_id;

    return(
      <div>
        { previousQuoteId && <Link to={`/?quote=${previousQuoteId}`}>Previous</Link>}
        { nextQuoteId && <Link to={`/?quote=${nextQuoteId}`}>Next</Link> }
        <p>{quote.text}</p>
        <p>{quote.author}</p>
      </div>
    );
  }
}

export default QuotesDisplay;