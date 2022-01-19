// toggler for user profile
const userProfileMenu = document.querySelector("#profile-menu");
const userMenuPhone = document.querySelector("#menu-on-phone");
const hamburgerMenu = document.querySelector("#hamburger-menu");
const profileSettings = document.querySelector("#prof-settings");
const closeIcon = document.querySelector("#close-menu-icon");
//<---const for Cart--->
const addToCart = document.querySelector("#add-to-cart");
const cartItemCount = document.querySelector(".count-item");

const cartHref = document.querySelector("#cart-href");

console.log(cartHref);

// <--toggler for user profile-->
try {
  userProfileMenu.addEventListener("click", () => {
    profileSettings.classList.toggle("toggle-user-menu");
  });
  // toggle for user on Phones
  hamburgerMenu.addEventListener("click", () => {
    menuToggler();
  });
  closeIcon.addEventListener("click", () => {
    menuToggler();
  });
} catch {}

// function for menu on mobile Phones
function menuToggler() {
  userMenuPhone.classList.toggle("toggle-user-menu");
  closeIcon.classList.toggle("close-icon-show");
  hamburgerMenu.classList.toggle("hamburger-hidden");
}
// <--End of toggler for user profile-->

//<---Cart--->
checkStorage();

window.addEventListener("storage", checkStorage, false);

try {
  addToCart.onclick = (event) => {
    let e = event.target.value;
    cartItem(e);
  };
} catch {}

function cartItem(_id) {
  if (sessionStorage.CartItem) {
    let items = JSON.parse(sessionStorage.CartItem);
    const isIn = items.filter((item) => {
      return item._id == _id;
    });
    console.log(isIn);
    if (isIn.length == 0) {
      const getProductId = [...items, { _id }];
      sessionStorage.setItem("CartItem", JSON.stringify(getProductId));
    }
  } else {
    sessionStorage.setItem("CartItem", JSON.stringify([{ _id }]));
  }
  checkStorage();
}

function checkStorage() {
  if (sessionStorage.CartItem) {
    const totalItem = JSON.parse(sessionStorage.CartItem);

    totalItemInCart(totalItem.length);

    try {
      const value = addToCart.value;
      totalItem.map((item) => {
        if (item._id.includes(value)) {
          addToCart.classList.add("added");
          addToCart.innerHTML = "Added";
        }
      });

    } catch {}
    return;
  }
  
  try {
    addToCart.classList.remove("added");
    addToCart.innerHTML = "Add Cart";
    cartItemCount.style.opacity = "0";
  } catch {}
}

function totalItemInCart(nubm) {
  cartItemCount.style.opacity = "1";
  cartItemCount.innerHTML = nubm;
}
//<--End of Cart-->

// // Cartigory menu
// const menu = document.querySelector('.cartigory-list-menu button');
// const cartigoryListWrapper = document.querySelector('.cartigory-list-wrapper');
// const home = document.querySelector('.home');
// const phone = document.querySelector('.phone');
// const computer = document.querySelector('.computer');
// const fashion = document.querySelector('.fashion');
// const accessorie = document.querySelector('.accessorie');
// const housing = document.querySelector('.housing');
// const game = document.querySelector('.game');
//
// //var for confirm password
// const password = document.querySelector('#password');
// const passwordconfirm = document.querySelector('#passwordconfirm');
// const signupButton = document.querySelector('.signup-button');

// home.addEventListener("click", () =>{
//     home.classList.toggle("list")
// });
// phone.addEventListener("click", () =>{
//     phone.classList.toggle("list")
// });
// computer.addEventListener("click", () =>{
//     computer.classList.toggle("list")
// });
// game.addEventListener("click", () =>{
//     game.classList.toggle("list")
// });
// accessorie.addEventListener("click", () =>{
//     accessorie.classList.toggle("list")
// });
// fashion.addEventListener("click", () =>{
//     fashion.classList.toggle("list")
// });
// housing.addEventListener("click", () =>{
//     housing.classList.toggle("list")
// });
// menu.addEventListener("click", () =>{
//     cartigoryListWrapper.classList.toggle("open");
// });
//
//
// // for the comfirm password
// signupButton.addEventListener("click", () =>{
//     if(password != passwordconfirm){
//         alert ("Password didn't match try again");
//         return false
//     }
//     else if(password == passwordconfirm){
//         return true
//     }
// });
