const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'your secret key',
    'https://rinkeby.infura.io/your secretkey'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to  deploy from account: ', accounts[0]);

    // let gasEstimate = web3.eth.estimateGas({data: '0x' + bytecode});

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: '0x' + bytecode })
        .send({ from: accounts[0], gas: '1000000' });

    console.log(interface);
    console.log('contract deploy to', result.options.address);
};
deploy();
