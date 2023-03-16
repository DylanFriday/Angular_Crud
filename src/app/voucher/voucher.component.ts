import { Component } from '@angular/core';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent {
  Total : number;
  total($event : any){
    this.Total = $event
   }
}
