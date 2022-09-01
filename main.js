const btnToTop = document.querySelector('.scroll__up')
const percentScroller = document.querySelector(".percentage__scroller");


const toTop = () => {
  document.documentElement.scrollTo({
    behavior: "smooth",
    top: 0,
  });
}
const backToTop = () => setTimeout(toTop, 200)
btnToTop.addEventListener('click', backToTop)


let scrollPercent;
document.addEventListener("scroll", () => {
  const pixels = scrollY;
  const docHeight = document.body.offsetHeight;
  const winHeight = innerHeight;
  scrollPercent = (pixels / (docHeight - winHeight)) * 100;
  percentScroller.style.width = scrollPercent + "%";
  console.log(scrollPercent)
});