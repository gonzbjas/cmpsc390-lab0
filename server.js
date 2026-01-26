const crypto = require('crypto');
app.post('/login', (req, res) => {
const username = req.body.username;
const hashedPassword = crypto
.createHash('sha256')
.update(req.body.password)
.digest('hex');
const sql = `
SELECT * FROM users
WHERE username = ? AND password = ?
`;
db.query(sql, [username, hashedPassword], (err, results) => {
if (err) {
console.error(err);
return res.status(500).send('Server error');
}
if (results.length > 0) {
res.send(`Welcome back, ${results[0].first_name}!`);
} else {
res.send('Invalid username or password.');
}
});
});
