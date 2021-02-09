import React from 'react';
import { GetTotalSeconds } from './Helpers';
import uniqid from 'uniqid';

class Form extends React.Component {
  nameRef = React.createRef();
  minutesRef = React.createRef();
  secondsRef = React.createRef();
  intervalsRef = React.createRef();

  checkInput = (updatedInput) => {
    if(!Number.isNaN(updatedInput)) { return; }
  }
  
  handleChange = (e) => {
    const name = e.currentTarget.name; 
    const updatedInput = e.currentTarget.value;
    this.props.updateNewPose(updatedInput, name);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const minutes = this.minutesRef.current.value;
    const seconds = this.secondsRef.current.value;
    const intervals = this.intervalsRef.current.value;

    if(this.nameRef.current.value === '') { return; }
    if(minutes === '' && seconds === '') { return; }

    const re = /^[0-9\s]*$/
    if (!re.test(minutes) || !re.test(seconds)) { return;}

    const newPoseArr = [];
    let reps = parseInt(intervals);
    if(reps <= 0 || !reps) { reps = 1};
    
    for ( let i = 0; i < reps; i++ ) {
      const pose = {
        id: `pose${uniqid()}`,
        name: this.nameRef.current.value,
        duration: GetTotalSeconds(minutes, seconds),
        minutes: (minutes ? minutes : 0),
        seconds: (seconds ? seconds : 0),
        intervals: (intervals ? intervals : 1),
        completed: false,
      };
      newPoseArr.push(pose);
    }
    this.props.addNewPose(newPoseArr);
    e.currentTarget.reset();
  }

  addBreak = (e) => {
    e.preventDefault();

    const pose = [{
      id: `pose${uniqid()}`,
      name: 'break',
      duration: this.props.break.duration,
      minutes: 0,
      seconds: this.props.break.duration,
      intervals: 1,
      completed: false,
    }];    
    this.props.addNewPose(pose);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>New Pose</label>
          <input 
            type="text" 
            name="name"
            ref={this.nameRef}
            onChange={this.handleChange}
          /> 
        <label>Duration</label>
          <div className="entered-duration">
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
        <label>Intervals</label>
        <input 
            type="number" 
            name="intervals"
            placeholder='1'
            ref={this.intervalsRef}
            min="1" max="100"
            onChange={this.handleChange}
          /> 
        <div className="time-controls">
          <button type="submit">submit</button>     
          <button type="button" onClick={this.props.clearAll}>clear all</button>           
          <button type="button" onClick={this.addBreak}>insert break</button>                
        </div>
      </form>
    );
  }
}


export default Form;