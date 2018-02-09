import React from 'react';
import Name from './components/Name';
import nameService from './services/Persons';
import Notification from './components/Notification';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      message: null,
    };
  };

  componentDidMount () {
    nameService.getAll()
      .then(response => {
        this.setState({persons: response});
      });
  }

  addPerson = (event) => {
    event.preventDefault();

    if (this.state.persons.some(person => person.name === this.state.newName)) {
      const person = this.state.persons.filter(
        person => person.name === this.state.newName);
      const result = window.confirm(
        `Käyttäjä nimellä ${this.state.newName} on jo olemassa. Haluatko päivittää numeron?`);
      if (result) {
        const personObject = {
          name: this.state.newName,
          number: this.state.newNumber,
        };
        nameService.update(person[0].id, personObject).then(() => {
          this.componentDidMount();
          this.setState(
            {message: `Henkilön ${person[0].name} numero päivitettiin onnistuneesti.`});
        }).catch(() => {
          alert(
            `Muokkaus ei onnistunut. Henkilön ${person[0].name} tiedot on jo poistettu.`);
          this.componentDidMount();
        });

        setTimeout(() => {
          this.setState({message: null});
        }, 3000);
      }
    } else {
      const personObject = {
        name: this.state.newName,
        number: this.state.newNumber,
      };

      nameService.create(personObject)
        .then(newPerson => {
          this.setState({
            persons: this.state.persons.concat(newPerson),
            newName: '',
            newNumber: '',
            message: `${personObject.name} lisättiin onnistuneesti.`,
          });
        });
      setTimeout(() => {
        this.setState({message: null});
      }, 3000);
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

  deletePerson = (name, id) => {
    return () => {
      const result = window.confirm(
        `Haluatko varmasti poistaa käyttäjän ${name}`);
      if (result) {
        nameService.remove(id).then(() => {
          this.componentDidMount();
          this.setState({message: `Henkilö ${name} poistettiin onnistuneesti.`});
        });
        setTimeout(() => {
          this.setState({message: null});
        }, 3000);
      }
    };
  };

  render () {
    let personsToShow = this.state.filter.length === 0
      ? this.state.persons
      : this.state.persons.filter(person => person.name.toLowerCase()
        .includes(this.state.filter.toLowerCase()));

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification message={this.state.message}/>
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
            person => <Name key={person.id} id={person.id} name={person.name}
                            number={person.number}
                            deletePerson={this.deletePerson}/>)}
        </ul>
      </div>
    );
  }
}

export default App;
