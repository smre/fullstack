import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({header}) => (
  <div>
    <h2>{header}</h2>
  </div>
);

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
);

const Statistics = ({average, positive}) => {
  return (
    <div>
      <Statistic name="Keskiarvo" value={average}/>
      <Statistic name="Positiivisia" value={positive}/>
    </div>
  );
};

const Statistic = ({name, value}) => {
  return (
    <div>
      {name} {value}
    </div>
  );
};

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0,
      kaikki: [],
      average: 0,
      positive: 0,
    };
  }

  updateAverage (input) {
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
      sum += input[i];
    }
    return sum / input.length;
  };

  updatePositive (input) {
    const positive = input.filter(function (i) {return i === 1;});
    return positive.length / input.length;
  };

  clickButton = (button, value) => {
    return () => {
      this.setState({
        [button]: this.state[button] + 1,
        kaikki: this.state.kaikki.concat(value),
        average: this.updateAverage(this.state.kaikki.concat(value)),
        positive: this.updatePositive(this.state.kaikki.concat(value)),
      });
    };
  };

  render () {
    return (
      <div>
        <div>
          <Header header={'anna palautetta'}/>
          <Button
            handleClick={this.clickButton('hyva', 1)}
            text='Hyvä'
          />
          <Button
            handleClick={this.clickButton('neutraali', 0)}
            text='Neutraali'
          />
          <Button
            handleClick={this.clickButton('huono', -1)}
            text='Huono'
          />
          <Header header={'statistiikka'}/>
          Hyvä: {this.state.hyva}<br/>
          Neutraali: {this.state.neutraali}<br/>
          Huono: {this.state.huono}<br/>

          <Statistics
            average={this.state.average}
            positive={this.state.positive}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root'),
);

