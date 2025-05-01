import { Router } from 'express'
import v1Routes from './v1'

const router = Router()

// Mount v1 routes
router.use('/api/v1', v1Routes)

export default router
