import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({header}) => (
  <div>
    <h2>{header}</h2>
  </div>
);

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

  updateAverage = () => {
    let sum = 0;
    for (let i = 0; i < this.state.kaikki.length; i++) {
      sum += this.state.kaikki[i];
    }
    return sum / this.state.kaikki.length;
  };

  updatePositive = () => {
    const positive = this.state.kaikki.filter(function (i) {return i === 1;});
    return positive.length / this.state.kaikki.length;
  };

  clickHyva = () => {
    this.setState({
      hyva: this.state.hyva + 1,
      kaikki: this.state.kaikki.concat(1),
    });
  };

  clickNeutraali = () => {
    this.setState({
      neutraali: this.state.neutraali + 1,
      kaikki: this.state.kaikki.concat(0),
    });
  };

  clickHuono = () => {
    this.setState({
      huono: this.state.huono + 1,
      kaikki: this.state.kaikki.concat(-1),
    });
  };

  render () {

    return (
      <div>
        <div>
          <Header header={'anna palautetta'}/>
          <button onClick={this.clickHyva}>hyvä</button>
          <button onClick={this.clickNeutraali}>neutraali</button>
          <button onClick={this.clickHuono}>huono</button>
          <Header header={'statistiikka'}/>
          Hyvä: {this.state.hyva}<br/>
          Neutraali: {this.state.neutraali}<br/>
          Huono: {this.state.huono}<br/>
          Keskiarvo: {this.updateAverage()}<br/>
          Positiivisia: {this.updatePositive()}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root'),
);

