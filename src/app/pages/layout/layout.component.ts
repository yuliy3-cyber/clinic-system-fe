import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MasterService } from '../../service/master.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  masterServ = inject(MasterService);
  router = inject(Router);
  isLoggedIn = false;
  ngOnInit() {
    this.isLoggedIn = this.masterServ.isLoggedIn();
  }
  logout() {
    this.masterServ.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
