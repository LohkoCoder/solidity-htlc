import {htlcAbi, htlcAddress} from './htlcContractInfo'
import {node1} from './nodeList'
import { address1,address2,address3,privateKey1,privateKey2,privateKey3 } from "./accountList"

var Web3 = require('web3')
var web3 = new Web3(node1)
//const crypto = require('crypto');
//// 1、generate plainText
//var preimage = Web3.utils.stringToHex("111", 64)
//console.log("preimage is: ", preimage);
//var preimageBytes32 = Web3.utils.padRight(a, 64)
//console.log("bytes32 preimage is", preimageBytes32)
//const hash = crypto.createHash('sha256')
//                   .update(preimageBytes32)
//                   .digest(preimageBytes32)
//console.log(hash);

web3.eth.accounts.wallet.add({
    privateKey: privateKey1,
    address: address1
})

web3.eth.accounts.wallet.add({
    privateKey: privateKey2,
    address: address2
})

web3.eth.accounts.wallet.add({
    privateKey: privateKey3,
    address: address3
})


function addWallet(privateKey:string, address:string) {
	web3.eth.accounts.wallet.add({
		privateKey: privateKey,
		address: address
	})
}

var myContract = new web3.eth.Contract(htlcAbi, htlcAddress)
async function newContract(receiver:string, hashLock:string, timestamp:string, ethAmount:string, txSender:string) {
	try {
		let result = await myContract.methods.newContract(receiver,hashLock,timestamp).send({
			from: txSender,
			gas: 150000,
			gasPrice: '3000000000000',
			value: ethAmount
		})
		return result
	} catch (error) {
		return error
	}
}

async function withdraw(contractId:string, preimage:string, txSender:string) {
	try {
		return await myContract.methods.withdraw(contractId,preimage).send({
			from: txSender,
			gas: 150000,
			gasPrice: '300',
			value: 0
		})		
	} catch (error) {
		return error
	}
}

async function subscribeNewHTLCEvent(sender:string, receiver:string) {
	// var x =   web3.eth.abi.encodeEventSignature({
	// 	name: 'LogHTLCNew',
	// 	type: 'event',
	// 	inputs: [{
	// 		type: 'bytes32',
	// 		name: 'contractId'
	// 	},{
	// 		type: 'address',
	// 		name: 'sender'
	// 	},{
	// 		type: 'address',
	// 		name: 'receiver'
	// 	},{
	// 		type: 'uint',
	// 		name: 'amount'
	// 	},{
	// 		type: 'bytes32',
	// 		name: 'hashlock'
	// 	},{
	// 		type: 'uint',
	// 		name: 'timelock'
	// 	}]
	// });
	// console.log('xxx: '+x)
	// console.log(web3.eth.abi.encodeEventSignature("LogHTLCNew(bytes32,address,address,uint,bytes32,uint)"))
	// console.log(web3.utils.keccak256("contractId"))
	// console.log(web3.utils.keccak256("sender"))
	// console.log(web3.utils.keccak256("receiver"))

	try {
	// 	// return await web3.eth.subscribe('logs', {
	// 	// 	    address: htlcAddress,
	// 	// 		topics: ['0x329a8316ed9c3b2299597538371c2944c5026574e803b1ec31d6113e1cd67bde']
	// 	// 		// topics: ['0xf17b7acef69403e04f4805870de1bd35ed0d8ae19aee05daf76881128594bda2']
	// 	// })

		
	// var subscription = await web3.eth.subscribe('logs', {
	// address: htlcAddress,
	// topics: ['0x329a8316ed9c3b2299597538371c2944c5026574e803b1ec31d6113e1cd67bde']
	// }, function(error:any, result:any){
	// 	if (!error)
	// 			console.log(result);
	// 	})
	// 	.on("connected", function(subscriptionId:any){
	// 		console.log(subscriptionId);
	// 	})
	// 	.on("data", function(log:any){
	// 		console.log(log);
	// 	})
	// 	.on("changed", function(log:any){
	// 		console.log(log)
	// });
	// return subscription
		// return await myContract.events.LogHTLCNew({
		// 	filter: {sender: sender, receiver: receiver}, // Using an array means OR: e.g. 20 or 23
    	// 	fromBlock: 0

		// })

		return await myContract.getPastEvents('LogHTLCNew', {
			// filter: {}, // Using an array means OR: e.g. 20 or 23
			fromBlock: 0,
			toBlock: 'latest'
		})

	} catch (error) {
		return error
	}
}

async function getContract(contractId:string, sender:string) {
	try {
		return await myContract.methods.getContract(contractId).call({from: sender})
	} catch (error) {
		return error
	}
}


async function getTransaction(txHash:string) {
	try {
		return await web3.eth.getTransaction(txHash)		
	} catch (error) {
		return error
	}
}

async function getTransactionFromBlock(txHash:string, blockNum:number) {
	try {
		return await web3.eth.getTransactionFromBlock(txHash, blockNum)		
	} catch (error) {
		return error
	}
}
export {
	addWallet,
	newContract,
	withdraw,
	getTransaction,
	getTransactionFromBlock,
	subscribeNewHTLCEvent,
	getContract,
}