import dotenv from 'dotenv'

dotenv.config()

const mongooseBaseName = 'bracketeer'

const database = {
	development: `mongodb://localhost/${mongooseBaseName}-development`,
	test:  `mongodb://localhost/${mongooseBaseName}-test`,
}

const localDb = process.env.TESTENV ? database.test : database.development


const currentDb = process.env.MONGODB_URI || localDb

export default currentDb