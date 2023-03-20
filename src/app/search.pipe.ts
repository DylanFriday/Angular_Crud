import { JsonPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value) return null;
    if(!args) return value;
    args = args.toLowerCase();

    return value.filter((product : any)=>{
      return JSON.stringify(product).toLowerCase().includes(args)
    })
  }

}
