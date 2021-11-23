const cart = function () {
  const cartBtn = document.querySelector(".button-cart");
  const cart = document.getElementById("modal-cart");
  const closeModalBtn = cart.querySelector(".modal-close");

  // урок 4
  const goodsContainer = document.querySelector('.long-goods-list');
  // ---------

  // 4.6 теперь в самом модальном окне отрисовуем строчки товара
  const cartTable = document.querySelector('.cart-table__goods');
  // при открытии модального окна нужно отрисовать вёрстку на основании вот этого массива данных    localStorage.setItem('cart', JSON.stringify(cart))

  cartBtn.addEventListener("click", () => {
    // 4.6.1 рендер товара
    console.log('рендер товара');
    const cartArray = localStorage.getItem('cart') 
      ? JSON.parse(localStorage.getItem('cart')) 
      : []
    renderCartGood(cartArray)
    // ------------------
    cart.style.display = "flex";
  });

  closeModalBtn.addEventListener("click", function () {
    cart.style.display = "";
    // cartBtn.style.display = 'none';
  });

  // 4.1
  if (goodsContainer) {
    goodsContainer.addEventListener('click', (event) => {
      // console.log(event.target);
      // if (event.target.classList.contains('add-to-cart')) {
      //   console.log('кнопка');
      // }
      if (event.target.closest('.add-to-cart')) {
        // console.log('кнопка');
        const buttonToCart = event.target.closest('.add-to-cart');
        // console.log(buttonToCart);
        const goodDataId = buttonToCart.dataset.id; // получаем атрибут data-id кнопки

        addToCart(goodDataId);
      }
    })
  }

  // 4.2
  const addToCart = (id) => {
    // console.log(goodId);
    // при каждом клике получаем весь массив товаров
    const goods = JSON.parse(localStorage.getItem('goods'));
    // console.log(goods);
    // среди этого массива нужно найти кликнутую карточку
    const clickedGood = goods.find(good => good.id === id)
    // console.log(clickedGood);
    const cart = localStorage.getItem('cart') 
      ? JSON.parse(localStorage.getItem('cart')) 
      : []

    // console.log(cart);
    // console.log(clickedGood);

    // 4.3 добавляем товар в корзину или увеличиваем его кол-во, если такой товар есть уже вкорзине. Используем метод some(возвр true или false), а не метод find(возвр undefined)
    // console.log(cart.some(good => good.id === clickedGood.id));
    if (cart.some(good => good.id === clickedGood.id)) {
      console.log('Увеличить количество clickedGood');
      // 4.5
      cart.map(good => {
        if (good.id === clickedGood.id) {
          good.count += 1
        }
        return good
      })
    } else {
      console.log('Добавить в корзину');
      clickedGood.count = 1; // дописываем одно свойство count
      cart.push(clickedGood);
    }

    // 4.4 сохраняем новую корзинку в localStorage
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  // 4.6.2
  const renderCartGood = (goods) => {
    // console.log(goods);
    // перебираем массив и формируем верстку
    goods.forEach(good => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${good.name}</td>
        <td>${good.price}</td>
        <td><button class="cart-btn-minus"">-</button></td>
        <td>${good.count}</td>
        <td><button class=" cart-btn-plus"">+</button></td>
        <td>${+good.price * good.count}$</td>
        <td><button class="cart-btn-delete"">x</button></td>
      `
      // ${+good.price * good.count} - приводим результат к числу
      cartTable.append(tr);
    })
  }
};

cart();
