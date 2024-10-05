// import { Directive } from '@angular/core';

// @Directive({
//   selector: '[appOnlyNumber]'
// })
// export class OnlyNumberDirective {

//   constructor() { }

// }

import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[onlyNumber]'
})
export class OnlyNumberDirective {

  constructor(private readonly elRef: ElementRef) { }
  @HostListener('input', ['$event'])
    onChangeInput(event: Event): void{
      const onlyNumber = /[^0-9]*/g
      const initValue = this.elRef.nativeElement.value;
      this.elRef.nativeElement.value = initValue.replace(onlyNumber,'')
      if (initValue !== this.elRef.nativeElement.value){
        event.stopPropagation();
      }
    }
  

}