document.addEventListener('DOMContentLoaded', async() => {
  /*=================================================
  Generate Swiper Slides (Execute only when #swiper-wrapper exists)
  ===================================================*/
  const swiperWrapper = document.getElementById('swiper-wrapper');

  if (swiperWrapper) {
    try {
      const response = await fetch('./products.json');
      const products = await response.json();

      products.forEach(product => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
        <img src="${product.image}" alt="${product.title}" style="cursor: pointer;">
        `;

        const img = slide.querySelector('img');
        img.addEventListener('click', () => {
          window.location.href = `item.html?id=${product.id}`;
        });
        swiperWrapper.appendChild(slide);
      });
    } catch (error) {
      console.error("Data downloading failed:", error);
    }
  }
  /*=================================================
  Initialise Swiper (Execute only when there is swiper)
  ===================================================*/
  const swiperElement = document.querySelector(".swiper");
  
  if (swiperElement) {
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
  }

  
  /*=================================================
  Generate Product List
  ===================================================*/
  const productList = document.querySelector('.product-list');

  // Implemet only when .product-list exists.
  if (productList) {
    try {
      const response = await fetch('./products.json');
      const products = await response.json();

      products.forEach(product => {
        const li = document.createElement('li');

      li.innerHTML = `
        <img src="${product.image}" alt="" style="cursor: pointer;">
        <p>${product.title}</p>
        <p>${product.price}</p>
      `;

      const img = li.querySelector('img');
      img.addEventListener('click', () => {
        window.location.href = `item.html?id=${product.id}`;
      });

      productList.appendChild(li);
    });
    } catch (error) {
      console.error("Data downloading failed:", error);
    }
  }
});