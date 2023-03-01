import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from '../../services/data.service';
import { differenceInCalendarDays, setHours } from 'date-fns';
import * as moment from 'moment';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  constructor(
    private DataService: DataService
  ) { }
  @Input() value: any;
  public valueDetail: any;
  ngOnInit(): void {
    setInterval(() => {
      this.checkTime()
    }, 5000)
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
  }

  checkTime() {
    let current = moment(Date.now());
    let timer = moment(this.value.timer);

    let time = moment.duration(timer.diff(current)).asHours();
    if (time <= 0 && this.value.isSetTime) {
      this.value = {
        ...this.value,
        status: 1,
        timer: 0,
        isSetTime: false
      }
      this.DataService.setValue(this.value);
    }
  }

  setValueToggle(value: any) {

    this.value = {
      ...value,
      iSetTime: value.timer == 0 ? false : true,
      status: value.status == 0 ? 1 : 0
    }

    this.DataService.setValue(this.value);
  }

  setValueTimer() {
    this.isVisible = false;
    this.value = {
      ...this.valueDetail,
      timer: new Date(this.valueDetail.timer).getTime(),
      state: 0,
      isSetTime: true
    }
    this.DataService.setValue(this.value);
    alert("Bạn đã hẹn giờ thành công !")
  }

  public isVisible = false;

  public showModal(value: any) {
    this.valueDetail = value;
    this.isVisible = true;
  }


  timeDefaultValue = setHours(new Date(), 0);
  public handleCancel() {
    this.isVisible = false;
  }

  renderTime(value: any) {
    let date = moment(Date.now());
    let end = moment(value.timer);
    var duration = moment.duration(end.diff(date));
    return duration.asHours() > 0 ? duration.asHours().toFixed(1) + "h" : 0 + "h";
  }

}
