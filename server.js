function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

console.log("### BEFORE EXPRESS");
const express = require('express');
console.log("### APP");
const app = express();
console.log("### FIRST USE");
app.use(requireHTTPS);
console.log("### SECOND USE");
app.use(express.static("./dist/cards-io/"));
console.log("### GET");
app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: './dist/cards-io/'}
  );
});
console.log("### LISTEN");
app.listen(process.env.PORT || 8080);