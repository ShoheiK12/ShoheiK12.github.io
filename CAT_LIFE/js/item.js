document.addEventListener('DOMContentLoaded', async () => {

  // URLから id を取得
  const params = new URLSearchParams(window.location.search);

  const id = params.get('id');

  // JSON取得
  const response = await fetch('./products.json');

  const products = await response.json();

  // id一致の商品検索
  const product = products.find(item => item.id == id);

  // 表示場所
  const itemDetail = document.getElementById('item-detail');

  // HTML生成
  itemDetail.innerHTML = `
    <div class="item-image">
      <img src="${product.image}" alt="">
    </div>

    <div class="item-info">
      <h1>${product.title}</h1>
      <p>${product.price}</p>
      <p>${product.description}</p>
    </div>
  `;

});