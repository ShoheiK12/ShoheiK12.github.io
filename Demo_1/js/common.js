/*=================================================
ハンバーガーメニュー
===================================================*/
document.addEventListener('DOMContentLoaded', () => {

  const header = document.getElementById('header');

  const toggleBtn = document.querySelector('.toggle_btn');

  const mask = document.getElementById('mask');

  // メニュー開閉
  toggleBtn.addEventListener('click', () => {
    header.classList.toggle('open');
  });

  // 背景クリックで閉じる
  mask.addEventListener('click', () => {
    header.classList.remove('open');
  });

});