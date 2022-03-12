import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import { uuid } from "uuidv4";
import ContactList from "./ContactList";
import AddContact from "./AddContact";
import ContactDetail from "./ContactDetail";
import api from "../api/contacts"
import './App.css';
import EditContact from "./EditContact";

function App() {
  const LOCAL = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults,setSearchResults] = useState([]);

  // Retrieve Contacts
  const retrieveContacts = async () => {
    const response = await api.get('/contacts');
    return response.data;
  };

  const addContactHandler = async (contact) => {
    //setContacts([...contacts,contact]);
    const request = {
      id: uuid(),
      ...contact
    }
    const response = await api.post("/contacts", request);
    console.log(response);
    setContacts([...contacts, response.data]);
    //setContacts([...contacts, { id: uuid(), ...contact }]);
  };
  
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newListContacts = contacts.filter(contact => {
      return contact.id !== id;
    });
    setContacts(newListContacts);
  }

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;

    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  }
  const searchHandler=(searchTerm)=>{
    setSearchTerm(searchTerm);
    if(searchTerm !== ""){
      const newContactList = contacts.filter((contact)=>{
        return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } 
    else{
      setSearchResults(contacts);
    }
  }

  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL));
    // if (retriveContacts) setContacts(retriveContacts);
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>

        <Header />
        <Switch>

          <Route path="/"
           exact
            render={(props) => (
              <ContactList 
              {...props}
                contacts={searchTerm.length < 1 ? contacts : searchResults}
                getContactId={removeContactHandler} 
                term={searchTerm}
                searchKeyword={searchHandler} />
            )} />

          <Route path="/add"
            render={(props) => (
              <AddContact {...props}
                addContactHandler={addContactHandler} />
            )} />

          <Route path="/edit"
            render={(props) => (
              <EditContact {...props}
                updateContactHandler={updateContactHandler} />
            )} />

          <Route path="/contact/:id" component={ContactDetail} />

        </Switch>
      </Router>
      {/*  <AddContact addContactHandler={addContactHandler} />  */}
      {/* <ContactList contacts={contacts} getContactId={removeContactHandler} />*/}
    </div>
  );
}

export default App;
