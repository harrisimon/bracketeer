import { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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

  console.log(order, 'in seed');

  // console.log(obj);
  // for (const key of order) {
  //   obj[key] = order.indexOf(key);
  // }
  // console.log(obj);

  const onDragEnd = (res) => {
    console.log('the end');
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
                  key={contestant.index}
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
