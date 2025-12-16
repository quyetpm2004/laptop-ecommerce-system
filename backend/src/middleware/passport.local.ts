import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { handleGetRoleUser, handleGetUserSumCart, handleLogin } from "services/auth.service";


const configPassportLocal = () => {
    passport.use(new LocalStrategy({
        passReqToCallback: true
    }, function verify(req, username, password, callback) {
        const {session } = req as any
        if(session?.messages?.length) {
            session.messages = []
        }
    return handleLogin(username, password, callback)
}));
passport.serializeUser(function(user: any, callback) {
    return callback(null, {
      id: user.id
    });
  });

passport.deserializeUser(async function(user: any, callback) {
    const { id, username } = user
    // query to database
    const userInDB = await handleGetRoleUser(id);

    const sumCart = await handleGetUserSumCart(id)

    return callback(null, {...userInDB, password: "", sumCart: sumCart});
});
}

export default configPassportLocal