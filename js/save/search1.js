const search = function () {
  // 4
  const input = document.querySelector(".search-block > input");
  const searchBtn = document.querySelector(".search-block > button");
  // console.log(searchBtn);

  // input.addEventListener("input", (event) => {
  //   console.log(event.target.value);
  // });
  searchBtn.addEventListener("click", (event) => {
    // console.log("event.target", event.target);
    console.log("inputValue:", input.value);
  });
};

search();
