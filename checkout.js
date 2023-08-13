"use strict";

import mainData from "./data.json" assert { type: "json" };

let basket = JSON.parse(localStorage.getItem("data")) || [];

let itemContainer = document.querySelector(".item-container");
let totalPriceElement = document.querySelector(".total-price");
let shippingPriceElement = document.querySelector(".shipping-price");
let vatPriceElement = document.querySelector(".vat-price");
let grandTotalPriceElement = document.querySelector(".grand-total-price");

let generateHtml = () => {
  let total = 0;
  itemContainer.innerHTML = basket
    .map((item) => {
      let product = mainData.find((x) => x.id === item.id);
      if (product) {
        let { id, name, image, price } = product;
        total += price * item.quantity;
        return `<div class="item" id=${id}>
          <img src="${image.desktop}" alt="" class="check-out-img" />
          <div class="item-description">
            <h4>${name}</h4>
            <p class="price-item">$${price}</p>
          </div>
          <p class="qt">x${item.quantity}</p>
        </div>`;
      }
      return "";
    })
    .join("");

  let shippingPrice = 55;
  let vatPrice = total * 0.1;
  let grandTotalPrice = total + shippingPrice + vatPrice;

  totalPriceElement.textContent = `$ ${total.toFixed(2)}`;
  shippingPriceElement.textContent = `$ ${shippingPrice.toFixed(2)}`;
  vatPriceElement.textContent = `$ ${vatPrice.toFixed(2)}`;
  grandTotalPriceElement.textContent = `$ ${grandTotalPrice.toFixed(2)}`;
};

generateHtml();
