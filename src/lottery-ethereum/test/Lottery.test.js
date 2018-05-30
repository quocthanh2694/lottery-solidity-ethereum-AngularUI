const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');


let lottery;
let accounts;


beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: '1000000' })
});


describe('Lottery Contract', () => {
    it('deploys a contract', () => {
        assert.ok(lottery.options.address);
    });

    it('allows one account to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    });

    it('allows multiple account to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02', 'ether')
        });
        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.02', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);
    });


    it('require minimun amount of ether', async () => {
        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: 0
            });

            assert(false);
        } catch (err) {
            assert.ok(err);
        }

    });

    it('only manager can call pick winner', async () => {
        try {
            await lottery.methods.enter().send({
                from: accounts[1]

            })
            assert(false);
        } catch (err) {
            assert(err)
        }

    });

    it('send money to the winner and reset players in array', async ()=>{
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2', 'ether')
        });

        const initialBalance = await web3.eth.getBalance(accounts[0]);
        await lottery.methods.pickWinner().send({ from: accounts[0] });
        const finalBanlance = await web3.eth.getBalance(accounts[0]);
        const difference = finalBanlance - initialBalance;
        // console.log(difference);
        assert(difference > web3.utils.toWei('1.8', 'ether'));
    });
});

// let accounts;
// let inbox;
// // const INITIAL_STRING = 'Hi there!';

// beforeEach(async () => {
//     // get list of all accounts
//     accounts = await web3.eth.getAccounts();

//     // use one of those accounts to deploy
//     // the contract
//     inbox = await new web3.eth.Contract(JSON.parse(interface))
//         .deploy({ data: bytecode,   arguments: ['Hi there!'] })
//         .send({   from: accounts[0],   gas: '1000000' })
// });

// describe('Inbox', () => {   
//     it('deploys a contract', () => {
//         // console.log(inbox);
//         assert.ok(inbox.options.address);
//     })

//     it('has a default message', async ()=>{
//         const message = await inbox.methods.message().call();
//         assert.equal(message, 'Hi there!');
//     })

//     it('can change the message',async ()=> {
//         await inbox.methods.setMessage('bye').send({ from: accounts[0]} );
//         const message = await inbox.methods.message().call();
//         assert.equal(message, 'bye');

//     })
// })











// // class Car {
// //     park() {
// //         return 'stopped';
// //     }

// //     drive() {
// //         return 'vroom';
// //     }
// // }

// // let car;
// // beforeEach(() => {
// //     car = new Car();
// // });

// // describe('Car', () => {
// //     it('can park', () => {
// //         assert.equal(car.park(), 'stopped');
// //     });

// //     it('can drive', () => {
// //         assert.equal(car.drive(), 'vroom');
// //     })
// // });

