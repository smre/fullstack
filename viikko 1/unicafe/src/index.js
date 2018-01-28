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
    };
  }

  clickHyva = () => {
    this.setState({
      hyva: this.state.hyva + 1,
    });
  };

  clickNeutraali = () => {
    this.setState({
      neutraali: this.state.neutraali + 1,
    });
  };

  clickHuono = () => {
    this.setState({
      huono: this.state.huono + 1,
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
          Huono: {this.state.huono}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root'),
);

