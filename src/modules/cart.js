const cart = function () {
  const cartBtn = document.querySelector(".button-cart");
  const cart = document.getElementById("modal-cart");
  const closeModalBtn = cart.querySelector(".modal-close");
  const goodsContainer = document.querySelector('.long-goods-list');
  const cartTable = document.querySelector('.cart-table__goods');

  const modalForm = document.querySelector('.modal-form');
  modalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // console.log('submit');
    sendForm()
  })

  cartBtn.addEventListener("click", () => {
    // console.log('рендер товара');
    const cartArray = localStorage.getItem('cart') 
      ? JSON.parse(localStorage.getItem('cart')) 
      : []
    renderCartGood(cartArray)

    cart.style.display = "flex";
  });

  closeModalBtn.addEventListener("click", function () {
    cart.style.display = "";
  });

  cart.addEventListener('click', (event) => {
    if (!event.target.closest('modal') && event.target.classList.contains('overlay')) {
      cart.style.display = ''
    }
  })
 
  if (goodsContainer) {
    goodsContainer.addEventListener('click', (event) => {
 
      if (event.target.closest('.add-to-cart')) {
        const buttonToCart = event.target.closest('.add-to-cart');
        const goodDataId = buttonToCart.dataset.id;

        addToCart(goodDataId);
      }
    })
  }

  const addToCart = (id) => {
  
    const goods = JSON.parse(localStorage.getItem('goods'));
  
    const clickedGood = goods.find(good => good.id === id)
    
    const cart = localStorage.getItem('cart') 
      ? JSON.parse(localStorage.getItem('cart')) 
      : []

    if (cart.some(good => good.id === clickedGood.id)) {
      // console.log('Увеличить количество clickedGood');
      
      cart.map(good => {
        if (good.id === clickedGood.id) {
          good.count += 1
        }
        return good
      })
    } else {
      // console.log('Добавить в корзину');
      clickedGood.count = 1; 
      cart.push(clickedGood);
    }

    localStorage.setItem('cart', JSON.stringify(cart))
  }

  const renderCartGood = (goods) => {
  
    cartTable.innerHTML = '';
  
    goods.forEach(good => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${good.name}</td>
        <td>${good.price}</td>
        <td><button class="cart-btn-minus"">-</button></td>
        <td>${good.count}</td>
        <td><button class=" cart-btn-plus"">+</button></td>
        <td>${+good.price * +good.count}$</td>
        <td><button class="cart-btn-delete"">x</button></td>
      `
      cartTable.append(tr);

      //уменьшение, добавление и удаление товаров в корзине
      tr.addEventListener('click', (event) => {     
        if (event.target.classList.contains('cart-btn-minus')) {
          // console.log('минус');
          minusCartItem(good.id)
        } else if (event.target.classList.contains('cart-btn-plus')) {
          // console.log('плюс');
          plusCartItem(good.id)
        } else if (event.target.classList.contains('cart-btn-delete')) {
          // console.log('удалён');
          deleteCartItem(good.id)
        }
      })
    })
  }

  const deleteCartItem = (id) => {
    
    const cart = JSON.parse(localStorage.getItem('cart'))
    const newCart = cart.filter(good => {
      return good.id !== id
    }) 
    
    localStorage.setItem('cart', JSON.stringify(newCart))
    
    renderCartGood(JSON.parse(localStorage.getItem('cart')))
  }

  const plusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    const newCart = cart.map(good => {
      if (good.id === id) {
        good.count += 1
      }
      return good
    })
    localStorage.setItem('cart', JSON.stringify(newCart))
    renderCartGood(JSON.parse(localStorage.getItem('cart')))
  }

  const minusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    const newCart = cart.map(good => {
      if (good.id === id) {
        
        if (good.count > 0) {
          good.count -= 1
        }
      }
      return good
    })
    localStorage.setItem('cart', JSON.stringify(newCart))
    renderCartGood(JSON.parse(localStorage.getItem('cart')))
  }

  const sendForm = () => {
    const cartArray = localStorage.getItem('cart') 
      ? JSON.parse(localStorage.getItem('cart')) 
      : []
    // Обращаемся к тестовому API
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        cart: cartArray,
        name: '',
        phone: ''
      })
    }).then(() => {
      cart.style.display = ''
    })
  }
};

export default cart;
