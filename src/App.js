import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    
    // ************* STEP 1 ****************
    // Start with a hardcoded list.
    // ************* STEP 1 ****************
    this.state = {
      enemies: ['cat', 'dog', 'baby'],
    };
  }
    
  // ************* STEP 1 ****************
  // Handler to remove an item.
  // ************* STEP 1 ****************
  removeEnemy = (enemyToRemove) => {
    this.setState({ enemies: this.state.enemies.filter(enemy => enemy !== enemyToRemove)});
  }
  render() {
    return (
      <div className="App">
        {/*************** STEP 1 ****************
            Shrank the header.
          *************** STEP 1 ****************/}
        <header className="App-header">
          this is where the header was
        </header>
        {/*************** STEP 1 ****************
            List of enemy buttons removable on click.
          *************** STEP 1 ****************/}
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
