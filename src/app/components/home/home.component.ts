import { Kayit } from './../../models/kayit';
import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  adsoyad: string;
  uid: string;
  kayitlar: Kayit[];
  constructor(
    public fbServis: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.uid = user.uid;
    this.adsoyad = user.displayName;
    this.HaberListele();
  }
  OturumKapat() {
    this.fbServis.OturumKapat().then(d => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });

  }
  HaberListele() {
    this.fbServis.HaberListele().snapshotChanges().subscribe(data => {
      this.kayitlar = [];
      data.forEach(satir => {
        const y = { ...satir.payload.toJSON(), key: satir.key };
        this.kayitlar.push(y as Kayit);
      });
    });
  }
}
