import express from 'express'
import { json } from 'body-parser'
// @ts-ignore
const app = express()
app.use(json)

app.listen(8000, ()=> {
    console.log('your server is running you better catch it')
})