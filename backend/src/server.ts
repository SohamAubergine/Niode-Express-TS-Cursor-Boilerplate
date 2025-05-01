import express from 'express'
import { ErrorMiddleware } from './middlewares'
import routes from './routes'

// Initialize express app
const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use(routes)

// Error handling middleware
app.use(ErrorMiddleware.errorConverter)
app.use(ErrorMiddleware.errorHandler)

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app
