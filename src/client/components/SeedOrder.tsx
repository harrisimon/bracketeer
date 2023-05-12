import { useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { ContestantProps as SeedOrderProps } from '../../types';

const SeedOrder = ({
  contestants,
  setContestants,
  sliderVal,
}: SeedOrderProps) => {
  const order = contestants.slice(0, 2 ** sliderVal);
  // const renderedContestants = order.map((contestant, index) => (
  // 	<Draggable draggableId={} index={index}>
  // 		<div>{contestant}</div>
  // 	</Draggable>
  // ))
  // const obj: { [k: string]: {} } = {};
  // order.map((el, i) => {
  //   obj[i] = el;
  // });

  // console.log(obj);
  // for (const key of order) {
  //   obj[key] = order.indexOf(key);
  // }
  // console.log(obj);

  const onDragEnd = (res: DropResult) => {
    if (!res.destination) return;
    const newOrder = [...contestants];
    const [movedItem] = newOrder.splice(res.source.index, 1);
    newOrder.splice(res.destination.index, 0, movedItem);
    console.log(contestants);
    setContestants(newOrder);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='seeding-order'>
        {(provided) => (
          <ul
            className='seeding-contestants'
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {order.map((contestant, index) => {
              return (
                <Draggable
                  key={contestant.name + contestant.index.toString()}
                  draggableId={contestant.index.toString()}
                  index={index}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <p>{contestant.name}</p>
                    </li>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SeedOrder;
