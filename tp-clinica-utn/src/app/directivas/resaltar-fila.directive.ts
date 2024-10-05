import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appResaltarFila]'
})
export class ResaltarFilaDirective implements OnInit {
  @Input() appResaltarFila: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', this.appResaltarFila);
  }
}
