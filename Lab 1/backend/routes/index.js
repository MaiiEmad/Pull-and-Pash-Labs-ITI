import express from "express";

const routes = express.Router();
const messages = [];

routes.get('/messages', (req, res) => {
    const messagesCount = req.query.count;
    res.json(messages.slice(messagesCount));
});

routes.post('/messages', (req, res) => {
    const {body} = req;
    messages.push(body);
    res.sendStatus(204);
});

const subscribers = {};
routes.get('/long-messages', (req, res) => {
    const ID = Math.ceil(Math.random()*1000);
    subscribers[ID] = res;
});

routes.post('/long-messages', (req, res) => {
    const {body} = req;
    Object.entries(subscribers).forEach(([ID, response]) => {
        response.json(body);
        delete subscribers[ID];
    });
    res.sendStatus(204);
});

export default routes;
