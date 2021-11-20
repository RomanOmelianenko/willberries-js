const getGoods = () => {
  const links = document.querySelectorAll(".navigation-link");

  // fetch("/db/db.json")
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data);
  //   });

  const getData = () => {
    // ПОЛУЧАЕМ С УДАЛЕННОГО СЕРВЕРА(firebase)
    fetch(
      "https://willberries-project-default-rtdb.europe-west1.firebasedatabase.app/db.json"
    )
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("goods", JSON.stringify(data));
      });
  };

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      getData();
    });
  });
};

getGoods();
