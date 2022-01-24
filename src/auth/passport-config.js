const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { validateUser, findUserByIde } = require('../databases/querys');

function initPassport(passport) {
    const authenticateUser = async (email, password, done) => {
        const verifyUser = await validateUser(email, email);
        const user = verifyUser;
        if (user == null) {
            return done(null, false, {
                message: 'nenhum usuário encontrado neste e-mail ou nome de usuário'
            });
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'senha incorreta' });
            }
        } catch (e) {
            return done(e)
        }
    }

    passport.use('local-login', new localStrategy({
        usernameField: 'email'
    }, authenticateUser));

    passport.serializeUser((user, done) => {
        console.log(user)
        process.nextTick(function() {
            done(null, { id: user._id, username: user.username});
          });
    });

    passport.deserializeUser(async (user, done) => {
            process.nextTick(function() {
                return done(null, user);
            })
    });
}

function checkAuthenticated(req, res, next) {
    if (req.session.passport) {
        res.redirect('/admin')
    }
    return next()
}

function checkNotAuthenticated(req, res, next) {
    if (!req.session.passport) {
        return res.redirect('/login')
    }
    next()
}

module.exports = {
    initPassport,
    checkAuthenticated,
    checkNotAuthenticated
}