import express from 'express'
import * as adminControllers from "../controllers/adminControllers.js"

export const routes = express.Router()

routes.get(`/admins/books`, adminControllers.getBooks)
routes.get(`/admins/books/:id`, adminControllers.getBooksID)
routes.post(`/admins/books`, adminControllers.postBooks)
routes.put(`/admins/books/:id`, adminControllers.putBooks)
routes.delete(`/admins/books/:id`, adminControllers.deleteBooks)

routes.get(`/admins/:id`, adminControllers.getAdmin)
routes.put(`/admins/:id`, adminControllers.editAdmin)
routes.get(`/admins`, adminControllers.getAdmins)
routes.post(`/admins`, adminControllers.createAdmin)