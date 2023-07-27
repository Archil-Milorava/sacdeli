"use strict";

//importing Data

import mainData from "./data.json" assert { type: "json" };

// importing HTML items

const headphoneSection = document.getElementById("main-section-headphones");
const speakersSection = document.getElementById("main-section-speakers");
const earphonesSection = document.getElementById("main-section-earphones");
const btn1 = document.querySelector('.headphone-btn')



// let func1 = function () {
//   console.log("hello");
// }



// window.addEventListener("DOMContentLoaded", function () {
//   if (document.body.id === "speakers") {
//     speakersProducts();
//   } else if (document.body.id === "headphones") {
//     headphoneProducts();
//   } else if (document.body.id === "earphones") {
//     earphonesProducts();
//   } else if (document.body.id === "product-itself") {
//  eachProduct();
//   }
// });




let eachProduct = () => {

  const productSection = document.getElementById("product-section");
console.log(productSection);
  productSection.innerHTML = mainData
    .map((item) => {
      return `

      
    
    <div id="product-section" class="product-details">
        <img
          class="headphone1"
          src="${item.image.desktop}"
          alt="${item.name}"
        />
        <div class="headphone1-description">
          ${item.new === true ? '<p class="title">New product</p>' : ""}
          <h1 class="product-name">${item.name}</h1>
          <p class="main-description">
            ${item.description}
          </p>
          <p class="price" id="product-price">$ ${item.price}</p>
          <div class="plus-minus-wrapper">
            <div class="wrapper">

            <span onclick="func1()"  class="minus">-</span>

              <span  class="amount">0</span>

              <span onclick="increase()"  class="plus">+</span>
              
            </div>
            <button  type="button" class="btn">Add to card</button>
          </div>
        </div>
      </div>
    
    `;
    })
    .join("");
};


// Headphones category

let headphoneProducts = () => {
  let page = document.getElementById("headphones");
  headphoneSection.innerHTML = mainData
    .filter((item) => item.category === "headphones")
    .map((item) => {
      return `
        <div id="" class="headphones-div">
          <img
            class="headphone1"
            src="${item.image.desktop}"
            alt="${item.name}"
          />
          <div class="headphone1-description">
            ${item.new === true ? '<p class="title">New product</p>' : ""}
            <h1 class="product-name"> ${item.name}</h1>
            <p class="main-description">
              ${item.description}
            </p>
            <button type="button" class="btn">See product</button>
          </div>
        </div>
      `;
    })
    .join("");


    const buttons = document.querySelectorAll('.btn')


console.log(buttons);
    buttons.forEach(button => {
      button.addEventListener('click', eachProduct)
    })

};



btn1.addEventListener('mouseover', headphoneProducts)


// Speakers category
let speakersProducts = () => {
  speakersSection.innerHTML = mainData
    .filter((item) => item.category === "speakers")
    .map((item) => {
      return `
      <div class="speakers-div">
      <img
        class="headphone1"
        src="${item.image.desktop}"
        alt=""
      />
      <div class="headphone1-description">
        ${item.new === true ? '<p class="title">New product</p>' : ""}
        <h1 class="product-name">${item.name}</h1>
        <p class="main-description">
        ${item.description}
        </p>
        <button type="button" class="btn">See product</button>
      </div>
    </div>
      `;
    })
    .join("");
};
// earphones category
let earphonesProducts = () => {
  earphonesSection.innerHTML = mainData
    .filter((item) => item.category === "earphones")
    .map((item) => {
      return `
      <div class="speakers-div">
      <img
        class="headphone1"
        src="${item.image.desktop}"
        alt=""
      />
      <div class="headphone1-description">
      ${item.new === true ? '<p class="title">New product</p>' : ""}
        <h1 class="product-name">${item.name}</h1>
        <p class="main-description">
        ${item.description}
        </p>
        <button type="button" class="btn">See product</button>
      </div>
    </div>
    
      `;
    })
    .join("");
};

//Product itself


//PLUS-minus buttons

// productSection.addEventListener("click", function (event) {
//   if (event.target.classList.contains("minus")) {
//     decrease();
//   } else if (event.target.classList.contains("plus")) {
//     increase();
//   }
// });












