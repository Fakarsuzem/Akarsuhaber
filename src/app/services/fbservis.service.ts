import { Uye } from './../models/uye';
import { Kayit } from './../models/kayit';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FbservisService {
  private dbKayit = '/Kayitlar';
  private dbUye = '/Uyeler';
  kayitRef: AngularFireList<Kayit> = null;
  uyeRef: AngularFireList<Uye> = null;
  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public dbCollect: AngularFirestore,
  ) {
    this.kayitRef = db.list(this.dbKayit);
    this.uyeRef = db.list(this.dbUye);
  }

  OturumAc(mail: string, parola: string) {
    return this.afAuth.signInWithEmailAndPassword(mail, parola);
  }
  OturumKapat() {
    return this.afAuth.signOut();
  }
  OturumKontrol() {
    if (localStorage.getItem('user')) {
      return true;
    } else {
      return false;
    }
  }
  UyeOl(uye: Uye) {
    return this.afAuth.createUserWithEmailAndPassword(uye.mail, uye.parola);
  }
  UyeByKey(key: string) {
    return this.db.object('/Uyeler/' + key);
  }

  UyeEkle(uye: Uye) {
    return this.uyeRef.push(uye);
  }
  HaberListele() {
    return this.kayitRef;
  }
  HaberListeleByUID(uid: string) {
    return this.db.list('/Kayitlar', q => q.orderByChild('uid').equalTo(uid));
  }
  HaberByKey(key: string) {
    return this.db.object('/Kayitlar/' + key);
  }
  HaberEkle(kayit: Kayit) {
    return this.kayitRef.push(kayit);
  }
  HaberDuzenle(kayit: Kayit) {
    return this.kayitRef.update(kayit.key, kayit);
  }
  HaberSil(key: string) {
    return this.kayitRef.remove(key);
  }
}
