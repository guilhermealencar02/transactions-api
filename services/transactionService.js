// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
// const TransactionModel = require('../models/TransactionModel');

import mongoose from 'mongoose';
import TransactionModel from '../models/TransactionModel.js';
import 'dotenv/config.js'; // encontrei no github

const db = {};
db.mongoose = mongoose;
db.transaction = TransactionModel(mongoose);
db.url = process.env.DB_CONNECTION;

export { db };
