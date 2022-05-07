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
    startYear: 2010,
    faculty: 'Философия бессмертия'
  },

  {
    surname: 'Ололоев',
    givenName: 'Пётр',
    middleName: 'Ололоевич',
    birthdate: new Date(1986, 7, 22),
    startYear: 2018,
    faculty: 'Мемология'
  },
  {
    surname: 'Узумаки',
    givenName: 'Наруто',
    middleName: 'Аркадьевич',
    birthdate: new Date(2003, 0, 30),
    startYear: 2020,
    faculty: 'Зоопсихология'
  },
  {
    surname: 'Сидоров',
    givenName: 'Сидр',
    middleName: 'Сидорович',
    birthdate: new Date(2013, 7, 22),
    startYear: 2019,
    faculty: 'Диванная политология'
  },
  {
    surname: 'Леннон',
    givenName: 'Джон',
    middleName: 'Иванович',
    birthdate: new Date(1940, 9, 9),
    startYear: 2000,
    faculty: 'Востоковедение'
  },
  {
    surname: 'Элрик',
    givenName: 'Эдвард',
    middleName: 'Олегович',
    birthdate: new Date(2005, 10, 10),
    startYear: 2020,
    faculty: 'Органическая алхимия'
  },
];

let now = new Date();
const table = document.querySelector('tbody');

function createTable(array) {
  // Очищаем таблицу
  document.querySelectorAll('.content-row').forEach((el) => el.remove());

  array.forEach(element => {
    let tr = table.insertRow();
    tr.classList.add('content-row');

    tr.insertCell(0).textContent = `${element.surname} ${element.givenName} ${element.middleName}`;
    tr.insertCell(1).textContent = element.faculty;

    // Если месяц состоит из одной цифры, добавляем в начало нолик
    let birthMonth = element.birthdate.getMonth() + 1;
    if (String(birthMonth).length === 1) {
      birthMonth = `0${birthMonth}`;
    }

    // Выясняем был ли уже др в этом году
    let thisYearBirthday = new Date(now.getFullYear(), element.birthdate.getMonth(), element.birthdate.getDate());
    let age = now.getFullYear() - element.birthdate.getFullYear();
    if (now < thisYearBirthday) {
      age = now.getFullYear() - element.birthdate.getFullYear() - 1;
    }

    // Учитываем тонкости русского языка
    let ageLastDigit = age.toString().slice(-1);
    if ((ageLastDigit == 1) && (age !== 11)) {
      age = `${age} год`;
    } else if ((ageLastDigit >= 2 && ageLastDigit <= 4) && (age < 10 || age > 20)) {
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
  createTable(studentsArray);

  document.querySelector('.btn-primary').addEventListener('click', (e) => {
    e.preventDefault();
    const allInputs = document.querySelector('.add-student-form').querySelectorAll('input');
    function validateForm() {
      allInputs.forEach((input) => {
        input.addEventListener('input', () => {
          if (!input.value.trim()) {
            console.log(input.value.trim());
            input.parentNode.childNodes[2].textContent = 'Это поле обязательно';
            return false;
          }
        })
      }
      )
    }
    console.log(allInputs);


    validateForm();
    // if (validateForm) {
    //   e.preventDefault();
    //   let newStudent = {};
    //   newStudent.surname = document.getElementById('surname').value;
    //   newStudent.givenName = document.getElementById('name').value;
    //   newStudent.middleName = document.getElementById('middle-name').value;
    //   newStudent.birthdate = document.getElementById('birthdate').valueAsDate;
    //   newStudent.faculty = document.getElementById('faculty').value;
    //   newStudent.startYear = Number(document.getElementById('start-year').value);
    //   studentsArray.push(newStudent);

    //   allInputs.forEach((input) => input.value = null);

    //   createTable(studentsArray);
    // }
  });



  document.getElementById('sort-name').addEventListener('click', () => {
    let sortedArray = studentsArray.sort((a, b) => (a.surname + a.givenName + a.middleName) > (b.surname + b.givenName + b.middleName) ? 1 : -1);
    createTable(sortedArray);
  });

  document.getElementById('sort-faculty').addEventListener('click', () => {
    let sortedArray = studentsArray.sort((a, b) => a.faculty > b.faculty ? 1 : -1);
    createTable(sortedArray);
  });

  document.getElementById('sort-birthdate').addEventListener('click', () => {
    let sortedArray = studentsArray.sort((a, b) => a.birthdate < b.birthdate ? 1 : -1);
    createTable(sortedArray);
  });

  document.getElementById('sort-start-year').addEventListener('click', () => {
    let sortedArray = studentsArray.sort((a, b) => a.startYear < b.startYear ? 1 : -1);
    createTable(sortedArray);
  });










})
