const cartRoot = document.querySelector("#root");

cartItemLoop();

window.addEventListener("storage", cartItemLoop, false);

function timeout(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function cartItemLoop() {
  if (sessionStorage.CartItem) {
    const store = JSON.parse(sessionStorage.CartItem);
    for (i = 0; i < store.length; i++) {
      getData(JSON.stringify(store[i])), timeout(5000);
    }
  } else {
    cartRoot.innerHTML = `${store}` ;
    cartItemCount.style.opacity = "0";
  }
}

async function getData(e) {

  const cartItem = await fetchData(`http://localhost:5500/data/${e}`).then(
    (data) => data
  );
  cartRoot.innerHTML += `${cartItem}`;
}

async function fetchData(url = "") {
  const res = await fetch(url, {
    method: "GET",
  });
  return res.text();
}
