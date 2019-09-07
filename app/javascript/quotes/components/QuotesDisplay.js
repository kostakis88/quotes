import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import QuoteText from './QuoteText';
import QuoteNavigation from './QuoteNavigation';
import QuoteFooter from './QuoteFooter';

class QuotesDisplay extends Component {
  state = {
    quote: {},
    fireRedirect: false
  }

  fetchQuote(id) {
    axios.get(`api/quotes/${id}`)
    .then(response => {
      this.setState({ quote: response.data });
    })
    .catch(error => { 
      console.error(error);
      this.setState({ fireRedirect: true });
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
        <div className="quote-container">
          { this.state.fireRedirect && <Redirect to={'/'} /> }
          { previousQuoteId && <QuoteNavigation direction="previous" otherQuoteId={previousQuoteId} /> }
          <QuoteText quote={this.state.quote}/>
          { nextQuoteId && <QuoteNavigation direction="next" otherQuoteId={nextQuoteId} /> }
          { this.state.quote.id !== parseInt(this.props.startingQuoteId, 10) && <QuoteFooter startingQuoteId={this.props.startingQuoteId} />}  
        </div>
      </div>
    );
  }
}

export default QuotesDisplay;