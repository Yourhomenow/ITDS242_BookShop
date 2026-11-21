import express from 'express'
import * as adminControllers from "../controllers/adminControllers.js"
import * as publicControllers from "../controllers/publicControllers.js"
import * as loginControllers from "../controllers/loginController.js"
import { requireAuth } from '../middleware/Auth.js'

export const routes = express.Router()

routes.get(`/books`, publicControllers.getBooks)
routes.get(`/books/:id`, publicControllers.getBooksID)
routes.get(`/books/:id/related`, publicControllers.getBookRelated)

routes.get(`/admins/books`, requireAuth,adminControllers.getBooks)
routes.get(`/admins/books/:id`, requireAuth, adminControllers.getBooksID)
routes.post(`/admins/books`,requireAuth, adminControllers.postBooks)
routes.put(`/admins/books/:id`,requireAuth, adminControllers.putBooks)
routes.delete(`/admins/books/:id`,requireAuth, adminControllers.deleteBooks)

routes.get(`/admins/:id`, requireAuth,adminControllers.getAdmin)
routes.put(`/admins/:id`, requireAuth,adminControllers.editAdmin)
routes.delete(`/admins/:id`, requireAuth,adminControllers.deleteAdmin)
routes.get(`/admins`,adminControllers.getAdmins)

routes.post("/register", loginControllers.register)
routes.post("/login", loginControllers.login)
routes.get("/me", requireAuth, loginControllers.me)
routes.post("/logout",loginControllers.logout)