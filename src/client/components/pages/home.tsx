import { Link } from "react-router-dom"
const Home = () => {
	return (
		<div>
			<h1>Welcome to Bracketeer, yarrr!</h1>
            {/* replace with nav in app eventually */}
			<Link to="/create"> <button>Create a new bracket!</button></Link>
		</div>
	)
}
export default Home
