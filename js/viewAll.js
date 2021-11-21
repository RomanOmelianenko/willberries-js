const getViewAll = () => {
  const viewAllBtn = document.querySelector('.more');

  const renderGoods = (goods) => {
    const goodsContainer = document.querySelector(".long-goods-list");
    goodsContainer.innerHTML = "";

    goods.forEach((good) => {
      const goodBlock = document.createElement("div");
      goodBlock.classList.add("col-lg-3");
      goodBlock.classList.add("col-sm-6");
      goodBlock.innerHTML = `
        <div class="goods-card">
          <span class="label ${good.label ? null : "d-none"}">${
        good.label
      }</span>
          <img src="db/${good.img}" alt="${good.name}" class="goods-image">
          <h3 class="goods-title">${good.name}</h3>
          <p class="goods-description">${good.description}</p>
          <button class="button goods-card-btn add-to-cart" data-id="${
            good.id
          }">
            <span class="button-price">$${good.price}</span>
          </button>
        </div>
      `;

      goodsContainer.append(goodBlock);

      // console.log(goodBlock);
    });
  };

  const getData = () => {
    const url = "https://willberries-project-default-rtdb.europe-west1.firebasedatabase.app/db.json"
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        
        localStorage.setItem("goods", JSON.stringify(data));

        if (window.location.pathname !== "/goods.html") {
          window.location.href = "/goods.html";
        } else {
          renderGoods(data);
        }
      });
  };

  const renderData =
    localStorage.getItem("goods") && window.location.pathname === "/goods.html";
    if (renderData) {
      renderGoods(JSON.parse(localStorage.getItem("goods")));
    }

    try {
      viewAllBtn.addEventListener('click', (event) => {
        event.preventDefault();
        getData();
      })
    } catch(e) {
      console.error(e.message);
      console.error("Не получается исправить ошибку. Help me, please)")
    }
}

getViewAll();