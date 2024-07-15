import express from 'express';
import Topic from '../models/topic.model';
import Logger from '../../../utils/logger.util';

const createTopic = (req: express.Request, res: express.Response) => {
  const topic = new Topic(req.body);
  topic.save().then(topic => {
    Logger.info('Topic created');
    return res.status(201).json(topic);
  }).catch((error) => {
    Logger.error(error);
    return res.status(500).json({ 'error': 'Internal Server Error' });
  });
};

const updateTopic = (req: express.Request, res: express.Response) => {
  Logger.info(res);
  Logger.info(req);
};

const deleteTopic = (req: express.Request, res: express.Response) => {
  Logger.info(res);
  Logger.info(req);
};

const getTopic = (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  Topic.findById(id).then(topic => {
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    return res.status(200).json(topic);
  })
    .catch((error) => {
      Logger.error(error);
      return res.status(500).json({ 'error': 'Internal Server Error' });
    });

};

const getTopics = (_: express.Request, res: express.Response) => {
  Topic.find()
    .then(topics => {
      Logger.info("Get topics successfully");
      return res.status(200).json(topics);
    })
    .catch((error) => {
      Logger.error(error);
      return res.status(500).json({ 'error': 'Internal Server Error' });
    });
};


export {
  createTopic,
  deleteTopic,
  getTopic,
  getTopics,
  updateTopic,
};