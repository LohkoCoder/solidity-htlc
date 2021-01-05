import {
    addWallet,
    newContract,
    withdraw,
    getTransaction,
    getTransactionFromBlock,
    subscribeNewHTLCEvent,
    getContract,
} from '../utils/utils'

import {
    privateKey1,
    address1,
    privateKey2,
    address2
} from '../utils/accountList'


let hashLock = '0x904f7117d030132da8188f096267ba3278be54e982bf5510c8a493a64003d3bb'
let expireTimestamp = '1609227329718'
let preimage = "0x3131310000000000000000000000000000000000000000000000000000000000"

function addTestWallet() {
    addWallet(privateKey1,address1)
    addWallet(privateKey2,address2)
}

async function lockEth() {
    let res = await newContract(address2, hashLock, expireTimestamp, '30000', address1)
    console.log(res)
}

async function getTx() {
    let res = await getTransactionFromBlock('0x66482e123d2f853b8f48f8cb893382d597e8f93e1e38e4270d7aa8f838f1d469', 3321)
    console.log(res)
    res = await getTransaction('0x66482e123d2f853b8f48f8cb893382d597e8f93e1e38e4270d7aa8f838f1d469')
    console.log(res)
}

async function newHTLCEvent() {
    let res = await subscribeNewHTLCEvent(address1, address2)
    // console.log(res)
    console.log("----------------------------------")
    console.log(res)
    console.log("----------------------------------res[0]")
    console.log(res.arguments)
}

let contractId = "0x4a77fabad0e64ebb431c352a71350f32f87b43cfbbd17188aff9de068bab38b3"
async function getTestContract() {
    let res = await getContract(contractId, address1)
    console.log(res)
}


async function withdrawEth() {
    addWallet(privateKey2,address2)
    let res = await withdraw(contractId, preimage, address2)
    console.log(res)
}



// addTestWallet()
// lockEth()
// getTx()
// newHTLCEvent()
getTestContract()
// withdrawEth()
