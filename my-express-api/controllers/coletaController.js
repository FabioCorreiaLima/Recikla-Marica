
const Coleta = require('../models/Coleta');

exports.createColeta = async (req, res) => {
  const { material, quantity, date, address } = req.body;
  const userId = req.user.id;
  // console.log(userId);
  try {
    const coleta = await Coleta.create({
      material,
      quantity,
      date,
      address,
      userId: req.user.id,
    });
    res.status(201).json(coleta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.getColetas = async (req, res) => {
  const coletas = await Coleta.findAll();
  res.status(200).json(coletas);
};

exports.updateColeta = async (req, res) => {
  const { id } = req.params;
  const coleta = await Coleta.findByPk(id);
  if (!coleta) return res.status(404).json({ error: 'Coleta não encontrada' });
  
  const { material, quantity, date, address } = req.body;
  coleta.update({ material, quantity, date, address });
  res.status(200).json(coleta);
};

exports.deleteColeta = async (req, res) => {
  const { id } = req.params;
  const coleta = await Coleta.findByPk(id);
  if (!coleta) return res.status(404).json({ error: 'Coleta não encontrada' });
  
  await coleta.destroy();
  res.status(204).send();
};


exports.getAvailableColetas = async (req, res) => {
  try {
    const coletas = await Coleta.findAll({
      where: { status: 'pendente' }  // Apenas coletas que não foram aceitas
    });
    res.status(200).json(coletas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.acceptColeta = async (req, res) => {
  const { id } = req.params;  // ID da coleta a ser aceita
  const coletorId = req.user.id;  // ID do coletor autenticado

  try {
    const coleta = await Coleta.findByPk(id);
    if (!coleta) return res.status(404).json({ error: 'Coleta não encontrada' });

    if (coleta.status !== 'pendente') {
      return res.status(400).json({ error: 'Coleta já foi aceita' });
    }

    coleta.status = 'em retirada';
    coleta.coletorId = coletorId;  // Atribui o coletor à coleta
    await coleta.save();

    // Aqui você pode adicionar a lógica de notificação (ex: enviar e-mail ou push notification)
    console.log(`Notificação enviada ao usuário: A coleta ID ${coleta.id} foi aceita.`);

    res.status(200).json({ message: 'Coleta aceita', coleta });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};