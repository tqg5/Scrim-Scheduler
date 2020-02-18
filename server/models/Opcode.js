module.exports = (function Opcode() {
  const opcode1 = function(seq = null) {
    return JSON.stringify({
      op: 1,
      d: seq
    })
  }

  return {
    opcode1
  }
})()