const btnToTop = document.querySelector('.scroll__up')
const percentScroller = document.querySelector(".percentage__scroller");
const modal = document.querySelector('.modal')
const closeModal = document.querySelector('.close__modal')
const subscribe = document.querySelector('.subscribe')
const inputName = document.querySelector('#name')
const inputEmail = document.querySelector('#email')
const btnSubmit = document.querySelector('#btn__submit')
const btnHeader = document.querySelector('.header__button')
const navbar = document.querySelector('.navbar')

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
  if (inputName.value.length >= 2 && inputName.value.length <= 100){
    inputName.setAttribute("style", "  border-bottom: 1px solid var(--grey)");
    return true
  }else {
    inputName.setAttribute(
        "style",
        "border:1px solid red ; padding: 7px ; border-radius: 10px"
      )
    return false
  }
}
const validateEmail = () => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!inputEmail.value.match(regex)){
    inputEmail.setAttribute(
        "style",
        "border:1px solid red ; padding: 7px ; border-radius: 10px"
      );
      return false
  }else {
    inputEmail.setAttribute("style", "  border-bottom: 1px solid var(--grey)");
    return true
  }
}

inputName.addEventListener('input', validateNameLength);
inputEmail.addEventListener("input", validateEmail);


//FETCH

const submitForm = async (e) => {
  e.preventDefault()
  if(validateEmail() && validateNameLength()){
    try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts",{
      method: 'POST',
      headers: {
      "Content-type": "application/json"
      },
      body: JSON.stringify({name: inputName.value, email: inputEmail.value})
    })
    if (res.ok){
      const data = await res.json()
      console.log(data);
      alert('Gracias por subscribirte')
    }
  } catch (error) {
    console.log(error.message)
  }
  }else {
    alert('Rellena los campos correctamente')
  }
  
}

btnSubmit.addEventListener('click', submitForm)

//SLIDER

class SuperSlider {
  constructor(id) {
    this.container = document.getElementById(id);
    this.images = this.container.getElementsByClassName("slide__img");
    this.activeImg = this.images[0];
    this.activeIndex = 0;
    this.arrow = document.createElement("button");
    this.arrowRight = document.createElement("button");
    this.arrow.classList.add("slide__btn");
    this.arrowRight.classList.add("slide__btn--right", "slide__btn");
    this.arrow.textContent = "❮";
    this.arrowRight.textContent = "❯";
    this.dotsContainer = document.createElement("div");
    this.dotsContainer.classList.add("dotsContainer");

    this.container.appendChild(this.arrow);
    this.container.appendChild(this.arrowRight);
    this.container.appendChild(this.dotsContainer);
    this.dots();
    this.dots[0].classList.add("dot--active");
    this.activeDot = this.dots[0];

    setInterval(() => {
      this.nextImg();
    }, 2000);
    this.arrow.addEventListener("click", () => {
      this.prevImg();
    });
    this.arrowRight.addEventListener("click", () => {
      this.nextImg();
    });
  }

  dots() {
    this.dots = [];
    for (let i = 0; i < this.images.length; i++) {
      const dot = document.createElement("button");
      dot.classList.add("dot");
      this.dotsContainer.appendChild(dot);
      this.dots.push(dot);
    }
  }
  nextImg() {
    if (this.activeIndex >= this.images.length - 1) {
      this.showImg(0);
    } else {
      this.showImg(this.activeIndex + 1);
    }
  }

  prevImg() {
    if (this.activeIndex === 0) {
      this.showImg(this.images.length - 1);
    } else {
      this.showImg(this.activeIndex - 1);
    }
  }
  showImg(index) {
    this.activeImg.classList.remove("slide__img--active");
    this.images[index].classList.add("slide__img--active");
    this.activeDot.classList.remove("dot--active");
    this.dots[index].classList.add("dot--active");
    this.activeDot = this.dots[index];
    this.activeImg = this.images[index];
    this.activeIndex = index;
  }
}

const slider = new SuperSlider("slider");


//MENU
const showMenu = () => {
  navbar.classList.toggle('nav--visible')
}
btnHeader.addEventListener('click', showMenu)