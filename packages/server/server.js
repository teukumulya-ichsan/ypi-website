require('module-alias/register');

const express = require('express');
const pino = require('express-pino-logger');
const bodyParser = require('body-parser');
const server = require('@config/server.js');
const routes = require('./routes');
const Sequelize = require('sequelize');
const cors = require('cors');

const UserService = require('@user/services');
const { getById } = new UserService();

const passport = require('passport');
const passportJWT = require('passport-jwt');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET

const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload.id);
  const user = getById(jwt_payload.id);

  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy)

const sequelize = new Sequelize(
  'information_schema',
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const app = express();
app.use(cors());
app.use(passport.initialize());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app, passport);

app.use(pino);

const port = process.env.PORT || server.port;
const host = process.env.HOST || server.host;

module.exports = app.listen(port, host);

console.log(`Server run in port ${port} host ${host}`);
