import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o Bootstrap

const RequestCollectionPage = () => {
  const [material, setMaterial] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState('');
  const [address, setAddress] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Estado para mensagem de sucesso

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    const requestData = {
      material,
      quantity,
      date,
      address,
    };

    // Recupera o token do localStorage
    const token = localStorage.getItem('token'); 

    if (!token) {
      alert('Token não encontrado. Faça login novamente.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/coletas', requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response) {
        setSuccessMessage('Coleta solicitada com sucesso!'); 
        setMaterial('');
        setQuantity('');
        setDate('');
        setAddress('');
      }
    } catch (error) {
      alert('Erro na solicitação: ' + error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-md-6">
          <h1 className="text-center">Solicitar Coleta</h1>
          <form onSubmit={handleRequest}>
            <div className="form-group">
              <label htmlFor="formMaterial">Material</label>
              <input
                type="text"
                className="form-control"
                id="formMaterial"
                placeholder="Ex: Garrafas de vidro"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="formQuantity">Quantidade</label>
              <input
                type="text"
                className="form-control"
                id="formQuantity"
                placeholder="Digite a quantidade"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="formDate">Data e Hora</label>
              <input
                type="datetime-local"
                className="form-control"
                id="formDate"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="formAddress">Endereço para Coleta</label>
              <input
                type="text"
                className="form-control"
                id="formAddress"
                placeholder="Digite o endereço"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-3">
              Solicitar Coleta
            </button>
          </form>
          {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>} {/* Mensagem de sucesso */}
        </div>
      </div>
    </div>
  );
};

export default RequestCollectionPage;
