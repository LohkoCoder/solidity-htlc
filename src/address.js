var Web3 = require('web3');
const crypto = require('crypto');

// 1、generate plainText
var preimage = Web3.utils.stringToHex("111", 64)
console.log("preimage is: ", preimage);
var preimageBytes32 = Web3.utils.padRight(a, 64)
console.log("bytes32 preimage is", preimageBytes32)

const hash = crypto.createHash('sha256')
                   .update(preimageBytes32)
                   .digest(preimageBytes32)
console.log(hash);

