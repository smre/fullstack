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

  updateAverage = function (input) {
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
      sum += input[i];
    }
    return sum / input.length;
  };

  updatePositive = function (input) {
    const positive = input.filter(function (i) {return i === 1;});
    return positive.length / input.length;
  };

  clickHyva = () => {
    this.setState({
      hyva: this.state.hyva + 1,
      kaikki: this.state.kaikki.concat(1),
      average: this.updateAverage(this.state.kaikki.concat(1)),
      positive: this.updatePositive(this.state.kaikki.concat(1)),
    });

  };

  clickNeutraali = () => {
    this.setState({
      neutraali: this.state.neutraali + 1,
      kaikki: this.state.kaikki.concat(0),
      average: this.updateAverage(this.state.kaikki.concat(0)),
      positive: this.updatePositive(this.state.kaikki.concat(0)),
    });
  };

  clickHuono = () => {
    this.setState({
      huono: this.state.huono + 1,
      kaikki: this.state.kaikki.concat(-1),
      average: this.updateAverage(this.state.kaikki.concat(-1)),
      positive: this.updatePositive(this.state.kaikki.concat(-1)),
    });
  };

  render () {

    return (
      <div>
        <div>
          <Header header={'anna palautetta'}/>
          <Button
            handleClick={this.clickHyva}
            text='Hyvä'
          />
          <Button
            handleClick={this.clickNeutraali}
            text='Neutraali'
          />
          <Button
            handleClick={this.clickHuono}
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

