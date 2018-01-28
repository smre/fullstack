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

const Statistics = ({points, average, positive, all}) => {
  if (all.length === 0) {
    return (
      <p>ei yhtään palautetta annettu</p>
    );
  } else {
    return (
      <div>
        <table>
          <tbody>
          <Statistic name="Hyvä" value={points[0]}/>
          <Statistic name="Neutraali" value={points[1]}/>
          <Statistic name="Huono" value={points[2]}/>
          <Statistic name="Keskiarvo" value={average}/>
          <Statistic name="Positiivisia" value={positive}/>
          </tbody>
        </table>
      </div>
    );
  }
};

const Statistic = ({name, value}) => {
  return (
    <tr>
      <td>{name}:</td>
      <td>{Math.round(value * 100) / 100} {name.includes('Positiivisia') ? '%' : ''}</td>
    </tr>
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
          <Statistics
            points={[this.state.hyva, this.state.neutraali, this.state.huono]}
            average={this.state.average}
            positive={this.state.positive}
            all={this.state.kaikki}
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

