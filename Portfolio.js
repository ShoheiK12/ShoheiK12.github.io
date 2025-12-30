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
