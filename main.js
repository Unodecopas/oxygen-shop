const btnToTop = document.querySelector('.scroll__up')


const toTop = () => {
  document.documentElement.scrollTo({
    behavior: "smooth",
    top: 0,
  });
}
const backToTop = () => setTimeout(toTop, 200)
btnToTop.addEventListener('click', backToTop)

