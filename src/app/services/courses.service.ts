import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Course } from '../model/course';
import { Direction } from '../model/direction';
import { from, Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { convertSnaps } from './db-utils';
import { Lesson } from '../model/lesson';
import OrderByDirection = firebase.firestore.OrderByDirection;

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private db: AngularFirestore) {}

  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    return from(this.db.doc(`courses/${courseId}`).update(changes));
  }

  loadAllCourses_old(): Observable<Course[]> {
    return this.db
      .collection('courses', ref => ref.orderBy('seqNo'))
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<Course>(snaps)),
        first()
      );
  }

  loadAllCourses(): Observable<Direction[]> {
    return this.db
      .collection('LNRE_Direction', ref => ref.orderBy('annee'))
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<Direction>(snaps)),
        first()
      );
  }

  findCourseByUrl(courseUrl: string): Observable<Course> {
    return this.db
      .collection('courses', ref => ref.where('url', '==', courseUrl))
      .snapshotChanges()
      .pipe(
        map(snaps => {
          const courses = convertSnaps<Course>(snaps);

          return courses.length == 1 ? courses[0] : undefined;
        }),
        first()
      );
  }

  findLessons(
    courseId: string,
    sortOrder: OrderByDirection = 'asc',
    pageNumber = 0,
    pageSize = 3
  ): Observable<Lesson[]> {
    return this.db
      .collection(`courses/${courseId}/lessons`, ref =>
        ref
          .orderBy('seqNo', sortOrder)
          .limit(pageSize)
          .startAfter(pageNumber * pageSize)
      )
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<Lesson>(snaps)),
        first()
      );
  }
}
