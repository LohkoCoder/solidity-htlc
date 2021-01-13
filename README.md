# 搭建以太坊网络

* 配置创始块
```
{
  "config": {
    "chainId": 666,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip150Hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "petersburgBlock": 0,
    "istanbulBlock": 0,
    "ethash": {}
  },
  "nonce": "0x0",
  "timestamp": "0x5ddf8f3e",
  "extraData": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "gasLimit": "0x47b760",
  "difficulty": "0x00002",
  "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "coinbase": "0x0000000000000000000000000000000000000000",
  "alloc": { },
  "number": "0x0",
  "gasUsed": "0x0",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```

* 生成数据存储目录
```
// geth节点程序位于本项目/bin目录下
./bin/geth --datadir data0 init genesis.json 
```

* 启动节点
```
./bin/geth --rpc --rpcport "8545" --rpccorsdomain "*" --datadir "./data0" --port "30303"  --networkid 100000  --allow-insecure-unlock console
```
# Solidity 哈希时间锁定合约流程 

## 发送者锁定资产
调用 ```newHTLC(address payable _receiver, bytes32 _hashlock, uint _timelock)```，返回```contractId```
* 可借助 localCrypto 中的```getHash```生成哈希锁

## 查看锁定的资产转移详情
调用 ```getHTLC(bytes32 _contractId)```，```contractId```在上一步中会返回，```preimage```在```withdraw```前之前为全0符号，提取之后会显示出正确的值。

## 接收者提取资产
调用 ```withdraw(bytes32 _contractId, bytes32 _preimage)```。
* 提取后调用 ```getContract``` 可查看到```preimage```。

## 超时后，发送者取回资产
调用 ```refund(bytes32 _contractId)```

--------------------------------------------------------------------------

# 脚本相关操作

## 安装依赖包
```
npm install
```

## 生成typescript配置文件
```
npm run inittsc
```
## 运行测试脚本
```
npm run test
```

--------------------------------------------------------------------------

