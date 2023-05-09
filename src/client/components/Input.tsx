import { useState, useEffect, useCallback } from "react"
import Slider from "./Slider"
import InputsArray from "./InputsArray"
import Contestants from "./Contestants"
import { InputProps } from "../../types"

// a submit button could send the contestants array to a separate view for seed-ordering, or straight to the create tournament api if already ordered (or if user doesn't care about order)

const Input = ({
	contestants,
	setContestants,
	sliderVal,
	setSliderVal,
}: InputProps) => {
	// const [sliderVal, setSliderVal] = useState(3);
	// const [contestants, setContestants] = useState(new Array(64).fill(''));

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		console.log("le contestant", contestants.slice(0, 2 ** sliderVal))
	}

	return (
		<div>
			<div>hi</div>
			<Slider sliderVal={sliderVal} setSliderVal={setSliderVal} />
			{/* <InputsArray
        contestants={contestants}
        setContestants={setContestants}
        sliderVal={sliderVal}
      /> */}

			<Contestants
				contestants={contestants}
				setContestants={setContestants}
				sliderVal={sliderVal}
			/>
		</div>
	)
}

export default Input
