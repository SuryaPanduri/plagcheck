import { Post, User } from '../models/index.js';

export const listPosts = async (_req, res, next) => {
  try {
    const posts = await Post.findAll({ include: [{ model: User, as: 'author', attributes: ['id', 'name'] }], order: [['createdAt', 'DESC']] });
    res.json({ ok: true, posts });
  } catch (err) { next(err); }
};

export const createPost = async (req, res, next) => {
  try {
    const { title, body } = req.body;
    const post = await Post.create({ title, body, authorId: req.user.id });
    res.status(201).json({ ok: true, post });
  } catch (err) { next(err); }
};

export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id, { include: [{ model: User, as: 'author', attributes: ['id', 'name'] }] });
    if (!post) return res.status(404).json({ ok: false, message: 'Not found' });
    res.json({ ok: true, post });
  } catch (err) { next(err); }
};

export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.id, authorId: req.user.id }});
    if (!post) return res.status(404).json({ ok: false, message: 'Not found or not owner' });
    await post.update(req.body);
    res.json({ ok: true, post });
  } catch (err) { next(err); }
};

export const deletePost = async (req, res, next) => {
  try {
    const deleted = await Post.destroy({ where: { id: req.params.id, authorId: req.user.id }});
    if (!deleted) return res.status(404).json({ ok: false, message: 'Not found or not owner' });
    res.json({ ok: true });
  } catch (err) { next(err); }
};