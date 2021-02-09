import React, { Component } from 'react';
import { Start, Controls } from './Controls';
import Form from './Form';
import Header from './Header';
import { AddToTime, DisplayTime, Move } from './Helpers';
import List from './List';
import Time from './Time';
import Timer from './Timer';
import Background1 from '../css/images/max-fGUmhLROnPc-unsplash.jpg';
import Background2 from '../css/images/fabian-blank-pElSkGRA2NU-unsplash.jpg';

class App extends Component {
  constructor() {
    super();

    this.state = {
      backgrounds: {
        image: Background1,
        change: false,
      },
      time: {
        duration: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        set: false,
      },
      intervalTotalTime: {
        duration: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      break: {
        duration: 10,
      },
      poses: [
        {
          id: 'intro',
          name: 'countdown',
          duration: 10,
          minutes: 0,
          seconds: 10,
          intervals: 1,
          completed: false,
        },
      ],
      OGposes: [],
      OGtime: {},
      newPose: {
        name: '',
        duration: '',
        minutes: 0,
        seconds: 0,        
        intervals: 1,
        completed: false,
      },
      timerOn: false,
      activeTimerOn: false,
      timerPause: false,
      activePose: {},
      timerStop: false,
      alert: 'red',
    }
  }

  isActiveTimer = () => {
    this.isActive();
    this.activeTimer = setInterval(() => {
      if(this.state.timerPause) {
        return;
      }

      const poses = [ ...this.state.poses ];
      if(poses === undefined) { return; }
        
      const current = poses[0];
      current.duration--;
      this.setState({
        poses
      });

      if(current.duration < 0) {
        poses.shift();
        this.isActive();
      }
      if(poses.length === 0) {
        clearInterval(this.activeTimer);
        this.setState({ 
          activePose: {},
          activeTimerOn: false 
        });
      }
    }, 1000);    
  }

  isActive = () => {
    this.setState({
      activePose: this.state.poses[0],
      activeTimerOn: true,
    })
  }

  changeBackground = () => {
    const backgrounds = this.state.backgrounds;
    backgrounds.change = !backgrounds.change;
    backgrounds.change ? backgrounds.image = Background2 : backgrounds.image = Background1;
    this.setState({ backgrounds });
  }

  saveStart = () => {
    const poses = [ ...this.state.poses ];
    const arr = [];
    poses.forEach(pose => {
      const eachPose = { ...pose };
      arr.push(eachPose);
    })
    const time = { ...this.state.time };
    this.setState({ 
      OGposes: arr, 
      OGtime: time,
    });
  }

  startTimer = () => {
    this.saveStart();
    if(this.state.time.duration === 0) {
      return;
    }
    
    this.isActiveTimer();
    this.setState({
      timerOn: true,
    });
    this.timer = setInterval(() => {
      const time = this.state.time;
      time.duration = this.state.time.duration - 1;

      if(time.duration > 0) {
        this.setState({ time })
      } else {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
      }
    }, 1000);
  };    

  pauseTimer = () => {
    const timerPause = !this.state.timerPause;
    this.setState({ timerPause });
  }

  updateTime = (updatedTime, name) => {
    const time = { ...this.state.time };
    time[name] = updatedTime;
    this.setState({ time });
  }

  setTime = (time) => {
    this.setState({ time });
  }

  stopTime = () => {
    const time = this.state.time;
    time.set = !time.set;
    clearInterval(this.timer);
    clearInterval(this.activeTimer);
    this.setState({ 
      time, 
      timerOn: false,
      timerStop: true,
    });
  }

  newTime = () => {
    clearInterval(this.timer);
    clearInterval(this.activeTimer);
    const time = this.state.time;
    time.set = !time.set;
    this.setState({ 
      time,
      timerOn: false,
      poses: [{
        id: 'intro',
        name: 'countdown',
        duration: 10,
        minutes: 0,
        seconds: 10,
        intervals: 1,
        completed: false,
      }],
    });  
  }

  clearAll = () => {
    this.setState({ 
      poses: [{
        id: 'intro',
        name: 'countdown',
        duration: 10,
        minutes: 0,
        seconds: 10,
        intervals: 1,
        completed: false,
      }],
    });  
  }

  continueTimer = () => {
    this.startTimer();
    const time = this.state.time;
    time.set = !time.set;
    this.setState({
      timerOn: true,
      activeTimerOn: true,
      timerStop: false,
      time,
    })
  }

  resetTimer = () => {
  const active = {
    name: 'program reset',
    duration: 0,
    completed: false,
  }

    this.stopTime();
    const time = this.state.time;
    time.set = !time.set;
    
    this.setState({
      timerOn: false,
      poses: this.state.OGposes,
      time: this.state.OGtime,
      activePose: active
    })
  }

  updateNewPose = (updatedInput, name) => {
    const newPose = { ...this.state.newPose };
    newPose[name] = updatedInput;
    this.setState({ newPose });
  }

  addNewPose = (pose) => {
    const poses = [ ...this.state.poses, ...pose ];
    this.setState({ 
      poses,
    });

    const newTime = AddToTime(poses);
    this.setState({
      intervalTotalTime: newTime
    })
  };


  deletePose = (index) => {
    const poses = [ ...this.state.poses ];
    poses.splice(index, 1);

    let newTime;    
    if(poses.length < 1) { 
      newTime = {
        duration: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    } else {
      newTime = AddToTime(poses);
    }

    this.setState({
      intervalTotalTime: newTime,
      poses
    })
  }

  movePosition = (index, newIndex) => {
    const poses = [ ...this.state.poses ];
    const newOrder = Move(poses, index, newIndex);
    this.setState({ poses: newOrder });
  }

  handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = [ ...this.state.poses ];
    const [reorderedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, reorderedItem);

    this.setState({
      poses: reordered
    })
  }

  KeyPressPause = (e) => {
    // if(e.keyCode !== 32) { return; }
    if(this.state.timerOn) {
      const timerPause = !this.state.timerPause;
      this.setState({ timerPause });
    }   
  }

  componentDidMount() {
    document.addEventListener("keydown", this.KeyPressPause);
  }
  
  componentWillUnmount() {
    document.addEventListener("keydown", this.KeyPressPause);
  }

  render() {
    const programTime = <h3>{DisplayTime(this.state.intervalTotalTime.duration)}</h3>;

    return (
      <div id="page" style={{backgroundImage: "url(" + this.state.backgrounds.image + ")"}}> 
        <Header onClick={this.changeBackground}/>
        {this.state.activeTimerOn ? 
          <Controls 
            activePose={this.state.activePose}
            timerPause={this.state.timerPause} 
            pauseTimer={this.pauseTimer} 
          />
          :
          <Start timerOn={this.state.timerOn}/>
        } 
        <div className="container">
          <div id="task-info">
            {this.state.time.set ? 
              <Timer 
                time={this.state.time}
                timerOn={this.state.timerOn} 
                startTimer={this.startTimer}
                resetTimer={this.resetTimer}
                stopTime={this.stopTime}
                newTime={this.newTime}
              /> 
              : 
              <Time 
                time={this.state.time} 
                updateTime={this.updateTime}
                setTime={this.setTime}
                timerStop={this.state.timerStop}
                continueTimer={this.continueTimer}
              />
            }
            {this.state.timerOn ? null : 
              <Form 
                updateNewPose={this.updateNewPose}
                addNewPose={this.addNewPose}
                break={this.state.break}
                clearAll={this.clearAll}
              />
            }
          </div>
          <div id="timer-list">
            <h2>Current Plan</h2>
            {programTime}
            <List 
              poses={this.state.poses}
              deletePose={this.deletePose}
              movePosition={this.movePosition}
              handleOnDragEnd={this.handleOnDragEnd}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
