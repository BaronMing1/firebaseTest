import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Direction } from '../model/direction';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'direction-card-list',
  templateUrl: './direction-card-list.component.html',
  styleUrls: ['./direction-card-list.component.scss']
})
export class DirectionCardListComponent implements OnInit {
  @Input()
  courses: Direction[];

  @Output()
  courseEdited = new EventEmitter();

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  editCourse(course: Direction) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = course;
  }
}
