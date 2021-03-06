const getGoods = () => {
  const links = document.querySelectorAll(".navigation-link");
  const viewAllBtn = document.querySelector(".more");

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

  const getData = (value, category) => {
    // ПОЛУЧАЕМ С УДАЛЕННОГО СЕРВЕРА(firebase)
    const url = "https://willberries-project-default-rtdb.europe-west1.firebasedatabase.app/db.json"
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const array = category
          ? data.filter((item) => item[category] === value)
          : data;

        localStorage.setItem("goods", JSON.stringify(array));

        if (window.location.pathname !== "/goods.html") {
          (window.location.href = "/willberries-js/goods.html") // для удалённого сервера GitHub
          // (window.location.href = "/goods.html")  // для локального сервера
        } else {
          renderGoods(array);
        }
      });
  };

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const linkValue = link.textContent;
      const category = link.dataset.field;
      getData(linkValue, category);
    });
  });

  const renderData =
    localStorage.getItem("goods") && window.location.pathname === "/willberries-js/goods.html";

  if (renderData) {
    renderGoods(JSON.parse(localStorage.getItem("goods")));
  }

  // viewAllBtn
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', (event) => {
      event.preventDefault();
      getData();
    });
  };
};

export default getGoods;
