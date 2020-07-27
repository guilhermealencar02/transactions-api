import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';
import * as path from 'path';
import 'dotenv/config.js';
import { db } from './services/transactionService.js';

const app = express();
app.use(cors());
app.use(express.json());

/**
 * Vinculando o React ao app
 */
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, 'client/build')));

/**
 * Rota raiz
 */
app.get('/api/', (_, response) => {
  response.send({
    message: 'Bem-vindo à API de lançamentos. Acesse /transaction e siga as orientações',
  });
});

/**
 * Rotas principais do app
 */
app.use('/api/transaction', routes);

console.log('Iniciando conexão ao MongoDB...');
(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    connectedToMongoDB = false;
    console.error(`Erro na conexão ao MongoDB - ${error}`);

    process.exit();
  }
})();

const { connection } = db.mongoose;

connection.once('open', () => {
  console.log('Conectado ao MongoDB');

  /**
   * Definição de porta e
   * inicialização do app
   */
  const APP_PORT = process.env.PORT || 3001;
  app.listen(APP_PORT, () => {
    console.log(`Servidor iniciado na porta ${APP_PORT}`);
  });
});
