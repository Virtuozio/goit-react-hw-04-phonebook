import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      setContacts(JSON.parse(contacts));
    }
  }, []);
  useEffect(() => {
    contacts.length &&
      localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  const handleCreate = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const names = contacts.map(contact => contact.name);
    if (names.includes(name)) {
      alert(`${name} is already in contacts.`);
      return;
    }
    setContacts(prev => {
      return [
        ...prev,
        {
          id: nanoid(),
          name: name,
          number: number,
        },
      ];
    });
    form.reset();
  };
  const handleChange = ({ target: { name, value } }) => {
    if (name === 'filter') setFilter(value);
    if (name === 'name') setName(value);
    if (name === 'number') setNumber(value);
  };
  const deleteContact = ({ target }) => {
    const index = contacts.findIndex(contact => contact.id === target.id);
    console.log(index);
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    setContacts(contacts);
    console.log(contacts);
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onChange={handleChange} onAddContact={handleCreate} />

      <h2>Contacts</h2>
      <Filter filter={filter} onChange={handleChange} />
      <ContactList
        contacts={contacts}
        filter={filter}
        deleteBtn={deleteContact}
      />
    </>
  );
};

// export class App extends Component {
//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.contacts !== this.state.contacts)
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));

//     if (prevState.contacts.length > this.state.contacts.length) {
//       this.setState({ isDelete: true });
//       setTimeout(() => {
//         this.setState({ isDelete: false });
//       }, 1500);
//     }

//     if (prevState.contacts.length < this.state.contacts.length) {
//       this.setState({ isCreate: true });
//       setTimeout(() => {
//         this.setState({ isCreate: false });
//       }, 1500);
//     }
//   }

//   render() {
//     return (
//       <div>
//         <h1>Phonebook</h1>
//         <ContactForm
//           onChange={this.handleChange}
//           onAddContact={this.handleCreate}
//         />

//         <h2>Contacts</h2>
//         <Filter filter={this.state.filter} onChange={this.handleChange} />
//         <ContactList
//           contacts={this.state.contacts}
//           filter={this.state.filter}
//           deleteBtn={this.deleteContact}
//         />
//       </div>
//     );
//   }
// }
