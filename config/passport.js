const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");
const Org = require("../models/Org");
const secret = require("./keys").secretOrKey;

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
        if (!user) return done(null, false);

        // ID found in user, return user
        if (user) return done(null, user);
        console.log({ user });
      } else {
        // ID found in Org, return org
        if (org) return done(null, org);
        console.log({ org });
      }
    })
  );
};
