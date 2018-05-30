// const path = require('path');
// const fs = require('fs');
// const solc = require('solc');

// const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
// const source = fs.readFileSync(lotteryPath, 'utf8')
// // console.log(solc.compile(source, 1).contracts[':Inbox']);
// module.exports =solc.compile(source, 1).contracts[':Lottery'];


const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts;
console.log(solc.compile(source, 1));

fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  );
}