"use strict";

const main = document.querySelector(".main");
const prevBtn = document.querySelector(".prev_btn");
const nextBtn = document.querySelector(".next_btn");

let itemsPerPage = 10;
let currentPage = 1;
let totalPage;

const renderCards = (data, currentPage, itemsPerPage) => {
  main.innerHTML = "";
  if (data) {
    totalPage = Math.ceil(data.length / itemsPerPage);
    let indexOfLastData = currentPage * itemsPerPage;
    let indexOfFirstData = indexOfLastData - itemsPerPage;

    data.slice(indexOfFirstData, indexOfLastData).forEach((item) => {
      main.innerHTML += `
            <div class="card w-50">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${item.email}</h6>
                    <p class="card-text">${item.body}</p>
                </div>
            </div>
            `;
    });
  }
};

const fetchComments = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/comments");
  const data = await response.json();
  renderCards(data, currentPage, itemsPerPage);
  nextBtn.addEventListener("click", () => {
    currentPage++;
    renderCards(data, currentPage, itemsPerPage);
  });

  prevBtn.addEventListener("click", () => {
    currentPage--;
    renderCards(data, currentPage, itemsPerPage);
  });
};

fetchComments();
