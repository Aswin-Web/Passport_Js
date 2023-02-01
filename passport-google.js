const passport=require('passport')

const  {Strategy}=require('passport-google-oauth20')

const CLIENT_ID='2971i0470h..com'

const CLIENT_SECRET=''

passport.serializeUser((user , done) => {
  console.log(user)
    done(null , user);
    })
passport.deserializeUser(function(user, done) {
  console.log(user);  
  done(null, user);
    });

passport.use(new Strategy({
    clientID:     CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: "https://localhost:3000/cb",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
  return    done(null,profile)
  }
));

