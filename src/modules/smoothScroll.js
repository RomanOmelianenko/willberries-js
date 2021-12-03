// Плавный скрол
const smoothScroll = () => {
  const links = document.querySelectorAll('.scroll-link');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      // нужно реализовать чтобы окно виндоу плавно прокрутился вверх
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    })
  })
}

export default smoothScroll;