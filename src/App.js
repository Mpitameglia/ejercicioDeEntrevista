// src/App.jsx
import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("1,2,2,3,3,3,4");
  const [mostRepeated, setMostRepeated] = useState(null);
  const [people, setPeople] = useState([]);
  const [person, setPerson] = useState({
    type: "Estudiante",
    name: "",
    age: "",
    career: "",
  });

  // Encuentra el número más repetido
  const findMostRepeated = () => {
    const numberList = input.split(",").map((n) => parseInt(n.trim()));
    const counts = {};
    let max = 0;
    let mostFrequent = null;

    for (const num of numberList) {
      counts[num] = (counts[num] || 0) + 1;

      if (counts[num] > max) {
        max = counts[num];
        mostFrequent = num;
      }
    }

    setMostRepeated(mostFrequent);
  };

  const handlePersonChange = (e) => {
    const { name, value } = e.target;
    setPerson({ ...person, [name]: value });
  };

  const addPerson = () => {
    setPeople([...people, person]);
    setPerson({
      type: "Estudiante",
      name: "",
      age: "",
      career: "",
    });
  };

  return (
    <div className="app-container">
      <h1>Buscador de número más repetido</h1>

      <input
        className="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ingresa números separados por coma"
      />
      <button className="button" onClick={findMostRepeated}>
        Calcular
      </button>

      {mostRepeated !== null && (
        <p className="result">
          El número más repetido es: <strong>{mostRepeated}</strong>
        </p>
      )}

      <hr />

      <h2>Agregar persona</h2>

      <select
        className="input"
        name="type"
        value={person.type}
        onChange={handlePersonChange}
      >
        <option value="Estudiante">Estudiante</option>
        <option value="Maestro">Maestro</option>
      </select>

      <input
        className="input"
        name="name"
        value={person.name}
        onChange={handlePersonChange}
        placeholder="Nombre"
      />
      <input
        className="input"
        name="age"
        value={person.age}
        onChange={handlePersonChange}
        placeholder="Edad"
        type="number"
      />
      <input
        className="input"
        name="career"
        value={person.career}
        onChange={handlePersonChange}
        placeholder="Carrera o Materia"
      />

      <button className="button" onClick={addPerson}>
        Agregar Persona
      </button>

      <ul className="people-list">
        {people.map((p, index) => (
          <li key={index}>
            {p.type}: {p.name}, {p.age} años, {p.career}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
