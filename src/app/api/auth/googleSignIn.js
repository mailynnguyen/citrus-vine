import express from 'express';
import bodyParser from 'body-parser';
import axios from "axios";
import {UsersCreateSession} from "../../paths.js"
import { findUserByEmail, insertNewUserByEmail } from '../../models/userModels.js';


const router = express.Router();
router.use(bodyParser.json());

const isUcrEmail = (email) => /@ucr\.edu$/i.test(email);

router.post('/googleSignIn', async (req, res) => {
    console.log('Incoming Google Sign-in Request:');
    console.log('Received body:');

    const { email, picture } = req.body;
    console.log('Extracted email:', email);

    try {
        if (!isUcrEmail(email)) {
            console.log("Invalid email domain. Only @ucr.edu emails are allowed.");
            return res.status(400).json({ message: 'Email must be a valid @ucr.edu address.' });
        }

        const userExists = await findUserByEmail(email);
        // find username  by the email, and then begin session
        if (userExists) {
            const username = userExists.Username
            const result = await axios.post(UsersCreateSession, {Username: username}, { withCredentials: true });
            console.log("✅ Sign-In Successful. UserID:", result.data.userID);
            console.log("An account with this email already exists.");

            return res.status(200).json({ message: 'Google Sign-in Successful!'});
            // return res.status(409).json({ message: 'Email already exists'});
        }

        const newUser = await insertNewUserByEmail(req.body);
        console.log("Google Sign-in Successful!");
        return res.status(200).json({ message: 'Sign-up successful!', user: newUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;