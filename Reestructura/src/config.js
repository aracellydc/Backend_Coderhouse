import dotenv from 'dotenv';

dotenv.config();

export default {
    port: 8080,
    mongoUrl: process.env.MONGO_URL
}