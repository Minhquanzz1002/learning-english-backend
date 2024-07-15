import express from 'express';
import Logger from '../../../utils/logger.util';
import Vocabulary from '../models/vocabulary.model';

const createVocabulary = (req: express.Request, res: express.Response) => {
  const vocabulary = new Vocabulary(req.body);
  vocabulary.save().then(vocabulary => {
    Logger.info('Vocabulary created');
    return res.status(201).json(vocabulary);
  }).catch((error) => {
    Logger.error(error);
    return res.status(500).json({ 'error': 'Internal Server Error' });
  });
};

const getVocabulary = (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  Vocabulary.findById(id).then(vocabulary => {
    if (!vocabulary) {
      return res.status(404).json({ error: 'Vocabulary not found' });
    }
    return res.status(200).json(vocabulary);
  })
    .catch((error) => {
      Logger.error(error);
      return res.status(500).json({ 'error': 'Internal Server Error' });
    });
};

const getAllVocabulary = (_: express.Request, res: express.Response) => {
  Vocabulary.find()
    .then(vocabulary => {
      Logger.info('Get all vocabulary successfully');
      return res.status(200).json(vocabulary);
    })
    .catch((error) => {
      Logger.error(error);
      return res.status(500).json({ 'error': 'Internal Server Error' });
    });
};


export {
  createVocabulary,
  getVocabulary,
  getAllVocabulary,
};