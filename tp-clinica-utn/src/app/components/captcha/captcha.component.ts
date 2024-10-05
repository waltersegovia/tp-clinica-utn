import { Component,Output,Input,EventEmitter, OnInit  } from '@angular/core';
import IImgCaptcha from 'src/app/interfaces/img-captcha';
//import IImgCaptcha from 'src/app/interfaces/img-captcha';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})

export class CaptchaComponent implements OnInit{

  @Input() isDisabled :boolean;
  @Output() captchaChange = new EventEmitter<boolean>();
  isChecked = false;
  captchaInputValue: string = '';
  captchaValidado: boolean = false;

ngOnInit(): void {
  this.actualizarImg();
}

  imgCaptchaSeleccionado: IImgCaptcha ;
  arrayDeObjetos : IImgCaptcha[] = [
    { id: 1, rutaImagen: '../../../assets/img-captcha/captcha01.png', valor: 'PRNU' },
    { id: 2, rutaImagen: '../../../assets/img-captcha/captcha02.png', valor: 'una' },
    { id: 3, rutaImagen: '../../../assets/img-captcha/captcha03.png', valor: 'W68HP' },
    { id: 4, rutaImagen: '../../../assets/img-captcha/captcha04.png', valor: 'cunaH' },
    { id: 5, rutaImagen: '../../../assets/img-captcha/captcha05.png', valor: '706DE' },
    { id: 6, rutaImagen: '../../../assets/img-captcha/captcha06.png', valor: 'php' },
    { id: 7, rutaImagen: '../../../assets/img-captcha/captcha07.png', valor: 'smwm' },
    { id: 8, rutaImagen: '../../../assets/img-captcha/captcha08.png', valor: 'U4FTP' },
    { id: 9, rutaImagen: '../../../assets/img-captcha/captcha09.png', valor: 'ZVYK' },
  ];

  onCaptchaChange() {
    this.captchaChange.emit(this.isChecked);
  }

  actualizarImg(){
    if (this.imgCaptchaSeleccionado != null) {
      const filtrado = this.arrayDeObjetos.filter(obj => obj.id !== this.imgCaptchaSeleccionado.id);
    const nuevoCaptcha = filtrado[Math.floor(Math.random() * filtrado.length)];
    this.imgCaptchaSeleccionado = nuevoCaptcha;
    }
    else{
      const nuevoCaptcha = this.arrayDeObjetos[Math.floor(Math.random() * this.arrayDeObjetos.length)];
      this.imgCaptchaSeleccionado = nuevoCaptcha;
    }
    
  }

  onCacheInput(event:Event){
    const inputElement = event.target as HTMLInputElement;
    this.captchaInputValue = inputElement.value;
    if(this.captchaInputValue == this.imgCaptchaSeleccionado.valor){
      this.captchaValidado=true;
      this.captchaChange.emit(this.captchaValidado);
      console.log("Son iguales");
    }
  }

}


// import { Component,Output,Input,EventEmitter  } from '@angular/core';

// @Component({
//   selector: 'app-captcha',
//   templateUrl: './captcha.component.html',
//   styleUrls: ['./captcha.component.scss']
// })
// export class CaptchaComponent {
//   @Input() isDisabled :boolean;
//   @Output() captchaChange = new EventEmitter<boolean>();
//   isChecked = false;
  
//   onCaptchaChange() {
//     this.captchaChange.emit(this.isChecked);
//   }
// }
