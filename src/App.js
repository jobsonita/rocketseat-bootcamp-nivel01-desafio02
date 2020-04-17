import React, { useEffect, useState } from "react";

import "./styles.css";
import api from 'services/api';

const resource = "/repositories"

function App() {
  const [repos, setRepos] = useState([])

  useEffect(() => {
    api.get(resource).then(resp => setRepos(resp.data))
  }, [])

  async function handleAddRepository() {
    const repository = {
      title: 'title',
      url: 'url',
      techs: []
    }
    const resp = await api.post(resource, repository)
    setRepos(r => [...r, resp.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`${resource}/${id}`)
    setRepos(r => r.filter(item => item.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map((repo) => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
