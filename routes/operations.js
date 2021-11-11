const router = require('express').Router();
const db = require('../db');

// middleware's
const authorization = require('../middleware/authorization');
const userInfo = require('../middleware/userInfo');

router.get('/api/operations', authorization, userInfo, async (req, res) => {
    try {
        const operations = await db.query(`
            SELECT *
            FROM operations
            WHERE user_id = $1
            ORDER BY date desc;
        `, [req.user.id]);

        res.json({
            user: req.user,
            operations: operations.rows
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
});

router.post('/api/operations', authorization, userInfo, async (req, res) => {
    try {
        const { type, date } = req.body;
        let { amount } = req.body;

        let concept = null;
        if (req.body.concept) concept = req.body.concept;

        if (type === 'EGRESO' && req.body.category) {
            const { category } = req.body;

            amount = -amount;

            await db.query(`
                INSERT INTO operations (user_id, amount, type, category, date, concept)
                VALUES ($1, $2, $3, $4, $5, $6);
            `, [req.user.id, amount, type, category, date, concept]);
        }
        else if (type === 'INGRESO') {
            await db.query(`
                INSERT INTO operations (user_id, amount, type, date, concept)
                VALUES ($1, $2, $3, $4, $5);
            `, [req.user.id, amount, type, date, concept]);
        }

        res.json('Operation added successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
});

router.delete('/api/operations/:id', authorization, userInfo, async (req, res) => {
    try {
        const { id } = req.params;

        await db.query(`
            DELETE FROM operations
            WHERE id = $1 AND user_id = $2;
        `, [id, req.user.id]);

        res.json('Operation deleted successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
});

router.put('/api/operations/:id', authorization, userInfo, async (req, res) => {
    try {
        const { id } = req.params;
        let { amount, date, concept } = req.body;

        const operation = await db.query(`
            SELECT *
            FROM operations
            WHERE id = $1 AND user_id = $2;
        `, [id, req.user.id]);

        if (operation.rows[0].type === 'EGRESO') amount = -amount;

        await db.query(`
            UPDATE operations
            SET amount = $3
            WHERE id = $1 AND user_id = $2;
        `, [id, req.user.id, amount]);

        if (req.params && req.params.category) {
            const { category } = req.body;

            await db.query(`
                UPDATE operations
                SET category = $3
                WHERE id = $1 AND user_id = $2;
            `, [id, req.user.id, category]);
        }

        await db.query(`
            UPDATE operations
            SET date = $3
            WHERE id = $1 AND user_id = $2;
        `, [id, req.user.id, date]);

        await db.query(`
            UPDATE operations
            SET concept = $3
            WHERE id = $1 AND user_id = $2;
        `, [id, req.user.id, concept]);

        res.json('Operation updated successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
});

module.exports = router;