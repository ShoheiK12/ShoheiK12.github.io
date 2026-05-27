document.addEventListener('DOMContentLoaded', async() => {
  /*=================================================
  Initialise Swiper
  ===================================================*/
  const swiper = new Swiper(".swiper", {

    loop: true,

    speed: 1000,

    autoplay: {
      delay: 3000,
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

  });

  
  /*=================================================
  Generate Product List
  ===================================================*/
  const response = await fetch('./products.json');

  const products = await response.json();

  const productList = document.querySelector('.product-list');

  products.forEach(product => {

    const li = document.createElement('li');

    li.innerHTML = `
      <a href="item.html?id=${product.id}">
        <img src="${product.image}" alt="">
        <p>${product.title}</p>
        <p>${product.price}</p>
      </a>
    `;

    productList.appendChild(li);
  
  });
});