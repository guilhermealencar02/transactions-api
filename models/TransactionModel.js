export default (mongoose) => {
  const schema = mongoose.Schema({
    description: {
      type: String,
      required: true,
    },

    value: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 0) throw new Error('Valor negativo para o campo value não permitido!');
      },
    },

    category: {
      type: String,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    month: {
      type: Number,
      required: true,
    },

    day: {
      type: Number,
      required: true,
    },

    yearMonth: {
      type: String,
      required: true,
      validate(yearMonth) {
        if (!yearMonth.match(/^\d{4}-\d{2}$/))
          throw new Error('O campo yearMonth deve ser informado no seguinte formato: yyyy-mm!');
      },
    },

    yearMonthDay: {
      type: String,
      required: true,
      validate(yearMonthDay) {
        if (!yearMonthDay.match(/^\d{4}-\d{2}-\d{2}$/))
          throw new Error('O campo yearMonth deve ser informado no seguinte formato: yyyy-mm-dd!');
      },
    },
    type: {
      type: String,
      require: true,
      validate(type) {
        if (type !== '+') {
          if (type !== '-') {
            throw new Error('O campo type deve ser informado positivo(+) ou negativo(-)!');
          }
        }
      },
    },
  });

  const TransactionModel = mongoose.model('transaction', schema);

  return TransactionModel;
};
