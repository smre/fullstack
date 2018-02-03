import React from 'react';
import Name from './components/Name';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      persons: [
        {
          name: 'Arto Hellas',
          number: '123123789',
          id: 1,
        },
        {
          name: 'Lea Kutvonen',
          number: '987654321',
          id: 2,
        },
      ],
      newName: '',
      newNumber: '',
      filter: '',
    };
  };

  addPerson = (event) => {
    event.preventDefault();

    if (this.state.persons.some(person => person.name === this.state.newName)) {
      console.warn('I\'m afraid I can\'t let you do that, Dave.');
    } else {
      const personObject = {
        name: this.state.newName,
        number: this.state.newNumber,
        id: this.state.persons.length + 1,
      };

      const persons = this.state.persons.concat(personObject);

      this.setState({
        persons: persons,
        newName: '',
        filter: '',
      });
    }
  };

  handleNameChange = (event) => {
    this.setState({newName: event.target.value});
  };

  handleNumberChange = (event) => {
    this.setState({newNumber: event.target.value});
  };

  handleFilter = (event) => {
    this.setState({filter: event.target.value});
  };

  render () {
    let personsToShow = this.state.filter.length === 0
      ? this.state.persons
      : this.state.persons.filter(person => person.name.toLowerCase().
        includes(this.state.filter.toLowerCase()));

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <div>
          Rajaa näytettäviä<br/>
          <input onChange={this.handleFilter}/>
        </div>
        <h2>Lisää uusi</h2>
        <form onSubmit={this.addPerson}>
          <div>
            <input
              placeholder="Nimi"
              value={this.state.newName}
              onChange={this.handleNameChange}
            />
          </div>
          <div>
            <input
              placeholder="Puhelinnumero"
              value={this.state.newNumber}
              onChange={this.handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">tallenna</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
          {personsToShow.map(
            person => <Name key={person.id} name={person.name}
                            number={person.number}/>)}
        </ul>
      </div>
    );
  }
}

export default App;
