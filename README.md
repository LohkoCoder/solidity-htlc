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

