const USERS_LIST_ID = 'users';
const STUDENTS_LIST_SELECTOR = 'li[data-role="student"]';
const USER_AGE_AtTRIBUTE = 'data-age';

function getSortedStudentNames() {
  const ul = document.getElementById(USERS_LIST_ID);
  const studentLis = ul.querySelectorAll(STUDENTS_LIST_SELECTOR);

  const students = Array.from(studentLis).map(li => {
    const name = li.textContent.trim();
    const ageStr = li.getAttribute(USER_AGE_AtTRIBUTE);
    let age = null;
    if (ageStr !== null && ageStr !== '') {
      const parsedAge = parseInt(ageStr, 10);
      if (!isNaN(parsedAge)) {
        age = parsedAge;
      }
    }
    return { name, age };
  });

  students.sort((a, b) => {
    if (a.age === null && b.age === null) return 0;
    if (a.age === null) return 1;
    if (b.age === null) return -1;
    return a.age - b.age;
  });

  return students.map(student => student.name);
}

function getYoungestStudent() {
  const ul = document.getElementById(USERS_LIST_ID);
  const studentLis = ul.querySelectorAll(STUDENTS_LIST_SELECTOR);
  
  const studentsWithAge = Array.from(studentLis)
    .map(li => {
      const name = li.textContent.trim();
      const ageStr = li.getAttribute(USER_AGE_AtTRIBUTE);
      if (ageStr !== null && ageStr !== '') {
        const parsedAge = parseInt(ageStr, 10);
        if (!isNaN(parsedAge)) {
          return { name, age: parsedAge };
        }
      }
      return null;
    })
    .filter(item => item !== null);
  
  if (studentsWithAge.length > 0) {
    const youngest = studentsWithAge.reduce((min, current) => 
      current.age < min.age ? current : min
    );
    return youngest;
  } else {
    console.error('No students with valid age');
  }
}

const sortedNames = getSortedStudentNames();
const youngestStudent = getYoungestStudent();

console.log({
    sortedNames,
    youngestStudentName: youngestStudent.name,
});
