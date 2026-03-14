/*
Initially, an animation is displayed while everything else is hidden by a black background. 
Afterwards, the Javascript window.onload event fires. After a 3-second delay, the loaded class is added to the body element. 
This triggers the CSS for body.loaded .animation, causing the animation's opacity to become 0 (fading out) and the animation to be hidden. 
The animation then naturally disappears over 0.8 seconds due to the CSS transition transition: opacity 0.8s ease, visibility 0.8s ease;.
*/
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

/* Starfall animation */
let starContainer = document.querySelector(".star-container");

const craeteStar = () => {
  /* Generate star elements */
  let star = document.createElement("span");
  star.className = "star";

  minSize = 5;
  maxSize = 30;

  /* Assign the size of star randomly */
  let starSize = Math.random() * (maxSize - minSize) + minSize;

  star.style.width = starSize + "px";
  star.style.height = starSize + "px";

  /* Assign the position of starfall (calculate from left) */
  star.style.left = Math.random() * 100 + "%";

  /* Put star span in star container*/
  starContainer.appendChild(star);

  /* Melt in 10 seconds */
  setTimeout(() => {
    star.remove();
  }, 10000);
};

/* Call createStar function every 0.1 seconds for starfall*/
setInterval(craeteStar, 100);

/* Scroll animation */
ScrollReveal({ reset: true, distance: '60px', duration: 2000, delay: 200 });
ScrollReveal().reveal('.content img', { 
  delay: 200, 
  origin: 'left'
});
ScrollReveal().reveal('.content-title', { 
  delay: 200, 
  origin: 'right'});
ScrollReveal().reveal('#top p', { 
  delay: 200, 
  origin: 'right',
  distance: '60px' 
});
ScrollReveal().reveal('.section-title', {
  delay: 200, 
  origin: 'left'
});
ScrollReveal().reveal('.material-icons, .project-img', { 
  delay: 200, 
  origin: 'bottom'
});
ScrollReveal().reveal('#about .content', { 
  delay: 200, 
  origin: 'right',
  distance: '60px' 
});
ScrollReveal().reveal('.profile-intro', { 
  delay: 200, 
  origin: 'right',
  distance: '60px' 
});
ScrollReveal().reveal('.timeline-content', { 
  delay: 300, 
  origin: 'right'
});
ScrollReveal().reveal('#contact h3', { 
  delay: 200, 
  origin: 'right',
  distance: '60px' 
});
ScrollReveal().reveal('.contact-details', { 
  delay: 300, 
  origin: 'bottom', 
  interval: 200
});


