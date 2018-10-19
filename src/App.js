import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      enemies: ['cat', 'dog', 'baby'],
    };
    // ************* STEP 1 ****************
    // Ref to the input element.
    // ************* STEP 1 ****************
    this.inputRef = React.createRef();
  }
    
  // ************* STEP 1 ****************
  // Handler to add an enemy item.
  // ************* STEP 1 ****************
  addEnemy = (e, enemyToAdd) => {
    // ************* STEP 1 ****************
    // Take whatever's typed into the input
    // and concat to state.enemies.
    // Then clear the input.
    // ************* STEP 1 ****************
    this.setState({
      enemies: this.state.enemies.concat(this.inputRef.current.value),
    });
    this.inputRef.current.value = '';
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
          input but no persistence
        </header>
        {/*************** STEP 1 ****************
            Form for adding the enemy.
            INPUT: pointed to by this.inputRef
            BUTTON: calls this.addEnemy on click
          *************** STEP 1 ****************/}
        <div className="add-enemy-form">
          <input ref={this.inputRef} />
          <button onClick={this.addEnemy}>
            add enemy
          </button>
        </div>
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
