import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { toolsActions } from './tools/store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private store = inject(Store);

  constructor() {}

  ngOnInit(): void {
    this.store.dispatch(toolsActions.getTools());
  }
}
