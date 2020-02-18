module.exports = db => new Promise((res, rej) => {
    db.collection('WSS').findOne({})
        .then(val => res(val))
        .catch(e => rej(e))
})