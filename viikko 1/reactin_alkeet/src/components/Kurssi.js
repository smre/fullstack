import React from 'react';

const Otsikko = ({name}) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

const Sisalto = ({kurssit}) => {
  return (
    <ul>
      {kurssit.map(kurssi => <Osa key={kurssi.id} name={kurssi.nimi}
                                  exercises={kurssi.tehtavia}/>)}
    </ul>
  );
};

const Osa = ({name, exercises}) => {
  return (
    <li>{name} {exercises}</li>
  );
};

const Yhteensa = ({kurssit}) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue.tehtavia;
  return (
    <div>
      <p>yhteensä {kurssit.osat.reduce(reducer, 0)} tehtävää</p>
    </div>
  );
};

const Kurssi = ({kurssi}) => {
  return (
    <div>
      <Otsikko name={kurssi.nimi}/>
      <Sisalto kurssit={kurssi.osat}/>
      <Yhteensa kurssit={kurssi}/>
    </div>
  );
};

export default Kurssi;