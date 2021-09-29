import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var studentTbody = document.getElementById('students');
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByCredits = document.getElementById("button-filterByCredits");
var inputSearchBox = document.getElementById("search-box");
var inputMinBox = document.getElementById("min-box");
var inputMaxBox = document.getElementById("max-box");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByCredits(); };
renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInTable(pStudent) {
    console.log('Desplegando Estudiante');
    pStudent.forEach(function (student) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + student.codigo + "</td>\n                           <td>" + student.cedula + "</td>\n                           <td>" + student.edad + "</td>\n                           <td>" + student.direccion + "</td>\n                           <td>" + student.telefono + "</td>";
        studentTbody.appendChild(trElement);
    });
}
function applyFilterByCredits() {
    var text1 = inputMinBox.value;
    text1 = (text1 == null) ? '' : text1;
    var text2 = inputMaxBox.value;
    text2 = (text2 == null) ? '' : text2;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(text1, text2, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByCredits(pCreditsMin, pCreditsMax, courses) {
    return pCreditsMin === '' ? dataCourses : courses.filter(function (c) {
        return c.credits >= Number(pCreditsMin) && c.credits <= Number(pCreditsMax);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
