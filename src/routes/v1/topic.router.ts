import express from 'express';
import { createTopic, getTopic, getTopics, updateTopic } from '../../api/v1/controllers/topic.controller';
import { createVocabulary, getVocabularies, updateVocabulary } from '../../api/v1/controllers/vocabylary.controller';

const topicRouter = express.Router();

topicRouter.post('/', createTopic);
topicRouter.get('/', getTopics);
topicRouter.get('/:id', getTopic);
topicRouter.put('/:id', updateTopic);
topicRouter.post('/:topicId/vocabularies', createVocabulary);
topicRouter.get('/:topicId/vocabularies', getVocabularies);
topicRouter.put('/:topicId/vocabularies/:vocabularyId', updateVocabulary);


export default topicRouter;