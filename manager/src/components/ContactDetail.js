import React from 'react';

import { Link } from 'react-router-dom';
const ContactDetail = (props) => {
    console.log(props);
  const{email,name} = props.location.state.contact;
    return (
        <div className="main">
            
         <div className="ui card centered">
             <div className="content">
                 <h2>Contact Detaiels</h2>
                 <div className="header"> {name} </div>
                 <div className="description"> {email} </div>
             </div>
         </div>
         <div className="center-div">
             <Link to="/">
             <button className="ui button blue center">Back to Contact List</button>
             </Link>
         </div>
        </div>
    )
}
export default ContactDetail;