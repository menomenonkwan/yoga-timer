import React from 'react';

const Pose = (props) => {
  const { name, duration } = props.poses;  
  return ( 
    <li ref={props.provided.innerRef} {...props.provided.draggableProps} {...props.provided.dragHandleProps}>
      <div className="list-item-inner">
        <div className="item-controls">
          <span onClick={() => props.deletePose(props.index)}><i className="far fa-times-circle"></i></span>
          <span onClick={() => props.movePosition(props.index, -1)}><i className="fas fa-chevron-up"></i></span>
          <span onClick={() => props.movePosition(props.index, 1)}><i className="fas fa-chevron-down"></i></span>
        </div>
        <h3>{name}</h3>
        <p className="pose-duration">{Math.floor(duration / 60)}:{('0' + duration % 60).slice(-2)}</p>
      </div>
    </li>
  );
}

export default Pose;