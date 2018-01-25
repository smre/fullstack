import React from 'react';
import ReactDOM from 'react-dom';

const Otsikko = (props) => {
  return (
    <div>
      <h1>{props.kurssi.nimi}</h1>
    </div>
  );
};

const Sisalto = (props) => {
  return (
    <div>
      {props.kurssi.osat.map((osa, index) => {
        return (
          <Osa key={index} osa={osa}/>
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
   let sum = 0;
   Object.keys(props.kurssi.osat).forEach((i) => {
     sum += props.kurssi.osat[i].tehtavia;
   });
    return (
      <div>
        <p>yhteensä {sum} tehtävää</p>
      </div>
    );
};

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  }

  return (
    <div>
      <Otsikko kurssi={kurssi}/>
      <Sisalto kurssi={kurssi}/>
      <Yhteensa kurssi={kurssi}/>
    </div>
  );
};

ReactDOM.render(
  <App/>,
  document.getElementById('root'),
);
