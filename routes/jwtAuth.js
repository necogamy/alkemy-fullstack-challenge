const router = require('express').Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validateInfo = require('../middleware/validateInfo');
const authorization = require('../middleware/authorization');

router.post('/api/register', validateInfo, async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await db.query(`
            SELECT *
            FROM users
            WHERE email = $1;
        `, [email]);

        if (user.rows.length !== 0) return res.status(401).json('User already exists');


        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const encryptPassword = await bcrypt.hash(password, salt);


        const newUser = await db.query(`
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3) RETURNING *;
        `, [name, email, encryptPassword]);

        const token = jwtGenerator(newUser.rows[0].id);
        res.json({ token });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});

router.post('/api/login', validateInfo, async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await db.query(`
            SELECT *
            FROM users
            WHERE email = $1;
        `, [email]);

        if (user.rows.length === 0) return res.status(401).json('Password or email is incorrect');

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) return res.status(401).json('Password or email is incorrect');

        const token = jwtGenerator(user.rows[0].id);
        res.json({ token });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});

router.get('/api/is-authenticated', authorization, async (req, res) => {
    try {
        res.json('true');
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;