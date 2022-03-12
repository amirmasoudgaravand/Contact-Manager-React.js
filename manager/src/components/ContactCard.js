import React from 'react';
import {Link} from "react-router-dom";

const ContactCard = (props) => {
    const { id, name, email } = props.contactName;
    return (
        <div className="item">
            
            <div className="contact">
        <Link to={{pathname:`/contact/${id}`,state:{contact:props.contactName}}}>
                <div className="header">
                    {name}
                </div>
                <div>
                    {email}
                </div>
                </Link>
            </div>
            <i className="trash alternate outline icon"
                style={{ color: "red", marginTop: "7px" ,marginLeft:"11px"}}
                onClick={() => props.clickHandler(id)}
            ></i>
            <Link to={{pathname:`/edit`,state:{contact:props.contactName}}}>
            <i className="edit alternate outline icon"
                style={{ color: "blue", marginTop: "7px" }}
            
            ></i>
            </Link>
        </div>
    )
}
export default ContactCard;