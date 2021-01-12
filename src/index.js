import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import reportWebVitals from './reportWebVitals';

const restLink = new RestLink({
  uri: process.env.REACT_APP_API_URL + '/?apikey=' + process.env.REACT_APP_API_KEY + '&type=movie',
  credentials: 'same-origin',
})

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
