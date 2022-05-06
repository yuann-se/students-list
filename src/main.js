let studentsArray = [
  {
    surname: 'Ли',
    givenName: 'Мухамед',
    middleName: 'Владимирович',
    birthdate: new Date(1999, 11, 13),
    startYear: 2021,
    faculty: 'Сериаловедение'
  },

  {
    surname: 'Цой',
    givenName: 'Виктор',
    middleName: 'Робертович',
    birthdate: new Date(1962, 5, 21),
    startYear: 1990,
    faculty: 'Экспериментальное бессмертие'
  },

  {
    surname: 'Ололоев',
    givenName: 'Пётр',
    middleName: 'Ололоевич',
    birthdate: new Date(1986, 7, 22),
    startYear: 2020,
    faculty: 'Мемология'
  },

  {
    surname: 'Сидоров',
    givenName: 'Сидр',
    middleName: 'Сидорович',
    birthdate: new Date(2013, 7, 22),
    startYear: 2019,
    faculty: 'Диванная политология'
  },
];

let now = new Date ();
const table = document.querySelector('tbody');

function createTableRow(array) {
  array.forEach(element => {
    let tr = table.insertRow();

    tr.insertCell(0).textContent = `${element.surname} ${element.givenName} ${element.middleName}`;
    tr.insertCell(1).textContent = element.faculty;

    // Если месяц состоит из одной цифры, добавляем в начало нолик
    let birthMonth = element.birthdate.getMonth() + 1;
    if (String(birthMonth).length === 1) {
      birthMonth = `0${birthMonth}`;
    }

    // Выясняем был ли уже др в этом году
    let thisYearBirthday = new Date (now.getFullYear(), element.birthdate.getMonth(), element.birthdate.getDate());
    let age = now.getFullYear() - element.birthdate.getFullYear();
    if (now < thisYearBirthday) {
      age = now.getFullYear() - element.birthdate.getFullYear() - 1;
    }

    // Учитываем тонкости русского языка
    let ageLastDigit = age.toString().slice(-1);
    if ( (ageLastDigit >= 1 && ageLastDigit <= 4) && (age < 10 || age > 20) ) {
      age = `${age} года`;
    } else {
      age = `${age} лет`;
    }

    tr.insertCell(2).textContent = `${element.birthdate.getDate()}.${birthMonth}.${element.birthdate.getFullYear()} (${age})`;

    // Учитываем, что учебный год начинается с сентября
    let courseCount;
    if (now.getMonth() < 8) {
      courseCount = now.getFullYear() - element.startYear;
    } else {
      courseCount = now.getFullYear() - element.startYear + 1;
    }

    if (courseCount > 4) {
      tr.insertCell(3).textContent = `${element.startYear} - ${element.startYear + 4} (завершено)`;
    } else {
    tr.insertCell(3).textContent = `${element.startYear} - ${element.startYear + 4} (${courseCount} курс)`;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  createTableRow(studentsArray);








})
