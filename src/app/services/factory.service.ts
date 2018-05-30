import { Injectable } from '@angular/core';
import { Web3Service } from './web3-service';
declare var require: any;
const lottery = require('../../lottery-ethereum/build/Lottery.json');

@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  lottery;
  constructor(private web3Service: Web3Service) {

    console.log('lottery', JSON.parse(lottery.interface));
    this.lottery = new web3Service.web3.eth.Contract(
      JSON.parse(lottery.interface),
      '0xAEbbe9A91024FA4155EaD1de8Db9C0CBD68325ff'
    );
    console.log('waitting....');
    this.lottery.methods.manager().call().then((res) => {
      console.log(res); 
      console.log('get manager done');
    });
   


    console.log(this.lottery);


  }
}
