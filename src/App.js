import React, { Component } from "react";
import "./App.css";

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, UncontrolledDropdown, Dropdown, DropdownButton, DropdownItem, DropdownToggle, DropdownMenu, Progress } from 'reactstrap';
import axios from "axios";
import UserList from "./components/UserList"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel, faTrashAlt, faPuzzlePiece, faTrophy, faMapSigns, faHome, faAngleRight, faLifeRing, faHeartbeat, faSmile} from '@fortawesome/free-solid-svg-icons'

import rides from "./mock/ride.json";
import days from "./mock/days.json";

library.add(faStroopwafel, faTrashAlt, faPuzzlePiece, faTrophy,faMapSigns, faHome, faAngleRight, faLifeRing, faHeartbeat, faSmile)

export default class App extends React.Component {

  // default state object
  state = {
    users: []
  };
  

  componentDidMount() {
    axios.all([axios.get(`https://jsonplaceholder.typicode.com/users`),
    axios.get(`https://jsonplaceholder.typicode.com/photos`),
    axios.get(`https://jsonplaceholder.typicode.com/posts`),
    axios.get(`https://jsonplaceholder.typicode.com/albums`),
  ])
.then(axios.spread((firstResponse, secondResponse, thirdResponse, fourthResponse ) => {
  
// create an array of users only with relevant data
const newUsers = firstResponse.data.map(u => {
  var user = firstResponse.data.find((user) => user.id === u.id);
  var userRide = rides.filter(ride => ride.id === u.id);
  var userDay = days.filter(day => day.id === u.id);
  var userPhotos = secondResponse.data.filter(photos => photos.albumId === user.id);
  var userPosts = thirdResponse.data.filter(post => post.userId === user.id);
  var userAlbums = fourthResponse.data.filter(albums => albums.userId === user.id);
  return {
    posts: userPosts.length,
    photos: userPhotos.length,
    albums: userAlbums.length,
    userDay: userDay[0].days,
    userRide: userRide[0].title,
    id: u.id,
    name: u.name,
    username: u.username,
    email: u.email,
    city: u.address.city
  };

  
});

// create a new "state" object without mutating
// the original state object.
const newState = Object.assign({}, this.state, {
  users: newUsers
});

// store the new state object in the component's state
this.setState(newState);

}))
.catch(error => console.log(error));
}

render() {

    // console.log("state:"+this.state.users[0]);

    return (
      <div className="App">
      <Container fluid>
        <header>
        <Row className="header">
        <Col sm="1"></Col>
        <Col sm="3">
        <h1 className="logo"><FontAwesomeIcon icon="stroopwafel" size="2x" className="logo-icon"/> Venturus Sports</h1>
        </Col>
        <Col sm="7">
        <UncontrolledDropdown className="menu">
      <DropdownToggle caret>
      <span>TD</span> Taís Duarte
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Header</DropdownItem>
        <DropdownItem disabled>Action</DropdownItem>
        <DropdownItem>Another Action</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Another Action</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
</Col>
        <Col sm="1"></Col>

        </Row>
        <Row className="breadcrumb-row">
        <Col sm="1"></Col>
        <Col sm="10">
        <ul >
        <li><a href="#"><FontAwesomeIcon icon="home" size="1x" className="home-icon"/></a><FontAwesomeIcon icon="angle-right" size="1x" className="angle-right-icon"/></li>
        <li><a href="#">Page Name</a><FontAwesomeIcon icon="angle-right" size="1x" className="angle-right-icon"/></li>
        <li><a href="#">...</a><FontAwesomeIcon icon="angle-right" size="1x" className="angle-right-icon"/></li>
        <li>Current page</li>
        </ul>
        </Col>
        <Col sm="1"></Col>
        </Row>
        </header>

        <Row className="flags">
        <Col sm="1"></Col>
        <Col sm="2"><FontAwesomeIcon icon="puzzle-piece" size="3x" className="icon-flag"/><div className="text-flag"><span>Sport type</span> <p>Cycling</p></div></Col>
        <Col sm="2"><FontAwesomeIcon icon="trophy" size="3x" className="icon-flag"/><div className="text-flag"><span>Moude</span> <p>Advanced</p></div></Col>
        <Col sm="2"><FontAwesomeIcon icon="map-signs" size="3x" className="icon-flag"/><div className="text-flag"><span>Route</span> <p>30 miles</p></div></Col>
        <Col sm="5"></Col>
        </Row>
        <Row>
        <Col sm="1"></Col>
        <Col sm="1"><h2 className="page-title">Users</h2></Col>
        <Col sm="6"><div className="hr"></div></Col
        >
        <Col sm="3">      
        <Form>
        <FormGroup>
          <Input type="txt" name="search" id="search" placeholder="Filter table content" />
        </FormGroup>
        </Form>
        </Col>
        <Col sm="1"></Col>
        </Row>
        <Row>
        <Col sm="1"></Col>
        <Col sm="10"><UserList users={this.state.users} /></Col>
        <Col sm="1"></Col>
        </Row>
        <Row>
        <Col sm="1"></Col>
        <Col sm="2"><h2 className="page-title">Registration</h2></Col>
        <Col sm="8"><div className="hr"></div></Col
        >
        <Col sm="1"></Col>
        </Row>
        <Container >
        <Row className="registration">
        <Col sm="4"><h3>Need help?</h3>
        <FontAwesomeIcon icon="life-ring" size="3x" className="icon-regitration"/>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
        </Col>
        <Col sm="4"><h3>Why register?</h3>
        <FontAwesomeIcon icon="heartbeat" size="3x" className="icon-regitration"/>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
        </Col>
        <Col sm="4"><h3>What people are saying...</h3>
        <FontAwesomeIcon icon="smile" size="3x" className="icon-regitration"/>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
        </Col>

        </Row>
        </Container>
        <Container >
        <Row className="form">
        <Col sm="12">
        <div className="hr"></div>
        </Col>
        </Row>
        <Form>
        <Row form>
          <Col md={6}>
          <FormGroup>
              <Label for="exampleEmail">Username</Label>
              <Input type="txt" name="username" id="username" required  />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Name</Label>
              <Input type="txt" name="name" id="name" required />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input type="email" name="email" id="exampleEmail" required/>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleCity">City</Label>
              <Input type="text" name="city" id="exampleCity"/>
            </FormGroup>
            <FormGroup tag="fieldset" row>
          <legend className="col-form-label col-sm-12">Ride in group?</legend>
          <Col md={12}>
          <Row>
          <Col md={4}>
            <FormGroup check >
                <Input type="radio" className="radio"  name="radio2" />{' '}
                <span className="txt-radio">Always</span>
            </FormGroup>
            </Col>
            <Col md={4}>
            <FormGroup check>
                <Input type="radio" name="radio2" className="radio" />{' '}
                <span className="txt-radio">Sometimes</span>
            </FormGroup>
</Col>
            <Col md={4}>
            <FormGroup check >
                <Input type="radio"className="radio"  name="radio2"  />{' '}
                <span className="txt-radio">Never</span>
            </FormGroup>
            </Col>
            </Row>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="checkbox2" sm={12}>Days of the week</Label>
          <Col sm={{ size: 12 }}>
            <FormGroup check>
            <Row>
              <div className="wrap-check">
                <Input type="checkbox" id="checkbox1" className="check" />{' '}
                <span className="txt-check">Sun</span>
                </div>
              <div className="wrap-check">
                <Input type="checkbox" id="checkbox2" className="check" />{' '}
                <span className="txt-check">Mon</span>
                </div>
              <div className="wrap-check">
                <Input type="checkbox" id="checkbox3" className="check" />{' '}
                <span className="txt-check">Tue</span>
                </div>
              <div className="wrap-check">
                <Input type="checkbox" id="checkbox4" className="check" />{' '}
                <span className="txt-check">Wed</span>
                </div>
              <div className="wrap-check">
                <Input type="checkbox" id="checkbox5" className="check" />{' '}
                <span className="txt-check">Thu</span>
                </div>
              <div className="wrap-check">
                <Input type="checkbox" id="checkbox6" className="check" />{' '}
                <span className="txt-check">Fri</span>
                </div>
              <div className="wrap-check">
                <Input type="checkbox" id="checkbox7" className="check" />{' '}
                <span className="txt-check">Sat</span>
                </div>
            </Row>
            </FormGroup>
          </Col>
        </FormGroup>
          </Col>

        </Row>
        
        <Button>Save</Button>         <Button>Discar</Button>

      </Form>
        </Container>
        </Container>
      </div>
    );
  }
}








