import { Component }   from '@angular/core';
import { Course }      from './card';
import { COURSES }		 from './mock-courses';
import { Assignment }  from './assignment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  examGrade: number;
	courses = COURSES;

  addCourse() {
    const newCourse = new Course();
    newCourse.examGrade = 0;
    newCourse.finalGrade = 0;
    newCourse.examPercentage = 0;
    newCourse.courseName = '';
    newCourse.assignments = []
    this.courses.push(newCourse)
  }

  addAssignment(course) {
    const newAssignment = new Assignment();
    course.assignments.push(newAssignment)
    course.examGrade = 0;
  }

  deleteSelection(course) {
    const index: number = this.courses.indexOf(course)
    if (index != -1) {
      this.courses.splice(index, 1)
    }
  }

  calculateGrade(course) {
    var sum = 0;
    var totalPct = Number(course.examPercentage);

    course.assignments.forEach(function(assignment) {
      var currentPct = Number(assignment.Percentage);
      var currentAssignment = (assignment.Percentage/100)*assignment.Grade
      sum = sum + currentAssignment;
      totalPct = totalPct + currentPct;

      return sum
    })

    if(totalPct != 100) {
      window.alert('Hope your exam doesn\'t involve math. Try adding your percentages up again and see if you get 100')
    }
    else {
     course.examGrade = ((course.finalGrade - sum)*(100/course.examPercentage))
    }
  }
}
