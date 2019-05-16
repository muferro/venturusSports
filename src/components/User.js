import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function User(props) {
  return (
    <tr className="contact" >
      <td>{props.username}</td>
      <td>{props.name}</td>
      <td>{props.email}</td>
      <td>{props.city}</td>
      <td>{props.userRide}</td>
      <td>{props.userDay}</td>
      <td>{props.posts}</td>
      <td>{props.albums}</td>
      <td>{props.photos}</td>
      <td><FontAwesomeIcon icon="trash-alt" size="1x"/></td>
    </tr>
  );
}

User.propTypes = {
  name: PropTypes.string.isRequired
};

export default User;
