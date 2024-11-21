const express = require('express');
const bodyParser = require('body-parser');
const jsforce = require('jsforce');  // Para se conectar ao Salesforce

const app = express();
const port = 3000;

// Servindo arquivos estáticos da pasta atual
app.use(express.static(__dirname));  // __dirname faz referência à pasta onde o server.js está

// Usando o bodyParser para processar requisições POST com JSON
app.use(bodyParser.json());

// Rota para verificar se o usuário existe no Salesforce
app.post('/check-user', (req, res) => {
  const { email, password } = req.body;

  // Conectando ao Salesforce
  const conn = new jsforce.Connection({
    loginUrl: 'https://login.salesforce.com'
  });

  conn.login('gabrielkalebaragao@creative-impala-evg5lq.com', 'p1rul1t0', (err, userInfo) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao autenticar no Salesforce' });
    }

    // Consulta no Salesforce
    const query = `SELECT Id, Name, Email FROM Cliente__c WHERE Email = '${email}' AND Senha__c = '${password}' LIMIT 1`;
    
    conn.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar usuário no Salesforce' });
      }

      if (result.records.length > 0) {
        return res.json({ exists: true });
      } else {
        return res.json({ exists: false });
      }
    });
  });
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
