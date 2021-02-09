import React from 'react';
import { GetTotalSeconds } from './Helpers';

class Time extends React.Component {
  hoursRef = React.createRef();
  minutesRef = React.createRef();
  secondsRef = React.createRef();

  handleChange = (e) => {
    const name = e.currentTarget.name;
    const totalTime = e.currentTarget.value;    
    this.props.updateTime(totalTime, name);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const hours = this.hoursRef.current.value;
    const minutes = this.minutesRef.current.value;
    const seconds = this.secondsRef.current.value;

    if(isNaN(hours) || isNaN(minutes) || isNaN(seconds)) { return; }
    if(hours === '' && minutes === '' && seconds === '') { return; }
    
    const time = {
      duration: GetTotalSeconds(minutes, seconds, hours),
      hours: (hours ? hours : 0),
      minutes: (minutes ? minutes : 0),
      seconds: (seconds ? seconds : 0),
      set: true,
    };

    this.props.setTime(time);
    e.currentTarget.reset();
  }

  render() {
    return (
      <form className="total-duration" onSubmit={this.handleSubmit}>
      <label>Total Duration</label>
      <div className="entered-duration">
        <input 
          type="number" 
          name="hours"
          ref={this.hoursRef}
          min="0" max="23"
          placeholder="hours"
          onChange={this.handleChange}
        />
        <input 
          type="number" 
          name="minutes"
          ref={this.minutesRef}
          min="0" max="59"
          placeholder="minutes"
          onChange={this.handleChange}
        />
        <input 
          type="number" 
          name="seconds"
          ref={this.secondsRef}
          min="0" max="59"
          placeholder="seconds"
          onChange={this.handleChange}
        />
      </div>
      <div className="time-controls">
        <button type="submit">Set</button>
        {this.props.timerStop ? 
          <button type="button" onClick={this.props.continueTimer}>Continue</button>
          :
          null
        }
      </div>
    </form>
    );
  }
}

export default Time;