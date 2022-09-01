const btnToTop = document.querySelector('.scroll__up')
const percentScroller = document.querySelector(".percentage__scroller");
const modal = document.querySelector('.modal')
const closeModal = document.querySelector('.close__modal')
const subscribe = document.querySelector('.subscribe')

//BUTTON FOR BACK TO TOP
const toTop = () => {
  document.documentElement.scrollTo({
    behavior: "smooth",
    top: 0,
  });
}
const backToTop = () => setTimeout(toTop, 200)
btnToTop.addEventListener('click', backToTop)


//SCROLL PERCENTAGE
let scrollPercent;
document.addEventListener("scroll", () => {
  const pixels = scrollY;
  const docHeight = document.body.offsetHeight;
  const winHeight = innerHeight;
  scrollPercent = (pixels / (docHeight - winHeight)) * 100;
  percentScroller.style.width = scrollPercent + "%";
})

//MODAL
let modalShow = true
setTimeout(() => {
  if (localStorage.getItem("modalShown") !== "1") {
    modal.style.display = "block";
    localStorage.setItem("modalShown", "1");
  }
}, 5000);

const showModal = () => {
  modalShow = false
}

document.addEventListener("evt", showModal);

document.addEventListener("scroll", () => {
  if (localStorage.getItem("modalShown") !== "1" && scrollPercent >= 25) {
    modal.style.display = "block";
    localStorage.setItem("modalShown", "1");
  }
});
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});
subscribe.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    modal.style.display = "none";
  }
});