const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const {User} = require("../models/User");
const Org = require("../models/Org");

// .env
const secret = process.env.SECRET_KEY

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      const org = await Org.findById(jwt_payload.id);
      if (!org) {
        // ID not found in Org, Then check in user collection
        const user = await User.findById(jwt_payload.id);

        // ID not found in User, return execution to next handler
        if (!user) {
          return done(null, false);
        }

        // ID found in user, return user
        if (user) {
          let authenticatedUser = {
            ...user._doc,
            role: jwt_payload.role,
          };
          return done(null, authenticatedUser);
        }
      } else {
        // ID found in Org, return org

        if (org) {
          let authenticatedUser = {
            ...org._doc,
            role: jwt_payload.role,
          };
          return done(null, authenticatedUser);
        }
      }
    })
  );
};
