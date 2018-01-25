import React from 'react';
import ReactDOM from 'react-dom';

const Otsikko = (props) => {
  return (
    <div>
      <h1>{props.kurssi}</h1>
    </div>
  );
};

const Sisalto = (props) => {
  return (
    <div>
      {props.osat.map(function (osa) {
        return (
          <Osa osa={osa}/>
        );
      })}
    </div>
  );
};

const Osa = (props) => {
  return (
    <div>
      <p>{props.osa.nimi} {props.osa.tehtavia}</p>
    </div>
  );
};

const Yhteensa = (props) => {
  {
    let sum = 0;
    props.osat.map(function (osa) {
      sum += osa.tehtavia;
    });
    return (
      <p>yhteensä {sum} tehtävää</p>
    );
  }
};

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys';
  const osat = [
    {
      nimi: 'Reactin perusteet',
      tehtavia: 10,
    },
    {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7,
    },
    {
      nimi: 'Komponenttien tila',
      tehtavia: 14,
    },
  ];

  return (
    <div>
      <Otsikko kurssi={kurssi}/>
      <Sisalto osat={osat}/>
      <Yhteensa osat={osat}/>
    </div>
  );
};

ReactDOM.render(
  <App/>,
  document.getElementById('root'),
);
