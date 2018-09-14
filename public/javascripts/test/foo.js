let msg = '你好'
exports.msg = msg
let People = (name, sex) => {
    this.name = name
    this.sex = sex
}
People.prototype.seyHello = () => {
    return this.name + this.sex
}
module.exports = People