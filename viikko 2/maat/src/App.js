import React from 'react';
import axios from 'axios';

const Content = ({countriesToShow}) => {
  if (countriesToShow.length > 10) {
    return (
      <p>Too many matches. Try to specify your request.</p>
    )
  }
  if (countriesToShow.length === 1) {
    return (
      <div>
        <h1>{countriesToShow[0].name} / {countriesToShow[0].nativeName}</h1><br/>
        <p>Capital: {countriesToShow[0].capital}</p><br/>
        <p>Population: {countriesToShow[0].population}</p><br/>
        <img alt={countriesToShow[0].name} src={countriesToShow[0].flag} width={400}/>
      </div>
    )
  }
  return (
    <ul>
      {countriesToShow.map(
        country => <li key={country.name}>{country.name}</li>)}
    </ul>
  )
}

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      countries: [],
      matchingCountries: [],
      filter: '',
    };
  };

  componentDidMount () {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({countries: response.data});
      });
  }

  performSearch (country) {
    const matchingCountries = this.state.countries.filter(
      n => n.name.toLowerCase()
        .includes(country.toLowerCase()));

    if (matchingCountries.length > 0) {
      this.setState({
        matchingCountries: matchingCountries,
      });
    }
  }

  handleCountryChange = (event) => {
    if (event.target.value.length > 0) {
      this.performSearch(event.target.value);
    }
    this.setState({filter: event.target.value});
  };

  render () {
    const countriesToShow = this.state.matchingCountries;

    return (
      <div>
        <h1>Hello, World!</h1>
        <p>Search for a country</p>
        <input
          placeholder="Enter a country"
          value={this.state.filter}
          onChange={this.handleCountryChange}
        />
        <Content countriesToShow={countriesToShow} />
      </div>
    );
  }
}

export default App;
