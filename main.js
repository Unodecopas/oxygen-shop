const btnToTop = document.querySelector('.scroll__up')
const percentScroller = document.querySelector(".percentage__scroller");
const modal = document.querySelector('.modal')
const closeModal = document.querySelector('.close__modal')
const subscribe = document.querySelector('.subscribe')
const inputName = document.querySelector('#name')
const inputEmail = document.querySelector('#email')

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

//VALIDACION FORMULARIO
const validateNameLength = () => {
  if (inputName.value.length > 2 && inputName.value.length <= 100){
    inputName.setAttribute("style", "  border-bottom: 1px solid var(--grey)");
  }else {
    inputName.setAttribute(
        "style",
        "border:1px solid red ; padding: 7px ; border-radius: 10px"
      )
  }
}
const validateEmail = () => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!inputEmail.value.match(regex)){
    inputEmail.setAttribute(
        "style",
        "border:1px solid red ; padding: 7px ; border-radius: 10px"
      );
  }else {
    inputEmail.setAttribute("style", "  border-bottom: 1px solid var(--grey)");

  }
}

inputName.addEventListener('input', validateNameLength);
inputEmail.addEventListener("input", validateEmail);
