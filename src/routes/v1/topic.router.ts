import express from 'express';
import { createTopic, getTopic, getTopics, updateTopic } from '../../api/v1/controllers/topic.controller';

const topicRouter = express.Router();

topicRouter.post('/', createTopic);
topicRouter.get('/', getTopics);
topicRouter.get('/:id', getTopic);
topicRouter.put('/:id', updateTopic);

export default topicRouter;