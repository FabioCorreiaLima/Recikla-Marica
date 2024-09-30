const Post = require('../models/Posts');

exports.createPost = async (req, res) => {
  const { titulo, conteudo } = req.body;
  try {
    const post = await Post.create({
      titulo,
      conteudo,
      userId: req.userId,
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPosts = async (req, res) => {
  const posts = await Post.findAll();
  res.status(200).json(posts);
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByPk(id);
  if (!post) return res.status(404).json({ error: 'Post não encontrado' });
  
  const { titulo, conteudo } = req.body;
  post.update({ titulo, conteudo });
  res.status(200).json(post);
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByPk(id);
  if (!post) return res.status(404).json({ error: 'Post não encontrado' });
  
  await post.destroy();
  res.status(204).send();
};

module.exports = {
    createPost,
    getPost,
    updatePost,
    deletePost
};