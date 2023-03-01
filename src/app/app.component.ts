import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'home';

  constructor(
    private DataService: DataService
  ) { }

  public values = [];

  ngOnInit(): void {
    this.DataService.values$.subscribe(values => {
      this.values = values;
    })
  }
}
