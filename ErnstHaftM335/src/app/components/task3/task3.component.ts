import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task3',
  templateUrl: './task3.component.html',
  styleUrls: ['./task3.component.scss'],
})
export class Task3Component  implements OnInit {
  @Input() moveToNextTask!: () => void;


  constructor() { }


  ngOnInit() {}

}
