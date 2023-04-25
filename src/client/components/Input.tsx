import { useState, useEffect } from "react"
import Slider from "./Slider"
import InputsArray from "./InputsArray"
import Contestants from "./Contestants"

// a submit button could send the contestants array to a separate view for seed-ordering, or straight to the create tournament api if already ordered (or if user doesn't care about order)

const Input = () => {
	const [sliderVal, setSliderVal] = useState(3)

	const [contestants, setContestants] = useState(
		new Array(2 ** sliderVal).fill("")
	)

	useEffect(() => {
		setContestants(new Array(2 ** sliderVal).fill(""))
	}, [sliderVal])

  const handleSubmit =(e: React.FormEvent) => {
    e.preventDefault()
    console.log("le contestant",contestants)
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
			<form onSubmit={handleSubmit}>
				<Contestants
					contestants={contestants}
					setContestants={setContestants}
				/>
				<button>Submit!</button>
			</form>
		</div>
	)
}

export default Input
