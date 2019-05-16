import React from "react";
import PropTypes from "prop-types";
import { Table } from 'reactstrap';
// import the User component
import User from "./User";

function UserList(props) {
  return (
    <Table striped hover size="sm">
    <thead>
    <tr>
      <th>Username</th>
      <th>Name</th>
      <th>E-mail</th>
      <th>City</th>
      <th>Ride in group</th>
      <th>Days of the week</th>
      <th>Posts</th>
      <th>Albums</th>
      <th>Photos</th>
      <th></th>
    </tr>
  </thead>
    <tbody>{props.users.map(u => <User key={u.id} name={u.name} username={u.username} email={u.email} city={u.city} userRide={u.userRide} userDay={u.userDay.join(", ")} posts={u.posts} albums={u.albums} photos={u.photos}  />)}</tbody>
    </Table>
  );
}

UserList.propTypes = {
  users: PropTypes.array.isRequired
};

export default UserList;
