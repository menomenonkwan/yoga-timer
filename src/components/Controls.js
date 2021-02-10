import React from 'react';
import { DisplayTime } from './Helpers';
import tone from '../css/audio/mixkit-happy-bell-alert-601.wav';

const Start = (props) => {
  const timer = props.timerOn;

  return (
    <div className="controls">
        <h1>{timer ? 'Cool Down...' : 'Welcome!'}</h1>      
    </div>
  );
}

class Controls extends React.Component { 

  alertBell = (time, bell) => {
    if(time === 5) {
      bell.play();
    }
  }

  alertUser = (pose) => {
    if(pose.duration <= 5) {
      return 'controls alert'
    }
    return 'controls';
  }

  render() {
    const pose = this.props.activePose;

    const bell = new Audio(tone); 

    return (
      <div className={pose ? (this.alertUser(pose)) : 'controls'} >
        {pose ? this.alertBell(pose.duration, bell) : null}
        <button onClick={this.props.pauseTimer} className={this.props.timerPause ? 'active' : ''}>pause</button>
        <div className="current-pose">
          <h1>{pose ? pose.name : 'All Done, buddy'}</h1>
          <h2>{pose ? DisplayTime(pose.duration) : DisplayTime(0)}</h2>
        </div>
      </div>
    );
  }
}

export { Start, Controls };