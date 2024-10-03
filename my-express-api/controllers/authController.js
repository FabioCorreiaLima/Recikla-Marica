const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { user, token } = await authService.login(req.body);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.forgotPassword = async (req, res) => {
  try {
    await authService.forgotPassword(req.body.email);
    res.status(200).json({ message: 'Link de redefinição de senha enviado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.resetPassword = async (req, res) => {
  try {
    const token = req.query.token; // Token vindo da query string
    const newPassword = req.body.password; // Nome correto da chave para a nova senha

    // Chama o serviço de redefinição de senha
    await authService.resetPassword(token, newPassword);

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // ID do usuário autenticado
    const profile = await authService.getUserProfile(userId);
    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // ID do usuário autenticado
    const updatedUser = await authService.updateUserProfile(userId, req.body); // Chama o serviço para atualizar o perfil
    res.status(200).json(updatedUser); // Retorna o usuário atualizado
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

