const db = require('../db');

module.exports = async (req, res, next) => {
    try {
        let user = await db.query(`
            SELECT (id, name, email)
            FROM users
            WHERE id = $1;
        `, [req.user.id]);

        user = user.rows[0].row;
        
        res = user.split('');

        res.pop();
        res.shift();

        res = res.join('');

        res = res.split(',');

        res = {
            id: res[0],
            name: res[1],
            email: res[2]
        }

        req.user = res;
        next();
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}