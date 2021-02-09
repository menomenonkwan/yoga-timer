import React from 'react';
import Pose from "./Pose";
import { DragDropContext, Droppable, Draggable  } from 'react-beautiful-dnd';

const List = (props) => {
  const poses = props.poses;

  return (
    <DragDropContext onDragEnd={props.handleOnDragEnd}>
      <Droppable droppableId="poses">
        {(provided) => (
          <ul 
            id="list" 
            {...provided.droppableProps} 
            ref={provided.innerRef}
          >
            {poses.map((pose, index) => (
              (pose === undefined ? '' :
                <Draggable key={pose.id} draggableId={pose.id} index={index}>
                  {(provided) => (
                    <Pose 
                      provided={provided}
                      index={index}
                      poses={props.poses[index]}
                      deletePose={props.deletePose}
                      movePosition={props.movePosition}
                    />  
                  )}
                </Draggable>  
              )
            ))} 
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default List;