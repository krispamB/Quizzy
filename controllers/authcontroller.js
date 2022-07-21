const passport = require("passport");

module.exports = {
  auth: passport.authenticate("jwt", { session: false }),
  isOrg: (req, res, next) => {
    if (req.user.role == "ORG") return next();
    return res
      .status(403)
      .json({
        // msg: "You need a minimum level of ORG auth to access this route.",
      });
  },
};
