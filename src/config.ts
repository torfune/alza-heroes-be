export const PORT = Number(process.env.APP_PORT) || 8000

const DB_PASSWORD = process.env.APP_DB_PASSWORD
export const MONGO_URI = `mongodb+srv://root:${DB_PASSWORD}@alza-heroes-oezog.mongodb.net/test?retryWrites=true&w=majority`
