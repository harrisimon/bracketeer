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
      <Droppable droppableId='dropsy'>
        {(provided) => (
          <div innerRef={provided.innerRef} {...provided.droppableProps}>
            {order.map((contestant, index) => (
              <Draggable
                draggableId={contestant.name + index.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {contestant.name}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SeedOrder;
