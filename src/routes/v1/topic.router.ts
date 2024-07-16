import express from 'express';
import { createTopic, getTopic, getTopics, updateTopic } from '../../api/v1/controllers/topic.controller';
import { createVocabulary, getVocabularies, updateVocabulary } from '../../api/v1/controllers/vocabylary.controller';
import { createTheory, getTheories, updateTheory } from '../../api/v1/controllers/theory.controller';

const topicRouter = express.Router();

topicRouter.post('/', createTopic);
topicRouter.get('/', getTopics);
topicRouter.get('/:id', getTopic);
topicRouter.put('/:id', updateTopic);

topicRouter.post('/:topicId/vocabularies', createVocabulary);
topicRouter.get('/:topicId/vocabularies', getVocabularies);
topicRouter.put('/:topicId/vocabularies/:vocabularyId', updateVocabulary);

topicRouter.post('/:topicId/theories', createTheory);
topicRouter.get('/:topicId/theories', getTheories);
topicRouter.put('/:topicId/theories/:theoryId', updateTheory);


export default topicRouter;