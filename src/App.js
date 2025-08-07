import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  // Valor inicial para el input de números
  const defaultValue = "2,1,2,2,3,2,2";

  // Estados para la mayoría absoluta
  const [input, setInput] = useState(defaultValue);
  const [result, setResult] = useState(null);

  // Estado para la lista de personas
  const [persons, setPersons] = useState([]);

  // Estado para el formulario de nueva persona
  const [newPerson, setNewPerson] = useState({
    nombre: "",
    edad: "",
    carrera: "",
    esEstudiante: false,
    esMaestro: false,
  });

  // Función que encuentra el número que aparece > n/2 veces
  const findMajorityElement = (arr) => {
    const threshold = Math.floor(arr.length / 2);
    const counts = {};

    for (let num of arr) {
      counts[num] = (counts[num] || 0) + 1;
      if (counts[num] > threshold) return num;
    }

    return null;
  };

  // Ejecuta el cálculo cuando cambia el input o al iniciarsds
  useEffect(() => {
    const numbers = input
      .split(",")
      .map((n) => parseInt(n.trim()))
      .filter((n) => !isNaN(n));

    setResult(findMajorityElement(numbers));
  }, [input]);

  // Maneja cambios en el formulario de persona
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPerson((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Agrega una persona a la lista (con validación simple)
  const handleAddPerson = () => {
    if (
      !newPerson.nombre.trim() ||
      !newPerson.edad.trim() ||
      !newPerson.carrera.trim() ||
      (!newPerson.esEstudiante && !newPerson.esMaestro)
    ) {
      alert(
        "Completa todos los campos y selecciona Estudiante o Maestro (o ambos)."
      );
      return;
    }

    setPersons((prev) => [...prev, newPerson]);

    // Reset formulario
    setNewPerson({
      nombre: "",
      edad: "",
      carrera: "",
      esEstudiante: false,
      esMaestro: false,
    });
  };

  return (
    <div className="container">
      {/* Sección mayoría absoluta */}
      <section className="majority-section">
        <h1>Mayoría Absoluta</h1>

        <input
          className="input-text"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ej: 2,1,2,2,3,2,2"
        />

        <p className="result">
          Resultado:{" "}
          {result !== null ? result : <em>No hay número mayoritario</em>}
        </p>
      </section>

      <hr />

      {/* Sección personas */}
      <section className="persons-section">
        <h1>Agregar Personas</h1>

        <input
          className="input-text"
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={newPerson.nombre}
          onChange={handleInputChange}
        />

        <input
          className="input-text"
          type="number"
          name="edad"
          placeholder="Edad"
          value={newPerson.edad}
          onChange={handleInputChange}
          min="0"
        />

        <input
          className="input-text"
          type="text"
          name="carrera"
          placeholder="Carrera"
          value={newPerson.carrera}
          onChange={handleInputChange}
        />

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="esEstudiante"
              checked={newPerson.esEstudiante}
              onChange={handleInputChange}
            />{" "}
            Estudiante
          </label>

          <label>
            <input
              type="checkbox"
              name="esMaestro"
              checked={newPerson.esMaestro}
              onChange={handleInputChange}
            />{" "}
            Maestro
          </label>
        </div>

        <button className="btn" onClick={handleAddPerson}>
          Agregar Persona
        </button>

        <h2>Personas agregadas:</h2>
        {persons.length === 0 ? (
          <p>No hay personas agregadas.</p>
        ) : (
          <ul className="persons-list">
            {persons.map((p, i) => (
              <li key={i}>
                <strong>{p.nombre}</strong>, {p.edad} años, {p.carrera} —{" "}
                {p.esEstudiante && p.esMaestro
                  ? "Estudiante y Maestro"
                  : p.esEstudiante
                  ? "Estudiante"
                  : "Maestro"}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
