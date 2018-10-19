import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import 'firebase/firestore';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


class App extends Component {
  constructor() {
    super();
    this.state = {
      enemies: [],
      // ************* STEP 5 ****************
      // A place to store user state.
      // ************* STEP 5 ****************
      user: null
    };
    this.inputRef = React.createRef();
    
  var config = {
    apiKey: "AIzaSyDzUMsNcfLJkn6iGuOXEaDfG_gshXSy41o",
    authDomain: "durian-pizza.firebaseapp.com",
    databaseURL: "https://durian-pizza.firebaseio.com",
    projectId: "durian-pizza",
    storageBucket: "durian-pizza.appspot.com",
    messagingSenderId: "720445715595"
  };
    
    firebase.initializeApp(config);
    this.firestore = firebase.firestore();
  }
  componentDidMount = () => {
    this.firestore.collection("enemies")
      .onSnapshot((querySnapshot) => {
        this.setState({
          enemies: querySnapshot.docs.map(enemySnapshot => enemySnapshot.data().name)
        });
      });
    // ************* STEP 5 ****************
    // Set an event listener on login/logout
    // ************* STEP 5 ****************
    firebase.auth().onAuthStateChanged(
      (user) => this.setState({ user })
    );
  }
  addEnemy = (enemyToAdd) => {
    this.firestore.collection("enemies")
      .add({ name: this.inputRef.current.value })
      .then(() => this.inputRef.current.value = '');
  }
  removeEnemy = (enemyToRemove) => {
    this.setState({
      enemies: this.state.enemies.filter(enemy => enemy !== enemyToRemove)
    });
  }
  render() {
    // ************* STEP 5 ****************
    // Config options for Firebase login UI
    // ************* STEP 5 ****************
    const uiConfig = {
      signInFlow: 'popup',
      signInSuccessUrl: '/signedIn',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    };
    return (
      <div className="App">
        <header className="App-header">
          {/*************** STEP 5 ****************
              Login area.
              If no user, show login button.
              If user, show "Logout" link.
            *************** STEP 5 ****************/}
          {!this.state.user &&
            // Login component - plug in config.
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />}
          {this.state.user &&
            <a onClick={() => firebase.auth().signOut()}>
              Logout
            </a>}
        </header>
        {/*************** STEP 5 ****************
          Input form only visible to admin user.
          *************** STEP 5 ****************/}
        {this.state.user && this.state.user.uid === 'XXXXX' && (
          <div className="add-enemy-form">
            <input ref={this.inputRef} />
            <button onClick={this.addEnemy}>
              add enemy
            </button>
          </div>
        )}
        <div className="enemies-list">
          {this.state.enemies.map(enemy => (
            <button onClick={() => this.removeEnemy(enemy)} key={enemy}>
              {enemy}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
