/*=================================================
Menu animation
===================================================*/
document.addEventListener('DOMContentLoaded', () => {

  const header = document.getElementById('header');

  const toggleBtn = document.querySelector('.toggle_btn');

  const mask = document.getElementById('mask');

  // Open and Close menu
  toggleBtn.addEventListener('click', () => {
    header.classList.toggle('open');
  });

  // Close menu by clicking background image
  mask.addEventListener('click', () => {
    header.classList.remove('open');
  });

});