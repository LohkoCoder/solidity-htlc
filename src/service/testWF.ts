import {
    addWallet,
    newContract,
    withdraw,
    getTransaction,
    getTransactionFromBlock,
    queryNewHTLCEvent,
    getContract,
} from '../utils/utils'

import {
    privateKey1,
    address1,
    privateKey2,
    address2
} from '../utils/accountList'


let hashLock = '0x904f7117d030132da8188f096267ba3278be54e982bf5510c8a493a64003d3bb'
let expireTimestamp = '1679227329718'
let preimage = "0x3131310000000000000000000000000000000000000000000000000000000000"

function addTestWallet() {
    addWallet(privateKey1,address1)
    addWallet(privateKey2,address2)
}

var htlcId:any
async function lockEth() {
    let res = await newContract(address2, hashLock, expireTimestamp, '30000', address1)
    console.log("------lock asset result------")
    console.log(res)
    let blockNum = res.blockNumber
    console.log(blockNum)
    await newHTLCEvent(blockNum, blockNum)
}

async function getTx() {
    // let res = await getTransactionFromBlock('0x66482e123d2f853b8f48f8cb893382d597e8f93e1e38e4270d7aa8f838f1d469', 3321)
    // console.log(res)
    let res2 = await getTransaction('0x4d2da9ad0e86648ff4d34eb7058ef77b3e4cf6eaa0e9765eb827a2f3ad9325c6')
    console.log(res2)
}

async function newHTLCEvent(fromBlock:string|number, toBlock:string|number) {
    let res = await queryNewHTLCEvent(fromBlock, toBlock)
    htlcId = res[0].returnValues.htlcId
    console.log("htlcId is:"+htlcId)
}


async function getTestContract() {
    let res = await getContract(htlcId, address1)
    console.log(res)
}


async function withdrawEth() {
    addWallet(privateKey2,address2)
    let res = await withdraw(htlcId, preimage, address2)
    console.log("------withdraw result------")
    console.log(res)
}


async function workFlow() {
    await lockEth()
    await withdrawEth()
    await getTestContract()
}

workFlow()
// getTx()