import express from 'express'
import * as userController from "../controllers/userControllers.js"

export const userRoutes = express.Router()

userRoutes.get(`/books`, userController.getฺBooks)
userRoutes.get(`/books/:id`, userController.getฺBooksID)
userRoutes.post(`/books`, userController.postBooks)
userRoutes.put(`/books/:id`, userController.putBooks)
userRoutes.delete(`/books/:id`, userController.deleteBooks)

userRoutes.get(`/`, userController.getUsers)
