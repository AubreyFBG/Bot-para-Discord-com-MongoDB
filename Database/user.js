const { Schema, model } = require("mongoose");

const userset = new Schema({
  userID: { type: String },
  economia: {
      trabalho: {
          maxmoney: { type: Number },
          trampo: { type: String },
          cooldown: { type: Number }
      },
      marry:{
        casado: { type: Boolean, default: false },
        com: { type: String }
      },
      banco: { type: Number, default: 0 },
      money: { type: Number, default: 0 },
      sobremim: { type: String, default: "Use /sobremim para alterar este texto."}
  },
  cooldowns: {
    trabalho: { type: String, default: 0 },
    work: { type: String, default: 0 },
    daily: { type: String, default: 0 },
  },
});

module.exports = model("Usuários", userset);
