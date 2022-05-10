let studentsArray = [
  {
    surname: "Ли",
    givenName: "Мухамед",
    middleName: "Владимирович",
    birthdate: new Date(1999, 11, 13),
    startYear: 2021,
    faculty: "Сериаловедение",
    id: 1
  },
  {
    surname: "Цой",
    givenName: "Виктор",
    middleName: "Робертович",
    birthdate: new Date(1962, 5, 21),
    startYear: 2010,
    faculty: "Философия бессмертия",
    id: 2
  },
  {
    surname: "Ололоев",
    givenName: "Пётр",
    middleName: "Ололоевич",
    birthdate: new Date(1986, 7, 22),
    startYear: 2018,
    faculty: "Мемология",
    id: 3
  },
  {
    surname: "Раскольников",
    givenName: "Родион",
    middleName: "Романович",
    birthdate: new Date(1999, 10, 11),
    startYear: 2019,
    faculty: "Финансовая аналитика",
    id: 4
  },
  {
    surname: "Узумаки",
    givenName: "Наруто",
    middleName: "Аркадьевич",
    birthdate: new Date(2003, 0, 30),
    startYear: 2020,
    faculty: "Зоопсихология",
    id: 5
  },
  {
    surname: "Сидоров",
    givenName: "Сидр",
    middleName: "Сидорович",
    birthdate: new Date(2013, 7, 22),
    startYear: 2019,
    faculty: "Диванная политология",
    id: 6
  },
  {
    surname: "Леннон",
    givenName: "Джон",
    middleName: "Уинстон",
    birthdate: new Date(1940, 9, 9),
    startYear: 2000,
    faculty: "Востоковедение",
    id: 7
  },
  {
    surname: "Чепмен",
    givenName: "Марк",
    middleName: "Дэвид",
    birthdate: new Date(1955, 4, 10),
    startYear: 2008,
    faculty: "Стрелково-пушечное вооружение",
    id: 8
  },
  {
    surname: "Элрик",
    givenName: "Эдвард",
    middleName: "Олегович",
    birthdate: new Date(2005, 10, 10),
    startYear: 2020,
    faculty: "Органическая алхимия",
    id: 9
  },

  {
    surname: "Бесподобная",
    givenName: "Эльмира",
    middleName: "Бенедиктовна",
    birthdate: new Date(1985, 5, 23),
    startYear: 2018,
    faculty: "Астрология козерогов",
    id: 10
  },

  {
    surname: "Гайдай",
    givenName: "Вероника",
    middleName: "Эдуардовна",
    birthdate: new Date(1995, 2, 12),
    startYear: 2020,
    faculty: "3D-анимация ",
    id: 11
  },
  {
    surname: "Бердымухамедов",
    givenName: "Гурбангулы",
    middleName: "Мяликгулыевич",
    birthdate: new Date(1981, 6, 29),
    startYear: 2017,
    faculty: "Логопедия",
    id: 12
  },
];

let now = new Date();
const table = document.querySelector("tbody");

function createTable(array) {
  // Очищаем таблицу
  document.querySelectorAll(".content-row").forEach((el) => el.remove());

  array.forEach((element) => {
    let tr = table.insertRow();
    tr.classList.add("content-row");
    tr.setAttribute('id', element.id);

    tr.insertCell(
      0
    ).textContent = `${element.surname} ${element.givenName} ${element.middleName}`;
    tr.insertCell(1).textContent = element.faculty;

    // Если месяц состоит из одной цифры, добавляем в начало нолик
    let birthMonth = element.birthdate.getMonth() + 1;
    if (String(birthMonth).length === 1) {
      birthMonth = `0${birthMonth}`;
    }

    // Выясняем был ли уже др в этом году
    let thisYearBirthday = new Date(
      now.getFullYear(),
      element.birthdate.getMonth(),
      element.birthdate.getDate()
    );
    let age = now.getFullYear() - element.birthdate.getFullYear();
    if (now < thisYearBirthday) {
      age = now.getFullYear() - element.birthdate.getFullYear() - 1;
    }

    // Учитываем тонкости русского языка
    let ageLastDigit = age.toString().slice(-1);
    if (ageLastDigit == 1 && age != 11) {
      age = `${age} год`;
    } else if (
      ageLastDigit >= 2 &&
      ageLastDigit <= 4 &&
      (age < 10 || age > 20)
    ) {
      age = `${age} года`;
    } else {
      age = `${age} лет`;
    }

    tr.insertCell(
      2
    ).textContent = `${element.birthdate.getDate()}.${birthMonth}.${element.birthdate.getFullYear()} (${age})`;

    // Учитываем, что учебный год начинается с сентября
    let courseCount;
    if (now.getMonth() < 8) {
      courseCount = now.getFullYear() - element.startYear;
    } else {
      courseCount = now.getFullYear() - element.startYear + 1;
    }

    if (courseCount > 4) {
      tr.insertCell(3).textContent = `${element.startYear} - ${element.startYear + 4
        } (завершено)`;
    } else {
      tr.insertCell(3).textContent = `${element.startYear} - ${element.startYear + 4
        } (${courseCount} курс)`;
    }
  });
}

const allInputs = Array.from(
  document.querySelector(".add-student-form").querySelectorAll("input")
);
const birthdateInput = document.getElementById("birthdate");
const startYearInput = document.getElementById("start-year");

function validateForm() {
  allInputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (!input.value.toString().trim()) {
        input.parentNode.childNodes[5].classList.add("d-block");
        input.parentNode.childNodes[5].textContent = "Это поле обязательно";
        input.style.borderColor = "#dc3545";
      } else {
        input.parentNode.childNodes[5].classList.remove("d-block");
        input.style.borderColor = "#ced4da";
      }
    });
  });

  birthdateInput.addEventListener("input", () => {
    const minBirthdate = new Date(1900, 0, 1);
    if (
      birthdateInput.valueAsDate < minBirthdate ||
      birthdateInput.valueAsDate > now
    ) {
      birthdateInput.style.borderColor = "#dc3545";
      birthdateInput.parentNode.childNodes[5].classList.add("d-block");
      birthdateInput.parentNode.childNodes[5].textContent =
        "Дата рождения должна быть в диапазоне от 01.01.1900 до текущей даты";
    }
  });

  startYearInput.addEventListener("input", () => {
    if (
      Number(startYearInput.value) < 2000 ||
      Number(startYearInput.value) >= now.getFullYear()
    ) {
      startYearInput.style.borderColor = "#dc3545";
      startYearInput.parentNode.childNodes[5].classList.add("d-block");
      startYearInput.parentNode.childNodes[5].textContent =
        "Год начала обучения должен быть в диапазоне от 2000-го до текущего года";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  createTable(studentsArray);

  // Фильтры
  const filterName = document.getElementById("filter-name");
  const filterFaculty = document.getElementById("filter-faculty");
  const filterStartYear = document.getElementById("filter-start-year");
  const filterEndYear = document.getElementById("filter-end-year");
  let filteredArray = studentsArray;

  function checkNameValue(student) {
    if (
      student.givenName
        .toLowerCase()
        .includes(filterName.value.toLowerCase()) ||
      student.surname.toLowerCase().includes(filterName.value.toLowerCase()) ||
      student.middleName.toLowerCase().includes(filterName.value.toLowerCase())
    ) {
      return true;
    }
  }

  filterName.addEventListener("input", () => {
    if (filterFaculty.value) {
      filteredArray = filteredArray.filter((student) =>
        student.faculty
          .toLowerCase()
          .includes(filterFaculty.value.toLowerCase())
      );
    }

    if (filterStartYear.value) {
      filteredArray = filteredArray.filter(
        (student) => student.startYear === Number(filterStartYear.value)
      );
    }

    if (filterEndYear.value) {
      filteredArray = filteredArray.filter(
        (student) => student.startYear + 4 === Number(filterEndYear.value)
      );
    }

    filteredArray = filteredArray.filter((student) => checkNameValue(student));
    createTable(filteredArray);
    filteredArray = studentsArray;
  });

  filterFaculty.addEventListener("input", () => {
    if (filterName.value) {
      filteredArray = filteredArray.filter((student) =>
        checkNameValue(student)
      );
    }

    if (filterStartYear.value) {
      filteredArray = filteredArray.filter(
        (student) => student.startYear === Number(filterStartYear.value)
      );
    }

    if (filterEndYear.value) {
      filteredArray = filteredArray.filter(
        (student) => student.startYear + 4 === Number(filterEndYear.value)
      );
    }

    filteredArray = filteredArray.filter((student) =>
      student.faculty.toLowerCase().includes(filterFaculty.value.toLowerCase())
    );
    createTable(filteredArray);
    filteredArray = studentsArray;
  });

  filterStartYear.addEventListener("input", () => {
    if (filterName.value) {
      filteredArray = filteredArray.filter((student) =>
        checkNameValue(student)
      );
    }

    if (filterFaculty.value) {
      filteredArray = filteredArray.filter((student) =>
        student.faculty
          .toLowerCase()
          .includes(filterFaculty.value.toLowerCase())
      );
    }

    if (filterEndYear.value) {
      filteredArray = filteredArray.filter(
        (student) => student.startYear + 4 === Number(filterEndYear.value)
      );
    }

    if (filterStartYear.value) {
      filteredArray = filteredArray.filter(
        (student) => student.startYear === Number(filterStartYear.value)
      );
      createTable(filteredArray);
      filteredArray = studentsArray;
    } else createTable(filteredArray);
  });

  filterEndYear.addEventListener("input", () => {
    if (filterName.value) {
      filteredArray = filteredArray.filter((student) =>
        checkNameValue(student)
      );
    }

    if (filterFaculty.value) {
      filteredArray = filteredArray.filter((student) =>
        student.faculty
          .toLowerCase()
          .includes(filterFaculty.value.toLowerCase())
      );
    }

    if (filterStartYear.value) {
      filteredArray = filteredArray.filter(
        (student) => student.startYear === Number(filterStartYear.value)
      );
    }
    if (filterEndYear.value) {
      filteredArray = filteredArray.filter(
        (student) => student.startYear + 4 === Number(filterEndYear.value)
      );
      createTable(filteredArray);
      filteredArray = studentsArray;
    } else createTable(filteredArray);
  });

  // Сортировка

  function getFilteredArray() {
    filteredArray = [];
    document.querySelectorAll('.content-row').forEach((row) => {
      studentsArray.forEach((student) => {
        if (student.id == row.attributes.id.value) {
          filteredArray.push(student);
        }
      })
    })
  }

  document.getElementById("sort-name").addEventListener("click", () => {
    getFilteredArray();
    let sortedArray = filteredArray.sort((a, b) =>
      a.surname + a.givenName + a.middleName >
        b.surname + b.givenName + b.middleName
        ? 1
        : -1
    );
    createTable(sortedArray);
  });

  document.getElementById("sort-faculty").addEventListener("click", () => {
    getFilteredArray();
    let sortedArray = filteredArray.sort((a, b) =>
      a.faculty > b.faculty ? 1 : -1
    );
    createTable(sortedArray);
  });

  document.getElementById("sort-birthdate").addEventListener("click", () => {
    getFilteredArray();
    let sortedArray = filteredArray.sort((a, b) =>
      a.birthdate < b.birthdate ? 1 : -1
    );
    createTable(sortedArray);
  });

  document.getElementById("sort-start-year").addEventListener("click", () => {
    getFilteredArray();
    let sortedArray = filteredArray.sort((a, b) =>
      a.startYear < b.startYear ? 1 : -1
    );
    createTable(sortedArray);
  });

  // Форма добавления нового студента
  validateForm();
  document.querySelector(".add-student-form").addEventListener("submit", (e) => {
    e.preventDefault();

    allInputs.forEach((input) => {
      if (!input.value.toString().trim()) {
        input.parentNode.childNodes[5].classList.add("d-block");
        input.parentNode.childNodes[5].textContent = "Это поле обязательно";
        input.style.borderColor = "#dc3545";
      }
    });

    if (
      !allInputs.some((input) =>
        input.parentNode.childNodes[5].classList.contains("d-block")
      )
    ) {
      let newStudent = {};
      newStudent.surname = document.getElementById("surname").value;
      newStudent.givenName = document.getElementById("name").value;
      newStudent.middleName = document.getElementById("middle-name").value;
      newStudent.birthdate = document.getElementById("birthdate").valueAsDate;
      newStudent.faculty = document.getElementById("faculty").value;
      newStudent.startYear = Number(
        document.getElementById("start-year").value
      );
      newStudent.id = studentsArray.length + 1;
      studentsArray.push(newStudent);

      allInputs.forEach((input) => (input.value = null));

      createTable(studentsArray);
    }
  });
});
