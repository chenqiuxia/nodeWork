let http = require('http')
let fs = require('fs')
let path = require('path')
let server = http.createServer(function (req, res) {
    var   pathname = path.extname(req.url.pathname)
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
    getMime(pathname, function (mime) {
        res.writeHead(200, {'Content-type':mime})
        res.end()
    })
}
})
server.listen(3000, '127.0.0.1')
function getMime (name, callback) {
    fs.readFile('./mime.json', function (err, data) {
        if (err) {
            throw  Error('找不到mime 类型')
        } else {
            let mimeJson = JSON.parse(data)
            callback(mimeJson[name])
        }
    })
}