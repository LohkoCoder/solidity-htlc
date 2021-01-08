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

function addDefaultWallet() {
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
}
addDefaultWallet()

function addWallet(privateKey:string, address:string) {
	web3.eth.accounts.wallet.add({
		privateKey: privateKey,
		address: address
	})
}

var myContract = new web3.eth.Contract(htlcAbi, htlcAddress)
async function newContract(receiver:string, hashLock:string, timestamp:string, ethAmount:string, txSender:string) {
	try {
		return await myContract.methods.newHTLC(receiver,hashLock,timestamp).send({
			from: txSender,
			gas: 150000,
			gasPrice: '30000',
			value: ethAmount
		})
	} catch (error) {
		return error
	}
}

async function withdraw(htlcId:string, preimage:string, txSender:string) {
	try {
		return await myContract.methods.withdraw(htlcId,preimage).send({
			from: txSender,
			gas: 150000,
			gasPrice: '30000',
			value: 0
		})
	} catch (error) {
		return error
	}
}

async function queryNewHTLCEvent(_fromBlock:number|string, _toBlock:number|string) {

	try {
		// return await web3.eth.subscribe('logs', {
		// 	    address: htlcAddress,
		// 		topics: ['0x329a8316ed9c3b2299597538371c2944c5026574e803b1ec31d6113e1cd67bde']
		// 		// topics: ['0xf17b7acef69403e04f4805870de1bd35ed0d8ae19aee05daf76881128594bda2']
		// })

		return await myContract.getPastEvents('LogHTLCNew', {
			fromBlock: _fromBlock,
			toBlock: _toBlock
		})

	} catch (error) {
		return error
	}
}

async function getContract(htlcId:string, sender:string) {
	try {
		return await myContract.methods.getContract(htlcId).call({from: sender})
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
	queryNewHTLCEvent,
	getContract,
}