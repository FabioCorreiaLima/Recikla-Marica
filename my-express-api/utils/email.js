const nodemailer = require('nodemailer');

// Configuração do transportador
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // false para 587, pois estamos usando TLS
  auth: {
    user: 'reciklamarica@gmail.com', 
    pass: 'mpktsbgiqzlratbk'          
  },
  tls: {
    rejectUnauthorized: false 
  }
});

async function sendResetPasswordEmail(email, resetToken) {
  
  const resetUrl = `http://localhost:3000/auth/reset-password?token=${resetToken}`;

  
  const mailOptions = {
    from: '"Recikla Maricá" <reciklamarica@gmail.com>', 
    to: email,                                          
    subject: 'Redefinição de Senha - Recikla Maricá',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; display: flex; justify-content: center; align-items: center;">
        <div style="max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 8px; text-align: center;">
          <img src="https://github.com/FabioCorreiaLima/chat-node/blob/main/my-express-api/src/public/IMG-20241030-WA0027-removebg-preview.png?raw=true" alt="Recikla Maricá Logo" style="width: 150px; height: 150px; margin: 30px 0;" /> <!-- Ajusta o tamanho para 150x150 e adiciona margem -->
          <h2 style="color: #4CAF50;">Recikla Maricá</h2>
          <p>Olá,</p>
          <p>Recebemos uma solicitação para redefinir sua senha. Se você não solicitou essa alteração, ignore este e-mail.</p>
          <p>Para redefinir sua senha, clique no link abaixo:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a 
              href="${resetUrl}" 
              style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #4CAF50; text-decoration: none; border-radius: 5px; font-weight: bold;"
            >
              Redefinir Senha
            </a>
          </div>
          <p>Ou copie e cole o seguinte link em seu navegador:</p>
          <p style="text-align: center;"><a href="${resetUrl}" style="color: #4CAF50;">${resetUrl}</a></p>
          <p>Atenciosamente,</p>
          <p><strong>Equipe Recikla Maricá</strong></p>
        </div>
      </div>
    `
  };

  try {
    // Enviar o e-mail
    await transporter.sendMail(mailOptions);
    console.log('Email de redefinição de senha enviado com sucesso');
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error.message);
    throw new Error('Falha ao enviar e-mail de redefinição de senha');
  }
}

module.exports = { sendResetPasswordEmail };
