import express from 'express';
import cors from 'cors';

// Routes
import signInRoute from './api/auth/signin.js';
import signUpRoute from './api/auth/signup.js;'

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use('/api/auth', signInRoute);
app.use('/api/auth', signUpRoute);

app.listen(3307, () => {
  console.log('Server is running on port 3307');
});