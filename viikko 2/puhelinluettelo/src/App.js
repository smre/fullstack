import React from 'react';

const Name = ({name, number}) => {
  return (
    <li>
      {name} {number}
    </li>
  );
};

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
      ],
      newName: '',
      newNumber: '',
    };
  }

  addPerson = (event) => {
    event.preventDefault();

    if (this.state.persons.some(person => person.name === this.state.newName)) {
      console.warn("I'm afraid I can't let you do that, Dave.");
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
        newNumber: '',
      });
    }
  };

  handleNameChange = (event) => {
    this.setState({newName: event.target.value});
  };

  handleNumberChange = (event) => {
    this.setState({newNumber: event.target.value});
  };

  render () {
    const personsToShow = this.state.persons;

    return (
      <div>
        <h2>Puhelinluettelo</h2>
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
            person => <Name key={person.id} name={person.name} number={person.number}/>)}
        </ul>
      </div>
    );
  }
}

export default App;
