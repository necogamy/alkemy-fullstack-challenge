const router = require('express').Router();
const db = require('../db');
const authorization = require('../middleware/authorization');

router.get('/dashboard', authorization, async (req, res) => {
    try {
        const user = await db.query(`
            SELECT *
            FROM users
            WHERE id = $1;
        `, [req.user.id]);
        
        res.json(user.rows[0].name);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
});

module.exports = router;