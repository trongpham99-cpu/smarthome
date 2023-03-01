import { Injectable } from '@angular/core';
import { Database, set, ref, update } from '@angular/fire/database'
import { onValue } from '@firebase/database';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public database: Database) {
    this.getAllValue();
  }

  public values$ = new BehaviorSubject([]);

  public setValue(value: any) {
    if (!value.id) return;
    update(ref(this.database, value.id), {
      id: value.id,
      name: value.name,
      status: value.status,
      timer: value.timer,
      isSetTime: value.isSetTime
    });
  }

  public getAllValue() {
    const _ref = ref(this.database, '/');
    onValue(_ref, (sn) => {
      const data = sn.val();
      let result: any = [];
      for (const value in data) {
        result.push(data[value]);
      }
      this.values$.next(result);
    })
  }
}
