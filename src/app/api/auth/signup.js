import express from 'express';

const router = express.Router();

router.use(express.json());

router.use('signup', async (req, res) => {

});

export default router;