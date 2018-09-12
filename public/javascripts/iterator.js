let http = require('http')
let fs = require('fs')
let server = http.createServer(function (req, res) {
if (req.url === '/favicon.ico') {
    return;
} else {
    fs.readdir('./album', function (err, files) {
        let dictionary = []
            //iterator 是一个迭代器，强行把异步变成同步的
        (function iterator (i) {
            if (i === files.length) {
                return
            }
            fs.stat('./album' + files[i], function (err, state) {
                if (state.isDirectory()) {
                    dictionary.push(files[i])
                }
                iterator(i + 1)
            })
            console.log(dictionary)
        })(0)
    })
res.end()
}
})
server.listen(3000, '127.0.0.1')