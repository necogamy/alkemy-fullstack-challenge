const router = require('express').Router();
const db = require('../db');
const authorization = require('../middleware/authorization');

router.get('/api/dashboard', authorization, async (req, res) => {
    try {
        const user = await db.query(`
            SELECT *
            FROM users
            WHERE id = $1;
        `, [req.user.id]);
        
        const operations = await db.query(`
            SELECT *
            FROM operations
            WHERE user_id = $1;
        `, [user.rows[0].id]);

        res.json({
            user: user.rows,
            operations: operations.rows
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
});

module.exports = router;