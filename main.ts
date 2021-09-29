
import { Course } from './course.js';
import { Student } from './student.js'
import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js'

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentTbody: HTMLElement = document.getElementById('students')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement>document.getElementById("search-box")!;
const inputMinBox: HTMLInputElement = <HTMLInputElement>document.getElementById("min-box")!;
const inputMaxBox: HTMLInputElement = <HTMLInputElement>document.getElementById("max-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyFilterByCredits();

renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  }
  );
}

function renderStudentInTable(pStudent: Student[]): void {
  console.log('Desplegando Estudiante');
  pStudent.forEach((student) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${student.codigo}</td>
                           <td>${student.cedula}</td>
                           <td>${student.edad}</td>
                           <td>${student.direccion}</td>
                           <td>${student.telefono}</td>`;
    studentTbody.appendChild(trElement);
  }
  );
}

function applyFilterByCredits() {
  let text1 = inputMinBox.value;
  text1 = (text1 == null) ? '' : text1;
  let text2 = inputMaxBox.value;
  text2 = (text2 == null) ? '' : text2;

  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByCredits(text1, text2, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function applyFilterByName() {
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter(c =>
    c.name.match(nameKey));
}

function searchCourseByCredits(pCreditsMin: string, pCreditsMax: string , courses: Course[]) {
  return pCreditsMin === '' ? dataCourses : courses.filter(c =>
    c.credits >= Number(pCreditsMin) && c.credits <= Number(pCreditsMax));

}

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);

    }
  }
}