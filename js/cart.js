const cart = function () {
  const cartBtn = document.querySelector(".button-cart");
  const cart = document.getElementById("modal-cart");
  const closeModalBtn = cart.querySelector(".modal-close");

  cartBtn.addEventListener("click", () => {
    cart.style.display = "flex";
  });

  closeModalBtn.addEventListener("click", function () {
    cart.style.display = "";
    // cartBtn.style.display = 'none';
  });
};

cart();
