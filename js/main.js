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
    productContainer.innerHTML = ""; 

    products.forEach((product) => {
      const productEl = document.createElement("div");
      productEl.classList.add("col-lg-4", "mb-4");

      productEl.innerHTML = `
        <div class="card bg-dark text-light border-warning h-100">
          <div class="card-body">
            <h2 class="card-title">${product.name}</h2>
            <p class="card-text">Precio: $${product.price}</p>
            <img src="${product.image}" alt="${product.description}" class="img-fluid mb-3">
            <button class="add-to-cart" data-name="${product.name}" data-price="${product.price}">Comprar Ahora</button>
          </div>
        </div>
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

    const product = { name, price };

 
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
  }


  function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.innerHTML = "";

    if (cart.length === 0) {
      cartItems.innerHTML = "<li>Tu carrito está vacío.</li>";
    } else {
      totalPrice = 0;
      cart.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price}`;
        cartItems.appendChild(li);
        totalPrice += item.price;
      });
    }

    totalPriceEl.textContent = totalPrice.toFixed(2);

    gsap.fromTo(
      cartItems.children,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
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
  renderCart(); 
});
