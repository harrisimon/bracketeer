import { useState } from "react"
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd"
import { StrictModeDroppable as Droppable } from "../../helpers/StrictModeDroppable"
import { ContestantProps as SeedOrderProps } from "../../types"

const SeedOrder = ({
	contestants,
	setContestants,
	sliderVal,
}: SeedOrderProps) => {
	const order = contestants.slice(0, 2 ** sliderVal)

	const onDragEnd = (res: DropResult) => {
		if (!res.destination) return
		const newOrder = [...contestants]
		const [movedItem] = newOrder.splice(res.source.index, 1)
		newOrder.splice(res.destination.index, 0, movedItem)
		setContestants(newOrder)
	}

	return (
		<div>
			Drag order to adjust seeding!
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="seeding-order">
					{(provided) => (
						<ul
							className="seeding-contestants"
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{order.map((contestant, index) => {
								return (
									<Draggable
										key={
											contestant.name +
											contestant.index.toString()
										}
										draggableId={
											contestant.name +
											contestant.index.toString()
										}
										index={index}
									>
										{(provided) => (
											<li
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
											>
												<div>
													<span className="number-order">{index + 1} </span><span>{contestant.name}</span>
												</div>
											</li>
										)}
									</Draggable>
								)
							})}
							{provided.placeholder}
						</ul>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	)
}

export default SeedOrder
