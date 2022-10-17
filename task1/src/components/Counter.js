import React from 'react';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.addOne = this.addOne.bind(this);
    this.removeOne = this.removeOne.bind(this);
  }

  addOne() {
    this.setState((state) => ({
      counter: state.counter + 1,
    }));
  }

  removeOne() {
    this.setState((state) => ({
      counter: state.counter - 1,
    }));
  }

  render() {
    return (
      <div>
        <h1>1. Counter with React.Component</h1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            margin: 'auto',
          }}
        >
          <button onClick={this.removeOne}> - </button>
          <div>{this.state.counter}</div>
          <button onClick={this.addOne}> + </button>
        </div>
      </div>
    );
  }
}

export default Counter;
