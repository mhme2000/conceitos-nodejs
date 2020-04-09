const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body;
  const repositor = {
    id : uuid(),
    title,
    url,
    techs,
    likes:0
  };

  repositories.push(repositor);

  return response.json(repositor);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs} = request.body;

  const repositorIndex = repositories.findIndex(repositor => repositor.id === id);


  if(repositorIndex < 0) {
    return response.status(400).json({ error: 'Repositor not found.' });
  };

  const { likes } = repositories[repositorIndex];

  const repositor = {
    id,
    title,
    url,
    techs,
    likes,
  };

  repositories[repositorIndex] = repositor;
  
  return response.json(repositor);
  
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  
  const repositorIndex = repositories.findIndex(repositor => repositor.id === id);

  if(repositorIndex < 0 ) {
    return response.status(400).json({ error : 'Repositor not found.' });
  };

  repositories.splice(repositorIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositorIndex = repositories.findIndex(repositor => repositor.id === id);
  
  if(repositorIndex < 0) {
    return response.status(400).json({ error: 'Repositor not found.' });
  };

  const { likes, title, url, techs } = repositories[repositorIndex];

  const repositor = {
    id,
    title,
    url,
    techs,
    likes : likes + 1
  }

  repositories[repositorIndex] = repositor;

  return response.json(repositor);

});

module.exports = app;
