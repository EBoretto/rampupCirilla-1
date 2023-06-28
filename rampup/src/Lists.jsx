import React, { useState, useEffect } from 'react';
import './App.css';
import RegisterForm from './Register';

function Lists({ username }) {
  const [people, setPeople] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: '',
    lastName: '',
    age: '',
    dni: '',
  });
  const [displayedPeople, setDisplayedPeople] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDNI, setDeleteDNI] = useState('');

  useEffect(() => {
    setDisplayedPeople(people);
  }, [people]);

  const handleSavePerson = () => {
    setPeople([...people, newPerson]);
    setNewPerson({ name: '', lastName: '', age: '', dni: '' });
  };

  const handleEditPerson = (index) => {
    setEditMode(true);
    setEditIndex(index);
    setNewPerson(people[index]);
  };

  const handleUpdatePerson = () => {
    const updatedPeople = [...people];
    updatedPeople[editIndex] = newPerson;
    setPeople(updatedPeople);
    setNewPerson({ name: '', lastName: '', age: '', dni: '' });
    setEditMode(false);
    setEditIndex(null);
  };

  const handleDeletePerson = (index) => {
    const updatedPeople = [...people];
    updatedPeople.splice(index, 1);
    setPeople(updatedPeople);
  };

  const handleDeletePersonByDNI = () => {
    const updatedPeople = people.filter((person) => person.dni !== deleteDNI);
    setPeople(updatedPeople);
    setDeleteDNI('');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setDisplayedPeople(people);
    } else {
      const filteredPeople = people.filter((person) =>
        person.dni.includes(e.target.value)
      );
      setDisplayedPeople(filteredPeople);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (editMode) {
        handleUpdatePerson();
      } else {
        handleSavePerson();
      }
    }
  };

  return (
    <div className='container'>
      <h3>New Person</h3>
      <div className='new-person'>
        <form>
          <div>
            <label>Name:</label>
            <div>
              <input
                type='text'
                value={newPerson.name}
                onChange={(e) =>
                  setNewPerson({ ...newPerson, name: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label>Last Name:</label>
            <div>
              <input
                type='text'
                value={newPerson.lastName}
                onChange={(e) =>
                  setNewPerson({ ...newPerson, lastName: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label>Age:</label>
            <div>
              <input
                type='number'
                value={newPerson.age}
                onChange={(e) =>
                  setNewPerson({ ...newPerson, age: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label>DNI:</label>
            <div>
              <input
                type='text'
                value={newPerson.dni}
                onChange={(e) =>
                  setNewPerson({ ...newPerson, dni: e.target.value })
                }
              />
            </div>
          </div>
          <div className='buttons'>
            <button
              type='button'
              onClick={editMode ? handleUpdatePerson : handleSavePerson}
              disabled={!newPerson.name || !newPerson.lastName}
            >
              {editMode ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>

      <div>
        <strong style={{ fontWeight: 'bold' }}>Delete person by DNI:</strong>
        <br />
        <div>
          <input
            type='text'
            value={deleteDNI}
            onChange={(e) => setDeleteDNI(e.target.value)}
          />
        </div>
        <div>
          <button type='button' onClick={handleDeletePersonByDNI}>
            Send
          </button>
        </div>
      </div>

      <div>
        <strong style={{ fontWeight: 'bold' }}>Search person by DNI:</strong>
        <br />
        <div>
          <input type='text' value={searchTerm} onChange={handleSearch} />
        </div>
      </div>

      {displayedPeople.length > 0 && (
        <table>
          <thead>
            <tr>
              <th style={{ paddingRight: '1cm' }}>Name</th>
              <th style={{ paddingRight: '1cm' }}>Last Name</th>
              <th style={{ paddingRight: '1cm' }}>Age</th>
              <th style={{ paddingRight: '1cm' }}>DNI</th>
            </tr>
          </thead>
          <tbody>
            {displayedPeople.map((person, index) => (
              <tr key={index}>
                <td style={{ textAlign: 'left' }}>{person.name}</td>
                <td style={{ textAlign: 'left' }}>{person.lastName}</td>
                <td style={{ textAlign: 'left' }}>{person.age}</td>
                <td style={{ textAlign: 'left' }}>{person.dni}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Lists;
