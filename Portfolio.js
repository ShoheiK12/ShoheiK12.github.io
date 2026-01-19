/* 最初にアニメーションが表示される（そのほかは背景色(黒色)で隠されている）。そのあと、Javascriptのwindow.onloadが発火し、3秒待った後に、bodyにloadedクラスが追加され、CSSのbody.loaded .animationのCSSが動く、つまり、アニメーションのopacityは0(フェードアウト)になり、アニメーションはhiddenされる。その後、CSSのtransition: opacity 0.8s ease, visibility 0.8s ease;により、0.8 秒かけて自然に消える。 */
window.onload = function () {
    setTimeout(function () {
      document.body.classList.add('loaded');
    }, 3000); 
  };

/* Light and Dark mode*/
var icon = document.querySelector("#icon");

icon.onclick = () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    icon.src = "Image/sun.png";
    } else {
    icon.src = "Image/moon.png";
    }
};

/* Snowfall animation */
let snowContainer = document.querySelector(".snow-container");

const craeteSnow = () => {
  /* Generate snow elements */
  let snow = document.createElement("span");
  snow.className = "snow";

  minSize = 5;
  maxSize = 10;

  /* Assign the size of snow randomly */
  let snowSize = Math.random() * (maxSize - minSize) + minSize;

  snow.style.width = snowSize + "px";
  snow.style.height = snowSize + "px";

  /* Assign the position of snowfall (calculate from left) */
  snow.style.left = Math.random() * 100 + "%";

  /* Put snow span in snow container*/
  snowContainer.appendChild(snow);

  /* Melt in 10 seconds */
  setTimeout(() => {
    snow.remove();
  }, 10000);
};

/* Call createSnow function every 0.1 seconds for snowfall*/
setInterval(craeteSnow, 100);
