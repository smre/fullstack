import React from 'react';

const Name = ({name, number, id, deletePerson}) => {
  return (
    <li>
      {name} {number} <button onClick={deletePerson(name, id)}>Poista</button>
    </li>
  );
};

export default Name;
