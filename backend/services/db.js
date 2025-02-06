const { MongoClient } = require('mongodb');
require('dotenv').config(); // Carrega as variáveis de ambiente

// URI de conexão com o MongoDB (substitua pelos seus dados)
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Nome do banco de dados e coleção
const dbName = 'to-do-db';
const collectionName = 'to-do-collection';

var _db; // Variável para armazenar a conexão do banco de dados

// Função para conectar ao banco de dados
async function connectToDB() {
  try {
    await client.connect(); // Aguarda a conexão ser estabelecida
    console.log('✅ Conectado ao MongoDB com sucesso!');
    _db = client.db(dbName);
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
    throw err; // Lança o erro para ser tratado no app.js
  }
}

// Função para buscar documentos
const findDocuments = async () => {
  const collection = _db.collection('to-do-collection');

  try {
    const results = await collection.find({}).toArray();
    return results
  } catch (error) {
    throw new Error(error)
  }
};

// Função para inserir um documento
const insertDocuments = async (document) => {
  const collection = _db.collection('to-do-collection');

  try {
    const results = await collection.insertOne(document);
    return results
  } catch (error) {
    throw new Error(error)
  }
};

// Função para atualizar um documento
const updateDocument = async (document) => {
  const collection = _db.collection('to-do-collection');

  try {
    const results = await collection.updateOne({ _id: document._id}, { $set: document });
    return results
  } catch (error) {
    throw new Error(error)
  }
};

// Função para deletar um documento
const removeDocument = async (document) => {
  const collection = _db.collection('to-do-collection');

  try {
    const results = await collection.deleteOne({ _id: document._id });
    return results
  } catch (error) {
    throw new Error(error)
  }
};

// Exportar as funções
module.exports = {
  connectToDB,
  findDocuments,
  insertDocuments,
  updateDocument,
  removeDocument,
};
