import React from 'react';

const Name = ({name}) => {
  return (
    <li>
      {name}
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
          id: 1,
        },
      ],
      newName: '',
    };
  }

  addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: this.state.newName,
      id: this.state.persons.length + 1,
    };

    const persons = this.state.persons.concat(nameObject);

    this.setState({
      persons: persons,
      newName: '',
    });
  };

  handleNameChange = (event) => {
    this.setState({newName: event.target.value});
  };

  render () {
    const personsToShow = this.state.persons;

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addName}>
          <div>
            <input
              value={this.state.newName}
              onChange={this.handleNameChange}
            />
          </div>
          <div>
            <button type="submit">tallenna</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
          {personsToShow.map(
            person => <Name key={person.id} name={person.name}/>)}
        </ul>
      </div>
    );
  }
}

export default App;
