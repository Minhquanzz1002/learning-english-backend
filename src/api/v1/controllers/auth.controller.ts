import express from 'express';
import User from '../models/user.model';
import Logger from '../../../utils/logger.util';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthorizationError } from '../errors/AuthorizationError';
import { BadRequestError } from '../errors/BadRequestError';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "ajlkdfjsdlff8938734";

const login = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    Logger.info('Không tìm thấy tài khoản');
    return next(new AuthorizationError('Tài khoản hoặc mật khẩu không đúng'));
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    Logger.info('Mật khẩu không đúng');
    return next(new AuthorizationError('Tài khoản hoặc mật khẩu không đúng'));
  }

  const accessToken = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET_KEY, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET_KEY, { expiresIn: '14d' });
  const { password: _, ...userWithoutPassword } = user.toObject();
  return res.status(200).json({ refreshToken, accessToken, profile:  userWithoutPassword});
};

const register = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const {username, password} = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    Logger.warning("Tên đăng nhập đã tồn tại");
    return next(new BadRequestError("Tên đăng nhập đã tồn tại"));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username: username,
    name: username,
    password: hashedPassword,
  });

  const newUser = await user.save();

  const { password: _, ...userWithoutPassword } = newUser.toObject();
  return res.status(201).json(userWithoutPassword);
};


export {
  login,
  register,
};