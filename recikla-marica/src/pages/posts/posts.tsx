import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


interface Post {
    titulo: string;
    conteudo: string;
}

const PostsPage = () => {
    const [posts, setPosts] = useState<Post[]>([]);
  
    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await axios.get('/api/posts/');
            setPosts(response.data);
          } catch (error) {
            alert('Erro ao carregar postagens: ' + error);
          }
        };
    
        fetchPosts();
      }, []);
    
      return (
        <div className="container mt-5">
          <h1>Postagens</h1>
          <ul className="list-group">
            {posts.map((posts, index) => (
              <li key={index} className="list-group-item">
                <strong>{posts.titulo}</strong> {posts.conteudo} <br />
              </li>
            ))}
          </ul>
        </div>
      );
};

  export default PostsPage;
