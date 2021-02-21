const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

let transactionsSchema = new mongoose.Schema({
  fecha: {
    type: String,
    required: true,
  },
  prevision: Number,
  importe: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  partida: {
    type: String,
    required: true,
  },
  cuenta: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  }
});

transactionsSchema.plugin(mongoosePaginate);

const Transactions = mongoose.model("Transactions", transactionsSchema);

module.exports = Transactions;
