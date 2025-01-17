"use strict";

let habbits = [];

const HABBIT_KEY = "HABBIT_KEY";

/* page */
const page = {
  menu: document.querySelector(".menu__list"),
};

/* utils */

function loadData() {
  const habbitsString = localStorage.getItem("HABBIT_KEY");
  const habbitArray = JSON.parse(habbitsString);
  console.log(habbitArray);
  if (Array.isArray(habbitArray)) {
    habbits = habbitArray;
  }
}

function saveData() {
  localStorage.setItem(HABBIT_KEY, JSON.stringify(habbits));
}

/* render */

function rerenderMenu(activeHabbit) {
  if (!activeHabbit) {
    return;
  }

  // Ищем и обновляем каждый элемент меню
  for (const habbit of habbits) {
    console.log(habbits);
    const existed = document.querySelector(`[menu_habbit_id="${habbit.id}"]`); // исправили здесь
    console.log(existed);

    if (!existed) {
      // Если элемент не существует, создаём его
      const element = document.createElement("button");
      element.setAttribute("menu_habbit_id", habbit.id);
      element.classList.add("menu__item");

      element.addEventListener("click", () => rerender(habbit.id));
      element.innerHTML = `<img src="./images/${habbit.icon}.svg" alt="${habbit.name}"  />`;

      if (activeHabbit.id === habbit.id) {
        element.classList.add("menu__item_active");
        page.menu.appendChild(element); // добавляем элемент в меню
      }
    } else {
      // Если элемент уже существует
      if (activeHabbit.id === habbit.id) {
        existed.classList.add("menu__item_active");
      } else {
        existed.classList.remove("menu__item_active");
      }
    }
  }
}

function rerender(activeHabbitId) {
  const activeHabbit = habbits.find((habbit) => habbit.id === activeHabbitId);
  rerenderMenu(activeHabbit);
}

/* init */
(() => {
  loadData();
  rerender(habbits[0].id);
})();
