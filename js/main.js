document.addEventListener("DOMContentLoaded", () => {
  const cartItems = document.querySelector(".cart-items");
  const totalPriceEl = document.getElementById("total-price");
  const productContainer = document.querySelector(".product-list");
  let totalPrice = 0;

  function fetchProducts() {
    return fetch("../productos.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los productos");
        }
        return response.json();
      })
      .then((data) => renderProducts(data))
      .catch((error) => console.error("Error:", error));
  }

  function renderProducts(products) {
    products.forEach((product) => {
      const productEl = document.createElement("div");
      productEl.classList.add("product");
      productEl.innerHTML = `
        <h3>${product.name}</h3>
        <p>Precio: $${product.price}</p>
        <button class="add-to-cart" data-name="${product.name}" data-price="${product.price}">Agregar al carrito</button>
      `;
      productContainer.appendChild(productEl);
    });

    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", addToCart);
    });
  }

  function addToCart(event) {
    const button = event.target;
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);

    const item = document.createElement("li");
    item.textContent = `${name} - $${price}`;
    cartItems.appendChild(item);

    totalPrice += price;
    totalPriceEl.textContent = totalPrice.toFixed(2);


    if (cartItems.children[0].textContent === "Tu carrito está vacío.") {
      cartItems.children[0].remove();
    }

    gsap.fromTo(
      item,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
  }

  let inactivityTimer;
  let countdownTimer;
  const inactivityLimit = 10 * 60 * 1000;
  let remainingTime = inactivityLimit / 1000;
  const timeRemainingElement = document.getElementById("time-remaining");

  function redirectToPreviousPage() {
    alert("Por inactividad, serás redirigido a la página anterior.");
    window.history.back();
  }

  function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    clearInterval(countdownTimer);
    remainingTime = inactivityLimit / 1000;
    updateCountdown();
    countdownTimer = setInterval(updateCountdown, 1000);
    inactivityTimer = setTimeout(redirectToPreviousPage, inactivityLimit);
  }

  function updateCountdown() {
    remainingTime--;
    if (remainingTime <= 0) {
      clearInterval(countdownTimer);
      return;
    }
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timeRemainingElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  document.addEventListener("mousemove", resetInactivityTimer);
  document.addEventListener("click", resetInactivityTimer);
  document.addEventListener("keydown", resetInactivityTimer);

  resetInactivityTimer();
  fetchProducts();
});
