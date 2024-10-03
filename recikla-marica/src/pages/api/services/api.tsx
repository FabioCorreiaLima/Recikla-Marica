// services/api.ts
import axios from 'axios';

// Define a URL base para as APIs
const api = axios.create({
    baseURL: 'http://localhost:3001', // URL base do backend
    headers: {
        'Content-Type': 'application/json',
    },
});

// Função para fazer login
export const login = async (email: string, password: string) => {
    return await api.post('/auth/login', { email, password });
};

// Função para fazer cadastro
export const register = async (name: string, email: string, password: string) => {
    return await api.post('/auth/register', { email, password });
};

// Função para enviar e-mail de recuperação de senha
export const sendForgotPasswordEmail = async (email: string) => {
    return await api.post('/api/auth/forgot-password', { email });
};

// Função para redefinir a senha
export const resetPassword = async (token: string, password: string) => {
    return await api.post('/api/auth/reset-password', { token, password });
};

// Função para obter perfil
export const getProfile = async () => {
    const token = localStorage.getItem('token');
    return await api.get('/auth/profile', {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
};

// Função para atualizar perfil
export const updateProfile = async (data: FormData) => {
    const token = localStorage.getItem('token');
    // Verifique os valores do FormData
    for (let [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }
    return await api.put('/auth/profile', data, {
        headers: {
        'Authorization': `Bearer ${token}`,
        },
    });
};

// Função para solicitar coleta
export const requestCollection = async (data: { material: string, quantity: string, date: string, address: string }) => {
    return await api.post('/api/collection', data);
};

// Função para obter a lista de coletas
export const getCollections = async () => {
    return await api.get('/api/collections');
};