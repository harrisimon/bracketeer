import { FormEvent } from "react"
import { ContestantProps } from "../../types"
const Contestants = ({ contestants, setContestants }: ContestantProps) => {
	// console.log(contestants)

	const handleChange = (e: FormEvent<HTMLInputElement>, index: number) => {
		let items: string[] = [...contestants]
		let item: string = [...items[index]]
		item = e.currentTarget.value
		items[index] = item
		console.log("item", item, "items", items)
		setContestants(items)
	}
	const renderedInputs = contestants.map((contestant, index) => (
		<div key={`textfield${index}`}>
            {index + 1 + ' '}
			<input
                required={true}
				type="text"
				value={contestant}
				name={contestant}
				onChange={(e) => handleChange(e, index)}
				maxLength={64}
			/>
			
        </div>
		
	))
	return <div>{renderedInputs}</div>
}

export default Contestants
