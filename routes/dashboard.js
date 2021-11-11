const router = require('express').Router();
const db = require('../db');

// middleware's
const authorization = require('../middleware/authorization');
const userInfo = require('../middleware/userInfo');

router.get('/api/dashboard', authorization, userInfo, async (req, res) => {
    try {
        const operations = await db.query(`
            SELECT *
            FROM operations
            WHERE user_id = $1
            ORDER BY id desc
            LIMIT 10;
        `, [req.user.id]);

        const balance = await db.query(`
            SELECT SUM(amount)
            FROM operations
            WHERE user_id = $1;
        `, [req.user.id]);

        res.json({
            user: req.user,
            operations: operations.rows,
            balance: balance.rows[0].sum
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
});

module.exports = router;