import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-value-modal',
  templateUrl: './value-modal.component.html',
  styleUrls: ['./value-modal.component.scss'],
})
export class ValueModalComponent implements OnInit {
  values = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}
}
