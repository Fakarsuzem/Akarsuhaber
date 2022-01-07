import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Kayit } from 'src/app/models/kayit';
import { FbservisService } from 'src/app/services/fbservis.service';

@Component({
  selector: 'app-kayitlar',
  templateUrl: './kayitlar.component.html',
  styleUrls: ['./kayitlar.component.css']
})
export class KayitlarComponent implements OnInit {
  adsoyad: string;
  uid: string;
  haberler: Kayit[];
  constructor(
    public fbServis: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.uid = user.uid;
    this.adsoyad = user.displayName;
    this.HaberListele();
  }
  OturumKapat() {
    this.fbServis.OturumKapat().then(d => {
      localStorage.removeItem("user");
      this.router.navigate(['/login']);
    });

  }
  HaberListele() {
    this.fbServis.HaberListele().snapshotChanges().subscribe(data => {
      this.haberler = [];
      data.forEach(satir => {
        const y = { ...satir.payload.toJSON(), key: satir.key };
        this.haberler.push(y as Kayit);
      });
    });
  }
}
