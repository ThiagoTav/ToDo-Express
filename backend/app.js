const express = require('express');
const cors = require('cors');
const db = require('./services/db');
const Routes = require('./routes/todo');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());

// Função assíncrona para inicializar o servidor
async function startServer() {
  try {
    // Conecta ao MongoDB
    await db.connectToDB();
    console.log('✅ Banco de dados conectado!');

    // Registrar rotas
    app.use('/todo', Routes);

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Erro ao iniciar o servidor:', err);
    process.exit(1); // Encerra o processo com erro
  }
}
// Inicia o servidor
startServer();