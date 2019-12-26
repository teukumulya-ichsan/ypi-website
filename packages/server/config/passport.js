const UserService = require('@user/services');
const { getById } = new UserService();

const passport = require('passport');
const passportJWT = require('passport-jwt');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;

const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  // console.log('payload received', jwt_payload.id);
  var expirationDate = new Date(jwt_payload.exp * 1000);
  if (expirationDate < new Date()) {
    next(null, false);
  }

  const user = getById(jwt_payload.id);
  next(null, user);

  // const user = getById(jwt_payload.id);

  // if (user) {
  //   next(null, user);
  // } else {
  //   next(null, false);
  // }
});

passport.use(strategy);

module.exports = passport;
