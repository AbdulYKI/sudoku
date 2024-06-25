import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValueModalComponent } from '../value-modal/value-modal.component';
type Nullable<T> = T | null;
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  indicies = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  values: Array<Array<Nullable<number>>> = new Array(9);
  locked: Array<Array<boolean>> = new Array(9);
  wrong: Array<Array<boolean>> = new Array(9);
  firstSheetValues = [
    [5, 3, null, null, 7, null, null, null, null],
    [6, null, null, 1, 9, 5, null, null, null],
    [null, 9, 8, null, null, null, null, 6, null],
    [8, null, null, null, 6, null, null, null, 3],
    [4, null, null, 8, null, 3, null, null, 1],
    [7, null, null, null, 2, null, null, null, 6],
    [null, 6, null, null, null, null, 2, 8, null],
    [null, null, null, 4, 1, 9, null, null, 5],
    [null, null, null, null, 8, null, null, 7, 9],
  ];
  secondSheetValues = [
    [null, 9, null, null, null, null, null, null, 6],
    [null, null, null, 9, 6, null, 4, 8, 5],
    [null, null, null, 5, 8, 1, null, null, null],
    [null, null, 4, null, null, null, null, null, null],
    [5, 1, 7, 2, null, null, 9, null, null],
    [6, null, 2, null, null, null, 3, 7, null],
    [1, null, null, 8, null, 4, null, 2, null],
    [7, null, 6, null, null, null, 8, 1, null],
    [3, null, null, null, 9, null, null, null, null],
  ];
  currentSheetValues: Array<Array<Nullable<number>>> = [];
  constructor(private modalService: NgbModal) {
    this.indicies.forEach((value, index) => {
      this.values[index] = new Array(9);
      this.locked[index] = new Array(9);
      this.wrong[index] = new Array(9);
    });

  
    //copy array
    this.setSheet(1);
  }
  openModal(rowIdx: number, colIdx: number) {
    this.modalService
      .open(ValueModalComponent, { centered: true })
      .closed.subscribe((result) => {
        if (Number.parseInt(result)) {
          this.values[rowIdx][colIdx] = Number.parseInt(result);
          this.resetWrongFlags();
        }
      });
  }

  setSheet(sheetNumber: number) {
    if (sheetNumber == 1) {
      this.currentSheetValues = JSON.parse(
        JSON.stringify(this.firstSheetValues)
      );
    } else {
      this.currentSheetValues = JSON.parse(
        JSON.stringify(this.secondSheetValues)
      );
    }
    this.resetWrongFlags();
    this.values = JSON.parse(JSON.stringify(this.currentSheetValues));
    this.locked = JSON.parse(JSON.stringify(this.currentSheetValues));
  }
  checkCorrectness(rowIdx: number, colIdx: number) {
    var result =
      this.checkColumn(rowIdx, colIdx) &&
      this.checkRow(rowIdx, colIdx) &&
      this.checkSquare(rowIdx, colIdx);

    this.wrong[rowIdx][colIdx] = !result;
    return result;
  }
  checkRow(rowIdx: number, colIdx: number): boolean {
    var foundWrongValue = false;
    for (var col = 0; col < 9; col++) {
      if (
        col != colIdx &&
        this.values[rowIdx][col] === this.values[rowIdx][colIdx]
      ) {
        foundWrongValue = true;
        this.wrong[rowIdx][col] = true;
      } else if (!this.values[rowIdx][colIdx]) {
        // this.wrong[rowIdx][colIdx] = true;
      }
    }
    return !foundWrongValue;
  }
  checkColumn(rowIdx: number, colIdx: number): boolean {
    var foundWrongValue = false;
    for (var row = 0; row < 9; row++) {
      if (
        row != rowIdx &&
        this.values[row][colIdx] === this.values[rowIdx][colIdx]
      ) {
        foundWrongValue = true;
        this.wrong[row][colIdx] = true;
      } else if (!this.values[row][colIdx]) {
        // this.wrong[row][colIdx] = true;
      }
    }

    return !foundWrongValue;
  }
  checkSquare(rowIdx: number, colIdx: number): boolean {
    var foundWrongValue = false;
    var firstRow = rowIdx - (rowIdx % 3);
    var firstCol = colIdx - (colIdx % 3);
    for (var row = firstRow; row < firstRow + 3; row++) {
      for (var col = firstCol; col < firstCol + 3; col++) {
        if (
          this.values[row][col] === this.values[rowIdx][colIdx] &&
          row !== rowIdx &&
          col !== colIdx
        ) {
          foundWrongValue = true;
          this.wrong[row][col] = true;
        } else if (!this.values[row][col]) {
          // this.wrong[row][col] = true;
        }
      }
    }
    return !foundWrongValue;
  }
  ngOnInit(): void {}
  checkSolution() {
    this.indicies.forEach((value, row) =>
      this.indicies.forEach((value, col) => this.checkCorrectness(row, col))
    );
  }

  resetWrongFlags() {
    this.indicies.forEach((value, row) =>
      this.indicies.forEach((value, col) => (this.wrong[row][col] = false))
    );
  }
  findSolution() {
    this.values = JSON.parse(JSON.stringify(this.currentSheetValues));
    if (this.solve(0, 0)) {
      this.resetWrongFlags();
    }
  }

  solve(rowIdx: number, colIdx: number): boolean {
    if (rowIdx == 8 && colIdx == 9) return true;
    if (colIdx == 9) {
      colIdx = 0;
      rowIdx++;
    }

    if (this.values[rowIdx][colIdx]) {
      return this.solve(rowIdx, colIdx + 1);
    }
    for (var x = 1; x < 10; x++) {
      this.values[rowIdx][colIdx] = x;
      if (
        this.checkCorrectness(rowIdx, colIdx) &&
        this.solve(rowIdx, colIdx + 1)
      )
        return true;
      this.values[rowIdx][colIdx] = null;
    }
    return false;
  }
}
