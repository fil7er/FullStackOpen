require('dotenv').config({ path: './.env.local' })

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL
const MONGO_USERNAME = process.env.MONGO_USERNAME
const MONGO_PASSWORD = process.env.MONGO_PASSWORD

module.exports = {
    PORT,
    MONGO_URL,
    MONGO_USERNAME,
    MONGO_PASSWORD
}