import express from 'express';
import axios from "axios";
import {UsersCreateSession} from "../../paths.js"
import { findUserByUsername } from '../../models/userModels.js';



const router = express.Router();

router.use(express.json());

router.post('/signin', async (req, res) => {
  console.log('Incoming Sign-In Request');
  console.log('Received body:');

  const { username, password } = req.body;
  console.log('Extracted username:', username);
  console.log('Extracted password:', password);

  try {
    const user = await findUserByUsername(username);

    if (!user) {
      console.log("USER NOT FOUND");
      return res.status(404).json({ message: 'User not found' });
    }
    console.log("USER EXISTS!");
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("DB user.password:", user.Password);
    if (password != user.Password) {
      console.log("PASSWORD DOES NOT MATCH");
      return res.status(401).json({ message: 'Invalid password' });
    }
    console.log("USER AUTHENTICATED SUCCESFULLY!");
    const result = await axios.post(UsersCreateSession, {Username: username}, { withCredentials: true });

    console.log("✅ Sign-In Successful. UserID:", result.data.userID);
    return res.status(200).json({ message: 'Authenticated successfully', user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
