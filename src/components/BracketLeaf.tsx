import React, { FC,ReactElement } from "react"

type ChildProps = {
    name: string,
    votes: number,
}

const BracketLeaf: FC<ChildProps> = ({ name, votes }) => {
	return (
		<div className="bracket-leaf">
			<h4>{name}</h4>
            <div>{votes}</div>
		</div>
	)
}

export default BracketLeaf
