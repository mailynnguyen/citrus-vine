import express from 'express';
import { findUserByUsername, findUserByEmail, insertNewUser } from '../../models/userModels.js';

const router = express.Router();

router.use(express.json());

const isUcrEmail = (email) => /@ucr\.edu$/i.test(email);

router.post('/signup', async (req, res) => {
    console.log('Incoming Sign-Up Request');
    console.log('Received body:');

    const { firstName, lastName, username, password, email } = req.body;
    // console.log('Extracted firstName:', firstName);
    // console.log('Extracted lastName:', lastName);
    console.log('Extracted username:', username);
    console.log('Extracted password:', password);
    console.log('Extracted email:', email);

    try {
        if (!isUcrEmail(email)) {
            console.log("Invalid email domain. Only @ucr.edu emails are allowed.");
            return res.status(400).json({ message: 'Email must be a valid @ucr.edu address.' });
        }

        const userExists = await findUserByUsername(username);
        const emailExists = await findUserByEmail(email);

        if (userExists) {
            console.log("Username already exists.");
            return res.status(409).json({ message: 'Username already exists.'});
        }
        if (emailExists) {
            console.log("An account with this email already exists.");
            return res.status(409).json({ message: 'Email already exists'});
        }
        const newUser = await insertNewUser(req.body);
        console.log("Sign-Up Successful!");
        return res.status(200).json({ message: 'Sign-up successful!', user: newUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;