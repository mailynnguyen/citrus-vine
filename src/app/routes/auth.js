require('dotenv').config();

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
const port = process.env.PORT || 3000;


app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/google/callback',
        },
        (accessToken, refreshToken, profile, done) => {
            const email = profile.emails[0].value;
            // Restrict login to @ucr.edu emails
            if (!email.endsWith('@ucr.edu')) {
                return done(null, false, { message: 'Only UCR emails are allowed.' });
            }
            return done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get('/', (req, res) => {
    const errorMsg = req.session.errorMessage;
    req.session.errorMessage = null;
    res.send(`
        ${errorMsg ? `<p style="color: red;">${errorMsg}</p>` : ''}
        <a href='/auth/google'>Sign in with Google</a>`);
});

app.get('/auth/google', passport.authenticate('google', { scope: ["profile", "email"] })
);

app.get('/auth/google/callback', (req, res, next) => {
    passport.authenticate('google', (err, user, info) => {
        if (!user) {
            req.session.errorMessage = info?.message; // Store the error message in session
            return res.redirect('/'); // Redirect to home page
        }
        req.logIn(user, (err) => {
            if (err) return next(err);
            res.redirect('/profile');
        });
    })(req, res, next);
});

app.get('/profile', (req, res) => { 
    res.send(`
        <h1>Welcome, ${req.user.displayName}!</h1>
        <button onclick="window.location.href='/logout'">Sign out</button>`);
});

app.get('/logout', (req, res) => {
    req.logOut(() => {
        res.redirect('/');
    });
});