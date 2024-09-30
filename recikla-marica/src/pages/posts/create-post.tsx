import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreatePostPage = () => {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo || !conteudo ) {
        alert('Todos os campos são obrigatórios!');
        return;
      }  

    const requestData = {
      titulo,
      conteudo,
    };

    try {
      const response = await axios.post('/api/create-post', requestData);
      if (response.status === 200) {
        alert('Postagem criada com sucesso!');
        setTitulo('');
        setConteudo('');
      } else {
        alert(`Falha ao criar postagem: ${response.statusText}`);
      }
    } catch (error) {
      alert('Erro: ' + error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-md-6">
          <h1 className="text-center">Criar Novo Post</h1>
          <form onSubmit={handleRequest}>
            <div className="form-group">
              <label htmlFor="formTitulo">Título</label>
              <input
                type="text"
                className="form-control"
                id="formTitulo"
                placeholder="Insira o título do post"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="formConteudo">Conteúdo do Post</label>
              <input
                type="text"
                className="form-control"
                id="formConteudo"
                placeholder="Insira o conteúdo do post"
                value={conteudo}
                onChange={(e) => setConteudo(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-3">
              Criar Novo Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
