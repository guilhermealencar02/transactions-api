import { db } from '../services/transactionService.js';

const Transaction = db.transaction;

const create = async (req, res) => {
  const { description, value, category, year, month, day, yearMonth, yearMonthDay, type } = req.body;
  const newTrasaction = new Transaction({
    description: description,
    value: value,
    category: category,
    year: year,
    month: month,
    day: day,
    yearMonth: yearMonth,
    yearMonthDay: yearMonthDay,
    type: type,
  });

  try {
    const data = await newTrasaction.save(newTrasaction);

    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error.message || 'Algum erro ocorreu ao salvar' });
  }
};

const findAll = async (req, res) => {
  const yearMonth = req.query.period;

  //condicao para o filtro no findAll
  var condition = yearMonth ? { yearMonth: { $regex: new RegExp(yearMonth), $options: 'i' } } : {};

  try {
    const data = await Transaction.find(condition).sort({ yearMonthDay: 1 });

    res.send(data);
  } catch (error) {
    res.status(500).send({ message: `Erro ao buscar todas as transações!` });
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Transaction.findById({ _id: id });

    res.send(data);
  } catch (error) {
    res.status(500).send({ message: `Erro ao buscar a transação de id: ${id}` });
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazios!',
    });
  }

  const id = req.params.id;

  try {
    await Transaction.findByIdAndUpdate({ _id: id }, req.body);

    res.send({ message: 'Transação atualizada com sucesso!' });
  } catch (error) {
    res.status(500).send({ message: `Erro ao atualizar a transação de id: ${id}` });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    await Transaction.findByIdAndDelete({ _id: id });

    res.send({ message: 'Transação excluida com sucesso!' });
  } catch (error) {
    res.status(500).send({ message: `Erro ao remover a transação de id: ${id}` });
  }
};

const removeAll = async (req, res) => {
  try {
    await Transaction.deleteMany();

    res.send({ message: `Transações excluidas` });
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Transações' });
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
