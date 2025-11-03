import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tempdb'

let cached = (global as any).mongoose
if (!cached) cached = (global as any).mongoose = { conn: null, promise: null }

export async function dbConnect() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    mongoose.set('strictQuery', true)
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'graphicshubdb',
    } as mongoose.ConnectOptions)
  }
  cached.conn = await cached.promise
  return cached.conn
}
