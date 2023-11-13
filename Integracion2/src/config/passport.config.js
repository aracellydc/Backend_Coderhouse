import passport from 'passport'
import local from 'passport-local'
import UserManager from "../controllers/UserManager.js"
import jwt from "passport-jwt"


const LocalStrategy = local.Strategy
const JwtStrategy = jwt.Strategty
const ExtractJwt = jwt.ExtractJwt
const cookieExtracror = req => {
  let token = null
  if(req && req.cookies){
      token = req.cookies["token"]
  }
  return token
}                                                                                                                                                                                                                                   
const initializePassport = () => {
    passport.use('jwt', new JwtStrategy({
        jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: 'Secret-key'
    }, async(jwt_payload, done)=>{
        try{
            return done(null, jwt_payload)
        }
        catch(err){
            return done(err)
        }
    }
    ))
}
export default initializePassport