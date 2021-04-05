const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

let transactionSchema = new mongoose.Schema({
  fecha: {
    type: String,
    required: true,
  },
  prevision: Number,
  importe: {
    type: Number,
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

transactionSchema.plugin(mongoosePaginate);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
