import Joi from 'joi';
import { User } from '../models/index.js';
import { signToken } from '../utils/jwt.js';

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(60).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const register = async (req, res, next) => {
  try {
    const { value, error } = registerSchema.validate(req.body);
    if (error) throw Object.assign(new Error(error.message), { status: 400 });

    const exists = await User.findOne({ where: { email: value.email } });
    if (exists) throw Object.assign(new Error('Email already in use'), { status: 409 });

    const user = await User.create(value); // password hash via hook
    const token = signToken({ id: user.id, role: user.role, name: user.name });

    res.status(201).json({ ok: true, token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { value, error } = loginSchema.validate(req.body);
    if (error) throw Object.assign(new Error(error.message), { status: 400 });

    const user = await User.findOne({ where: { email: value.email } });
    if (!user || !(await user.comparePassword(value.password)))
      throw Object.assign(new Error('Invalid credentials'), { status: 401 });

    const token = signToken({ id: user.id, role: user.role, name: user.name });
    res.json({ ok: true, token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
};