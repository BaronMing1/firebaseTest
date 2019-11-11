import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { CoursesService } from '../services/courses.service';
import { Direction } from '../model/direction';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  courses$: Observable<Course[]>;
  direction$: Observable<Direction[]>;
  directionAnnee$: Observable<Direction[]>;

  beginnersCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses() {
    this.courses$ = this.coursesService.loadAllCourses_old();
    this.direction$ = this.coursesService.loadAllCourses();

    this.directionAnnee$ = this.direction$;

    //         this.directionAnnee$ = this.direction$.pipe(
    //   map(courses =>
    //     courses.filter(course => course.annee.includes('2010-2011'))
    //   ))

    this.beginnersCourses$ = this.courses$.pipe(
      map(courses =>
        courses.filter(course => course.categories.includes('BEGINNER'))
      )
    );

    this.advancedCourses$ = this.courses$.pipe(
      map(courses =>
        courses.filter(course => course.categories.includes('ADVANCED'))
      )
    );
  }
}
