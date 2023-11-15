import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.sass'],
})
export class SelectComponent implements OnInit {
  @Input() title: string = '';
  @Input() data: any[] = [];
  @Output() selectedValue = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  getSelectedValue(event: any) {
    this.selectedValue.emit(event);
  }
}
