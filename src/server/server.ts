import express from "express"
import cors from "cors"
import mongoose, { ConnectOptions } from "mongoose"
import dotenv from "dotenv"

dotenv.config()

// Database setup
const mongooseBaseName = "bracketeer"
const database = {
	development: `mongodb://localhost/${mongooseBaseName}-development`,
	test: `mongodb://localhost/${mongooseBaseName}-test`,
}

// used for cors
const serverDevPort = 8000
const clientDevPort = 3000

// pulling in .env
const localDb = process.env.TESTENV ? database.test : database.development

const currentDb = process.env.MONGODB_URI || localDb

// @ts-ignore
const app = express()
app.use(
	cors({
		origin: process.env.CLIENT_ORIGIN || `http://localhost:${clientDevPort}`,
	})
)
const PORT = process.env.PORT || serverDevPort

mongoose.connect(currentDb, {
    useNewUrlParser: true,
} as ConnectOptions)

app.use(express.json())


// ROUTES GO HERE


app.listen(PORT, () => {
	console.log(`your server on port:${PORT} is running you better catch it`)
})
