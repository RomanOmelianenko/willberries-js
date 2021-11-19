const cart = function () {
  // 1
  const cartBtn = document.querySelector(".button-cart");
  // console.dir(cartBtn);
  // 2 получаем доступ к модалке
  const cart = document.getElementById("modal-cart");
  // 3 закрываем модалку
  const closeModalBtn = cart.querySelector(".modal-close");

  // 1.1
  // cartBtn.onclick = function () {
  //   console.log("click");
  // };
  cartBtn.addEventListener("click", () => {
    // 2.1
    cart.style.display = "flex";
  });

  // 3.1
  closeModalBtn.addEventListener("click", function () {
    cart.style.display = "";
    // cartBtn.style.display = 'none';
  });
};

cart();
