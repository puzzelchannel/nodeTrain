const http = require("http")
const server = http.createServer((req, res) => {
    console.log("new request")
    if (req.url === "/") {
        res.write("salam")
        res.end();
    } else if (req.url === "/api/other") {
        res.write("other request")
        res.end()
    }
});
server.listen(3000)
console.log("server is start on port 3000")