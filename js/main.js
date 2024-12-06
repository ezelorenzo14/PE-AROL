document.addEventListener("DOMContentLoaded", () => {
  const cartItems = document.querySelector(".cart-items");
  const totalPriceEl = document.getElementById("total-price");
  let totalPrice = 0;

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
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
    });
  });
});

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
    timeRemainingElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

document.addEventListener("mousemove", resetInactivityTimer);
document.addEventListener("click", resetInactivityTimer);
document.addEventListener("keydown", resetInactivityTimer);

resetInactivityTimer();
