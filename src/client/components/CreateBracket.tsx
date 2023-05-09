import { useState, FormEvent } from "react"
import { MultiStepForm } from "./MultiStep"

import Input from "./Input"
import SeedOrder from "./SeedOrder"

const CreateBracket = () => {
	const [contestants, setContestants] = useState(new Array(64).fill("").map((u, i)=>({name:'', index:i})))
    const [sliderVal, setSliderVal] = useState(2);
    console.log(contestants)

	const { steps, currStepIndex, step, isFirstForm, isLastForm, back, next } =
		MultiStepForm([
			<Input contestants={contestants} setContestants={setContestants} sliderVal={sliderVal} setSliderVal={setSliderVal}/>,
			<SeedOrder contestants={contestants} setContestants={setContestants} sliderVal={sliderVal}/>,
		])

        function handleSubmit(e: FormEvent) {
            e.preventDefault()
            console.log('le contestant', contestants.slice(0, 2 ** sliderVal));
            if (!isLastForm) return next()
        }
	return (
		
			<div className="form">
				<div className="steps">
					<form onSubmit={handleSubmit}>
						
						{step}
						<div className="nav-buttons">
							{!isFirstForm && (
								<button type="button" onClick={back}>
									Go Back
								</button>
							)}
							<button type="submit">
								{isLastForm ? "Finish" : "Next"}
							</button>
						</div>
					</form>
				</div>
			</div>

	)
}

export default CreateBracket
