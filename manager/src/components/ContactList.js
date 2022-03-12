import React,{useRef} from "react";

import {Link} from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
  
    const inputEl = useRef("");
    const deletContactHandler = (id) => {
        props.getContactId(id);
    }
  
    const renderContactsList = props.contacts.map((contact) => {
        return (
            <ContactCard contactName={contact} clickHandler={deletContactHandler} key={contact.id} />
        )
    });
    const getSearchTerm=()=>{
        props.searchKeyword(inputEl.current.value)
  
    };
    return (
        <div className="main">
            <h2>Contact List</h2>
            <h2>
                Contact List
                <Link to="/add">
            <button className="ui button blue right">Add Contact</button>
                </Link>
                </h2>
                <div className="ui search">
                    <div className="ui icon input">
                        <input type="text"
                         placeholder="Search Contacts" 
                         className="propmt"
                           value={props.trem}
                           onChange={getSearchTerm}
                           ref={inputEl}
                         />
                   <i className="search icon" style={{cursor:"pointer"}} />
                    </div>
                </div>
            <div className="ui celled list">
                {renderContactsList.length > 0 ? renderContactsList:"No Contacts Available"}
            </div>
        </div>
    )
}
export default ContactList;