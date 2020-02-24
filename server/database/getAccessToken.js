module.exports = db => new Promise((res, rej) => {
    db.collection('AccessCodes').findOne({})
        .then(val => res(val))
        .catch(e => rej(e))
})