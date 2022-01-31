import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeDash'
})
export class RemoveDashPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(typeof value === "string"){
      value = value.replace(/-/gi, " ");
      return value;
    }
    return null;
  }

}
