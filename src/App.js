import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import 'firebase/firestore';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ]
};

class App extends Component {
  constructor() {
    super();
    
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBsyFvxigPX-W5XebG99dZ0_J0UR7--x2w",
      authDomain: "test1-d075b.firebaseapp.com",
      databaseURL: "https://test1-d075b.firebaseio.com",
      projectId: "test1-d075b",
      storageBucket: "test1-d075b.appspot.com",
      messagingSenderId: "766394707590"
    };
    
    firebase.initializeApp(config);
    
    // Initialize Cloud Firestore through Firebase
    this.db = firebase.firestore();
    
    // Disable deprecated features
    this.db.settings({
      timestampsInSnapshots: true
    });
    
    this.state = {
      user: null,
      enemies: [],
      userInput: ''
    }
  }
  componentDidMount = () => {
    this.db.collection("enemies")
      .onSnapshot((querySnapshot) => {
        this.setState({
          enemies: querySnapshot.docs.map(enemySnapshot => enemySnapshot.data().name)
        });
      });
    firebase.auth().onAuthStateChanged(
      (user) => this.setState({ user })
    );
  }
  addEnemy = (enemyToAdd) => {
    this.setState({
      userInput: ''
    });
    
    this.db.collection("enemies")
      .add({ name: enemyToAdd })
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
  }
  removeEnemy = (enemyToRemove) => {
    this.setState({
      enemies: this.state.enemies.filter(enemy => enemy !== enemyToRemove)
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {!this.state.user && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>}
          {this.state.user && <a onClick={() => firebase.auth().signOut()}>Sign-out</a>}
        </header>
        {this.state.user && this.state.user.uid === 'LH2kvfTu3LXMSecOhIp9YmHAoez1' && (
          <div className="add-enemy-form">
            <input value={this.state.userInput} onChange={(e) => this.setState({ userInput: e.target.value })} />
            <button onClick={() => this.addEnemy(this.state.userInput)}>add enemy</button>
          </div>
        )}
        <div className="enemies-list">
          {this.state.enemies.map(enemy => (
            <div key={enemy}>
              <input type="checkbox" onClick={() => this.removeEnemy(enemy)} />
              <label>{enemy}</label>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
