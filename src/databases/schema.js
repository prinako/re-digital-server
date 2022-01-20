const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const cadapioSchema = new Schema(
  {
    data: {
      type: String,
      require: true,
      unique: true,
    },
    amoco: {
      refeicao: {
        type: String,
        require: true,
      },
      nomeDaRefei: {
        type: String,
        require: true,
      },
      ingredintes: {
        amo1: {
          type: String,
          require: true,
        },
        amo2: {
          type: String,
        },
        amo3: {
          type: String,
        },
        amo4: {
          type: String,
        },
        amo5: {
          type: String,
        },
      },
    },
    jantar: {
      refeicao: {
        type: String,
        require: true,
      },
      nomeDaRefei: {
        type: String,
        require: true,
      },
      ingredintes: {
        jan1: {
          type: String,
          require: true,
        },
        jan2: {
          type: String,
        },
        jan3: {
          type: String,
        },
        jan4: {
          type: String,
        },
        jan5: {
          type: String,
        },
      },
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", usersSchema);
const Cadapio = mongoose.model("cadapio", cadapioSchema);

module.exports = {
  User,
  Cadapio,
};
