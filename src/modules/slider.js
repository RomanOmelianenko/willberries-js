import Swiper, { Navigation, Pagination, Autoplay } from 'swiper'; 

Swiper.use([Navigation, Pagination, Autoplay]);

const slider = () => {
  // экзкмпляр класса Swiper
  const swiper = new Swiper('.swiper-container', //передаём класс из index.html (77 срока)
  {      //передаём обьукт настроек из документации swiper       
    loop: true,    // добавляем клик по кругу
    autoplay: {    //добавляем автопрокрутку
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".slider-button-next",
      prevEl: ".slider-button-prev",
    },
  }); 
}

export default slider;