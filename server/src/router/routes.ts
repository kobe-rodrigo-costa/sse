import {Router} from "express";
import api from "../api"
import { Events } from "../controller/events";
const eventService = new Events();

export const routes = Router();

routes.use((req, _, next) => {
    console.info(req.path);
    return next();
});


routes.get('/events/:id', async (req, res) => {
    eventService.eventsHandler(req, res, api.clients);
});

