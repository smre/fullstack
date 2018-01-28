import React from 'react';
import ReactDOM from 'react-dom';

const Highest = ({selected, highest}) => {
  if (highest.votes === 0) {
    return (
      <div>
        Not enough votes yet
      </div>
    )
  } else {
    return (
      <div>
        {anecdotes[highest.index]}<br/>
        has {highest.votes} {highest.votes === 1 ? 'vote' : 'votes'}
      </div>
    )
  }

}

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selected: 0,
      highest: {index: 0, votes: 0},
      votes: [0, 0, 0, 0, 0, 0],
    };
  }

  randomAnecdote = () => {
    return () => {
      this.setState({
        selected: Math.floor(Math.random() * anecdotes.length),
      });
    };
  };

  vote = () => {
    return () => {
      let points = this.state.votes;
      let highest = this.state.highest;
      if (isNaN(points[this.state.selected])) {
        points[this.state.selected] = 1;
      } else {
        points[this.state.selected] += 1;
      }

      if (points[this.state.selected] > this.state.highest.votes) {
        highest.index = this.state.selected;
        highest.votes = points[this.state.selected];
      }

      this.setState({
        votes: points,
        highest: highest
      });
    };
  };

  render () {
    const selected = this.state.selected;
    const votes = this.state.votes;
    return (
      <div>
        {this.props.anecdotes[selected]}<br/>
        has {votes[selected]} votes<br/>
        <button onClick={this.vote()}>vote</button>
        <button onClick={this.randomAnecdote()}>next anecdote</button>
        <h2>anecdote with most votes</h2><br/>
        <Highest selected={this.state.selected} highest={this.state.highest} />
      </div>
    );
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(
  <App anecdotes={anecdotes}/>,
  document.getElementById('root'),
);
