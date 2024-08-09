import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

export type Item = {
  title: string;
  link: string;
  active: boolean;
  children?: Item[];
};
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  @Input() items: Item[] = [];
  email: string = '';
  constructor(private afAuth: AuthService, private router: Router) {
    this.afAuth.getAuthState().subscribe((usuario) => {
      if (usuario && usuario.email) {
        this.email = usuario.email;
      }
    });
   
  }
  ngOnInit(): void {}

  logout() {
    this.afAuth.logout().then(() => {
      this.router.navigate(['/auth']);
    });
  }
}
