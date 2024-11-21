const productos = {
    camiseta: 4500, 
    canguro: 3000,
    pantalon: 2500,
    shorts: 1500,
    polo: 3500,
  };
  function esProductoValido(producto) {
    return productos.hasOwnProperty(producto);
  }
  let productoSeleccionado = prompt("Elige un producto: camiseta, canguro, pantalon, shorts o polo:").toLowerCase().trim();
  while (!esProductoValido(productoSeleccionado)) {
    productoSeleccionado = prompt("Producto no válido. Por favor elige: camiseta, canguro, pantalon, shorts o polo:").toLowerCase().trim();
  }
  let cantidad = parseInt(prompt("¿Cuántos deseas comprar?"), 10);
  while (isNaN(cantidad) || cantidad <= 0) {
    cantidad = parseInt(prompt("Cantidad no válida. Ingresa un número mayor a 0:"), 10);
  }
  let codigoDescuento = prompt("Ingresa un código de descuento si tienes uno:");
  function calcularTotal(producto, cantidad) {
    return productos[producto] * cantidad;
  }
  
  function aplicarDescuento(total, codigo) {
    const descuento = codigo === "PEÑAROL10" ? 0.10 : 0;
    return total - (total * descuento);
  }
  
  let totalCompra = calcularTotal(productoSeleccionado, cantidad);
  let totalFinal = aplicarDescuento(totalCompra, codigoDescuento);
  console.log("Resumen de tu compra:");
  console.log(`Producto: ${productoSeleccionado}`);
  console.log(`Cantidad: ${cantidad}`);
  console.log(`Total sin descuento: $${totalCompra}`);
  console.log(`Descuento aplicado: ${codigoDescuento === "PEÑAROL10" ? "10%" : "0%"}`);
  console.log(`Total a pagar: $${totalFinal.toFixed(2)}`);
  
  alert(`Gracias por tu compra. El total a pagar es $${totalFinal.toFixed(2)}`);
  