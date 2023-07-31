"use strict";

//importing Data

import mainData from "./data.json" assert { type: "json" };

//basket

let basket = JSON.parse(localStorage.getItem("data")) || [];

// importing HTML items

window.addEventListener("DOMContentLoaded", function () {
  if (document.body.id === "speakers") {
    speakersProducts();
  } else if (document.body.id === "headphones") {
    headphoneProducts();
  } else if (document.body.id === "earphones") {
    earphonesProducts();
  } else if (document.body.id === "product-itself") {
    eachProduct(seeProduct);
  }
});

// Headphones category

let headphoneProducts = () => {
  const headphoneSection = document.getElementById("main-section-headphones");

  headphoneSection.innerHTML = mainData
    .filter((item) => item.category === "headphones")
    .map((item) => {
      let { id, name, image, description } = item;

      return `
        <div id="${id}" class="headphones-div">
          <img
            class="headphone1"
            src="${image.desktop}"
            alt="${name}"
          />
          <div class="headphone1-description">
            ${item.new === true ? '<p class="title">New product</p>' : ""}
            <h1 class="product-name"> ${name}</h1>
            <p class="main-description">
              ${description}
            </p>
            <button type="button" class="btn" onclick="seeProduct(${id})">See product</button>
          </div>
        </div>
      `;
    })
    .join("");
};

// Speakers category
let speakersProducts = () => {
  const speakersSection = document.getElementById("main-section-speakers");

  speakersSection.innerHTML = mainData
    .filter((item) => item.category === "speakers")
    .map((item) => {
      let { id, name, image, description } = item;

      return `
      <div id="${id}" class="speakers-div">
      <img
        class="headphone1"
        src="${image.desktop}"
        alt=""
      />
      <div class="headphone1-description">
        ${item.new === true ? '<p class="title">New product</p>' : ""}
        <h1 class="product-name">${name}</h1>
        <p class="main-description">
        ${description}
        </p>
        <button type="button" class="btn" onclick="seeProduct(${id})">See product</button>
      </div>
    </div>
      `;
    })
    .join("");
};
// earphones category
let earphonesProducts = () => {
  const earphonesSection = document.getElementById("main-section-earphones");

  earphonesSection.innerHTML = mainData
    .filter((item) => item.category === "earphones")
    .map((item) => {
      let { name, image, id } = item;
      return `
      <div class="speakers-div" id="${id}">
      <img
        class="headphone1"
        src="${image.desktop}"
        alt=""
      />
      <div class="headphone1-description">
      ${item.new === true ? '<p class="title">New product</p>' : ""}
        <h1 class="product-name">${name}</h1>
        <p class="main-description">
        ${item.description}
        </p>
        <button type="button" class="btn" onclick="cartItems(${id})">See product</button>
      </div>
    </div>
    
      `;
    })
    .join("");
};

//see product button
window.seeProduct = function (id) {
  let eachId = id;
  window.location.href = `/product-itself.html?id=${id}`;
};

//Clicked Product itself

let eachProduct = () => {
  const productSection = document.getElementById("product-section");

  const urlParams = new URLSearchParams(window.location.search);
  const selectedProductId = parseInt(urlParams.get("id"));

  const selectedProduct = mainData.find(
    (item) => item.id === selectedProductId
  );

  if (selectedProduct) {
    const { id, name, image, price } = selectedProduct;
    const searchStorage = basket.find((x) => x.id === id);

    productSection.innerHTML = `
      <div id="${id}" class="product-details">
        <img
          class="headphone1"
          src="${image.desktop}"
          alt="${name}"
        />
        <div class="headphone1-description">
          ${
            selectedProduct.new === true
              ? '<p class="title">New product</p>'
              : ""
          }
          <h1 class="product-name">${name}</h1>
          <p class="main-description">
            ${selectedProduct.description}
          </p>
          <p class="price" id="product-price">$ ${price}</p>
          <div class="plus-minus-wrapper">
            <div class="wrapper">
              <span onclick="decrease(${id})" class="minus">-</span>
              <span id="amount-${id}" class="amount">0</span>

              <span onclick="increase(${id})" class="plus">+</span>
            </div>
            <button type="button" class="btn" onclick="addToCart(${id})">Add to cart</button>
          </div>
        </div>
      </div>`;
  }
};

//increase-decrease buttons
// increase Button
window.increase = function (item) {
  let selectedItem = item;
  let search = basket.find((x) => x.id === selectedItem);

  const productPrice = mainData.find((x) => x.id === item);

  if (search === undefined) {
    basket.push({
      id: selectedItem,
      quantity: 1,
      price: productPrice.price,
    });
  } else {
    search.quantity += 1;
  }

  localStorage.setItem("data", JSON.stringify(basket));

  update(selectedItem);
};
//decrease buttons
window.decrease = function (item) {
  let selectedItem = item;
  let search = basket.find((x) => x.id === selectedItem);

  if (search.quantity === 0) return;
  else {
    search.quantity -= 1;
  }

  update(selectedItem);
  basket = basket.filter((x) => x.quantity !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
};
//update quantity of selected items
let update = (id) => {
  let search2 = basket.find((x) => x.id === id);
  document.getElementById(`amount-${id}`).innerHTML = search2.quantity;

  totalPriceCalculator(id);
  totalQuantityCalculator(id);
};

//basket related
const cartIcon = document.getElementById("cart-icon");
const cart = document.querySelector(".main-container-cart");
const mainsection = document.querySelector(".blur-container");

// Function to hide the cart
function hideCart() {
  cart.classList.add("hidden-basket");
  mainsection.classList.remove("blur");
}

// Function to check if the clicked element is the cart icon or part of the cart
function isClickedInsideCart(event) {
  return event.target === cartIcon || cart.contains(event.target);
}

// Event listener to toggle cart when cart icon is clicked
cartIcon.addEventListener("click", () => {
  cart.classList.toggle("hidden-basket");
  mainsection.classList.toggle("blur");
  cartItems();
});

// Event listener to hide the cart when clicking on the body
document.body.addEventListener("click", (x) => {
  if (!isClickedInsideCart(x)) {
    hideCart();
  }
});

function cartItems() {
  let cartitem = document.querySelector(".added-cart-items-container");
  cartitem.innerHTML = basket
    .map((item) => {
      const product = mainData.find((product) => product.id === item.id);
      if (!product) return "";

      return `
      <div class="cart-item" id=""${item.id}>
        <div class="product-description-flex-container">
          <img class="cart-image" src="${product.image.desktop}" alt="${product.name}" />
          <div class="cart-item-description-container">
            <h6 class="cart-item-name">${product.name}</h6>
            <span class="cart-item-price">$ ${product.price}</span>
          </div>
        </div>
        <div class="wrapper-cart">
          <span class="minus-cart" onclick="decrease(${item.id})">-</span>
          <span class="cart-item-quantity" id="amount-${product.id}">${item.quantity}</span>
          <span class="plus-cart" onclick="increase(${item.id})">+</span>
        </div>
      </div>
    `;
    })
    .join("");
}

//remove all item from the basket
let clearBasketButton = document.querySelector(".clear-cart");

clearBasketButton.addEventListener("click", () => {
  basket.splice(0, basket.length);
  localStorage.clear();
  totalPrice.textContent = "0";
  totalquantity.textContent = "0";
  cartItems();
});

//Calculating the price of the basket items
const totalPrice = document.querySelector(".total-price");

function totalPriceCalculator() {
  // let priceOfTtem = basket.map((x) => x.price);
  // let quantityOfItem = basket.map((x) => x.quantity);

  // const total = priceOfTtem * quantityOfItem;

  // return (totalPrice.textContent = total);

  let total = basket.reduce((acc, cur) => (acc = cur.quantity * cur.price), 0);
  totalPrice.textContent = total;
  console.log(total);
}

//Calculating the quantity of the basket items
const totalquantity = document.querySelector(".total-quantity");
function totalQuantityCalculator() {
  let totalQt = basket.map((x) => x.quantity);
  return (totalquantity.textContent = totalQt);
}
