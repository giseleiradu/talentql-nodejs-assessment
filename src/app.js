import http from 'http';
import path from 'path';
import createError from 'http-errors';
import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import routes from './routes';

const app = express();
const server = http.createServer(app);

dotenv.config();

app.use(
  session({
    secret: process.env.SECRET_KEY || 'talentql-nodejs-assessment',
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err.status
  });
  next();
});

app.server = server;
export default app;