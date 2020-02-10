import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  state = {
    domainNames: [],
    currentDomainNames: '',
    results: [
      {
          domainName: "example.org",
          sld: "example",
          tld: "org"
      },
      {
          domainName: "google.com",
          sld: "google",
          tld: "com"
      },
      {
        domainName: "timounkontan.org",
        sld: "timounkontan",
        tld: "org",
        purchasable: true,
        purchasePrice: 12.99,
        purchaseType: "registration",
        renewalPrice: 12.99
      }
    ]
  }

  handleSubmit = event => {
    event.preventDefault()

    const domainNames = this.state.currentDomainNames.split(', ')
    
    this.setState({ domainNames })

    this.postNames({ domainNames })
  }

  handleChange = event => {
    let currentDomainNames = this.state.currentDomainNames
    currentDomainNames = event.target.value
    this.setState({ currentDomainNames })
  }

  postNames = domainNames => {
    console.log(domainNames)

    // fetch('https://api.dev.name.com/v4/domains:checkAvailability', {
    fetch('http://api.dev.name.com/v4/domains:checkAvailability', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic a3dva2FzY2gtdGVzdDo1NzJjNTI0NDUyM2MzYWNjMzEyM2ExZDUyMDYwNDE3MDA5YWFiNjg0',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(domainNames)
    }).then(response => response.json())
    .then(res => console.log(res))
  }

  resultsMap = results => {
    results.map(result => {
      return <h2>{result.domainName}</h2>
    })
  }
  render(){
    return (
      <div className="App">
        <h2>Domain Search:</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Domain Name/s:</label>
          <input type='text' name='domainName' placeholder='google.com, etc.' onChange={this.handleChange}/>
          <input id='submit' type='submit' value="Submit"/>
        </form>
        <div>
          <h2>Search Results</h2>
          {this.state.results.map(result => {
              return <div>
                
                {
                  result.purchasable
                  ? <div>
                      <h3>'{result.domainName}' is available!</h3>
                      <h5>Purchase for ${result.purchasePrice}!</h5>
                      <h5>Purchase Type: {result.purchaseType}</h5>
                    </div>
                  : <h3>'{result.domainName}' is not available.</h3>
                }
              </div>
            })
          }
        </div>
        
      </div>
    );
  }
}

