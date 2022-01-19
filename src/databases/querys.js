const bcrypt = require("bcrypt");
const { User, Cadapio } = require("./schema");
const fs = require("fs");
const { reject } = require("bcrypt/promises");

async function findUser(userInfo) {
  const email = userInfo.email;
  const user = await User.findOne({ email });
  return user;
}

async function findUserByIde(_id) {
  const user = await User.findById({ _id });
  return user;
}

async function validateUser(email, username) {
  const verifyUser = await User.findOne(
    { $or: [{ email }, { username }] },
    (err, doc) => {
      if (err) {
        return err;
      }
      return doc;
    }
  ).clone();
  return verifyUser;
}

async function criaNovoUsario(reqBody) {
  const encryptedPassword = await bcrypt.hash(reqBody.password, 10);
  const admin = reqBody.codigo;
  const codigoServidor = process.env.CODIGO;

  const adminCodigo = codigoServidor === admin;
  console.log(adminCodigo);

  if (!adminCodigo) {
    return reject("O codigo da admin incorreto");
  }
  const newUser = new User({
    name: reqBody.name,
    username: reqBody.username,
    email: reqBody.email,
    password: encryptedPassword,
    profileimage: null,
  });

  try {
    const saveNewUser = await newUser.save();
    return saveNewUser;
  } catch (err) {
    return err;
  }
}

async function updateProfile(req, next) {
  const id = req.user._id;

  const findUserIfexist = await findUserByIde(id);

  if (findUserIfexist !== null) {
    let Update;

    const { name, username, email } = req.body;
    const file = req.file;

    if (file) {
      const img = fs.readFileSync(file.path);
      const imgBase64 = img.toString("base64");

      const Photo = await User.findByIdAndUpdate(
        { _id: id },
        {
          profilePhoto: {
            imageType: file.mimetype,
            imageBase: imgBase64,
          },
        },
        (err, doc) => {
          if (err) {
            return err;
          }
          if (doc) {
            return doc;
          }
        }
      );
    }

    const ifNeedToUpdate =
      name !== req.user.name ||
      username !== req.user.username ||
      email !== req.user.email;

    if (ifNeedToUpdate) {
      const toUpdate = {};

      name && (toUpdate.name = name);
      username && (toUpdate.username = username);
      email && (toUpdate.email = email);

      await User.findByIdAndUpdate({ _id: id }, toUpdate, (err, duc) => {
        if (err) {
          console.log(err);
        }
      });
    }
    return next(Update);
  }
}

async function postCadapio(req, next) {
  const id = req.user._id;

  const findUserIfexist = await findUserByIde(id);

  if (!findUserIfexist) {
    return console.log("user not find");
  }

  const {
    title,
    description,
    category,
    brand,
    platform,
    condition,
    house,
    price,
  } = req.body;

  const novoCadapio = new Cadapio({
    title: title,
    description: description,
    category: category,
    brand: brand,
    platform: platform,
    condition: condition,
    house: house,
    price: price,
    seller: id,
  });

  await novoCadapio.save((err, doc) => {
    if (err) {
      return console.log(err);
    }
    return next(doc);
  });
}

async function findAllCadapios(next) {
  await Cadapio.find((err, doc) => {
    if (err) {
      return next(err);
    }
    return next(doc);
  });
}

async function findCadapioByIde(_id, next) {
  const cadapio = await Cadapio.findById({ _id });
  return next(cadapio);
}

module.exports = {
  updateProfile,
  findUser,
  findUserByIde,
  validateUser,
  criaNovoUsario,
  postCadapio,
  findAllCadapios,
  findCadapioByIde,
};
