import { Component } from '@angular/core';
import { FactoryService } from './services/factory.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private factoryService: FactoryService) {
     
  
    // const manager =  factoryService.lottery.methods.manager().call().then((res)=>{
    //    console.log(res);
    // });
   
  }
}
