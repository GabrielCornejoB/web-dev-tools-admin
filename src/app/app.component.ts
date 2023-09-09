import { Component } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'web-dev-tools-admin';

  constructor(private firestore: Firestore) {
    this.getData();
  }

  getData() {
    const collectionInstance = collection(this.firestore, 'tools');
    collectionData(collectionInstance).subscribe((data) => console.log(data));
  }
}
