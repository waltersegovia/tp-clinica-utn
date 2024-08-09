import { Component,Output,Input,EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent {
  @Input() isDisabled :boolean;
  @Output() captchaChange = new EventEmitter<boolean>();
  isChecked = false;
  
  onCaptchaChange() {
    this.captchaChange.emit(this.isChecked);
  }
}
