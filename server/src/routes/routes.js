import express from 'express'
import * as adminControllers from "../controllers/adminControllers.js"

export const routes = express.Router()

routes.get(`/books`, adminControllers.getBooks)
routes.get(`/books/:id`, adminControllers.getBooksID)
routes.post(`/books`, adminControllers.postBooks)
routes.put(`/books/:id`, adminControllers.putBooks)
routes.delete(`/books/:id`, adminControllers.deleteBooks)

routes.get(`/admins`, adminControllers.getAdmins)
