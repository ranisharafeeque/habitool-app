
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

const PORT = 5000;

const signupRouter = require('./routes/signupRouter.js');
const loginRouter = require('./routes/loginRouter.js');
const habitRouter = require('./routes/habitRouter.js');
const taskRouter = require('./routes/taskRouter.js');

// localhost:5000/login
// localhost:5000/signup

/**
 * define route handlers
 */
app.use(express.json());
app.use(cookieParser());
// localhost:5000/addHabit
// app.get('/dashboard', (req, res) => {
//   const cookieValue = req.cookies.SSID;
//   // console.log(cookieValue);
//   // check if cookie matches cookie in db
//   const user = await db.User.findOne({ cookie });
//   console.log("user found from db", user);
//   if (user.cookie !== cookieValue) return res.redirect("/");
// })
app.use('/task', taskRouter);
app.use('/habit', habitRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
// app.use("/api", apiRouter);

/**
 * handle requests for static files
 */
// app.use(express.static(path.resolve(__dirname, "../client")));

// app.get("/", function (req, res) {
//   res.sendFile(path.join(__dirname, "../client/")); // fill the path later
// });

app.use('*', (req, res) => res.status(404).send('NotFound'));

app.use((e, req, res, next) => {
  const defaultErr = {
    status: 500,
    err: 'An error occurred',
  };
  const errorObj = Object.assign({}, defaultErr, e);
  console.log(errorObj.err);
  return res.status(errorObj.status).json(errorObj.err);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
