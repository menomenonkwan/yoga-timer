import React from 'react';
import { DisplayTime } from './Helpers';

class Timer extends React.Component {
  render() {
    return (
      <div className="total-duration countdown">
        <h1>{this.props.time.duration > 0 ? DisplayTime(this.props.time.duration) : 'Done!'}</h1>
        {this.props.time.duration > 0 ?
        <div className="time-controls">
          <button onClick={this.props.startTimer} disabled={this.props.timerOn ? true : false }>start</button>
          <button onClick={this.props.resetTimer}>reset</button>
          <button onClick={this.props.stopTime}>stop</button>
          <button onClick={this.props.newTime}>new</button>
        </div>
        :
        <div className="time-controls">
          <button onClick={this.props.resetTimer}>restart</button>
          <button onClick={this.props.newTime}>new</button>
        </div>
        }
      </div>
    );
  }
}

export default Timer;
