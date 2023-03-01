const port = process.env.PORT || 3001;
const app = require('./app');

app.get('/', (_request, response) => {
  response.send();
});

app.listen(port);
console.log(`Api rodando na porta ${port}`);
