require('dotenv').config();

const express = require('express');//express js called
const mongoose = require('mongoose');//mongodb connection
const path = require('path');//path require for ejs and other file conections
const methodOverride = require('method-override');//method override is laibery for crud
const ejsMate = require('ejs-mate');//it is tequire for ejs-boilerplatecode
const ExpressError = require('./utils/ExpressError.js');//require a custome error
const session = require('express-session');//require a express-session 
const mongoStore = require('connect-mongo');
const flash = require('connect-flash');//require a connect flash
const app = express();//express js in app variable
const port =3000;;//create a port 
const Passport = require('passport');//passport required....
const Localstrategy = require('passport-local');//passport local required.....
const User = require('./models/user.js'); //user model required....

const UserRoutes = require('./routes/user.js');//user raouter require...
const listingRoutes = require('./routes/listing.js');//require a listing router file     
const rivewsRoutes = require('./routes/rivew.js');//require a rives router files
//it called mongodb database and conect a project nodejs to mangodb database.... 

const dbUrl = process.env.mongo_key ;

async function main() {
    await mongoose.connect(dbUrl).catch((error) => {
        console.log(error);
    })
}
//call a main function..
main().then(() => {
    console.log(`airbnb db is connected`);
})



app.set('view engine', 'ejs');//set frunt-end to ejd
app.set('views', path.join(__dirname, "views"));//set ejs local to globli

app.use(express.static(path.join(__dirname, "public")));//set defoulat folder for css
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs' , ejsMate);

const store = mongoStore.create({
    mongoUrl: dbUrl ,
    crypto: {
        secret : process.env.Secret
    },
    touchAfter :  24 * 3600 
});

store.on('error' , ()=>{
    console.log(`error in mongo error` , error);
})

const sessionOptions = {
    store ,
    secret : process.env.Secret,
    resave: false ,
    saveUninitialized : true ,
    cookie:{
        expires:Date.now() + 7 * 24 * 60 * 60 * 1000 ,
        maxAge:  7 * 24 * 60 * 60 * 1000 ,
        httpOnly : true  
    }
} //create a sesstion options.......


app.use(session(sessionOptions));//use sessions in over projects....
app.use(flash());

app.use(Passport.initialize());
app.use(Passport.session());
Passport.use(new Localstrategy(User.authenticate())); 

Passport.serializeUser(User.serializeUser());
Passport.deserializeUser(User.deserializeUser());

// massage flash worning .......

app.use((req,res , next)=>{
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    res.locals.Userstatus = req.user ;
    next();
})

//listing midelwear
app.use('/listing' , listingRoutes);
//review midelwear
app.use('/listing/:id/review' , rivewsRoutes );

//user routes midelwear...
app.use('/' , UserRoutes);
//used for other that page it is not availabl on over sait....
app.all('*' ,(req ,res ,next)=>{
    next(new ExpressError(404 , 'page not faund'));
    
})

app.use((err ,req ,res , next)=>{
    let { message=`somthig wrong!` } = err ;
    res.render('./listings/error.ejs' , {message});
})

app.listen(port, () => {    
    console.log('srever  is started');
})