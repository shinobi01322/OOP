document.addEventListener("DOMContentLoaded", function () {

    // Product class to represent a product
    class Product {
      constructor(name, price) {
        this.name = name;
        this.price = price;
      }
    }
  
    // ShoppingCartItem class to represent a product in the cart with quantity
    class ShoppingCartItem {
      constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
      }
  
      // Get the total price for this item (price * quantity)
      getTotalPrice() {
        return this.product.price * this.quantity;
      }
  
      // Increase the quantity
      increaseQuantity() {
        this.quantity += 1;
      }
  
      // Decrease the quantity
      decreaseQuantity() {
        if (this.quantity > 0) {
          this.quantity -= 1;
        }
      }
    }
  
    // ShoppingCart class to manage cart items
    class ShoppingCart {
      constructor() {
        this.items = [];
      }
  
      // Add a product to the cart
      addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.product.name === product.name);
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          this.items.push(new ShoppingCartItem(product, quantity));
        }
      }
  
      // Remove a product from the cart by name
      removeItem(productName) {
        this.items = this.items.filter(item => item.product.name !== productName);
      }
  
      // Get the total price of all items in the cart
      getTotalPrice() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
      }
  
      // Display the cart on the DOM
      displayCart() {
        const totalPriceElement = document.querySelector(".total");
        totalPriceElement.innerText = this.getTotalPrice() + " $";
      }
  
      // Update the quantity of an item and re-render the cart
      updateQuantity(productName, action) {
        const item = this.items.find(item => item.product.name === productName);
        if (item) {
          if (action === "increase") {
            item.increaseQuantity();
          } else if (action === "decrease") {
            item.decreaseQuantity();
          }
          this.displayCart();
        }
      }
  
      // Remove an item from the cart and re-render the cart
      removeItemFromCart(productName) {
        this.removeItem(productName);
        this.displayCart();
      }
    }
  
    // Creating product instances
    const basket = new Product("Baskets", 100);
    const socks = new Product("Socks", 20);
    const bag = new Product("Bag", 50);
  
    // Initialize shopping cart
    const cart = new ShoppingCart();
  
    // Function to initialize event listeners for cart actions
    function initializeCartActions() {
      // Increase quantity for products
      document.querySelectorAll(".fa-plus-circle").forEach((btn, index) => {
        btn.addEventListener("click", function () {
          const productName = this.closest(".card-body").querySelector(".card-title").innerText;
          switch (productName) {
            case "Baskets":
              cart.updateQuantity("Baskets", "increase");
              break;
            case "Socks":
              cart.updateQuantity("Socks", "increase");
              break;
            case "Bag":
              cart.updateQuantity("Bag", "increase");
              break;
          }
          cart.displayCart();
        });
      });
  
      // Decrease quantity for products
      document.querySelectorAll(".fa-minus-circle").forEach((btn, index) => {
        btn.addEventListener("click", function () {
          const productName = this.closest(".card-body").querySelector(".card-title").innerText;
          switch (productName) {
            case "Baskets":
              cart.updateQuantity("Baskets", "decrease");
              break;
            case "Socks":
              cart.updateQuantity("Socks", "decrease");
              break;
            case "Bag":
              cart.updateQuantity("Bag", "decrease");
              break;
          }
          cart.displayCart();
        });
      });
  
      // Delete item from cart
      document.querySelectorAll(".fa-trash-alt").forEach((btn, index) => {
        btn.addEventListener("click", function () {
          const productName = this.closest(".card-body").querySelector(".card-title").innerText;
          cart.removeItemFromCart(productName);
        });
      });
  
      // Like item (toggle heart color)
      document.querySelectorAll(".fa-heart").forEach((btn) => {
        btn.addEventListener("click", function () {
          this.classList.toggle("text-danger");
        });
      });
    }
  
    // Add products to the cart initially
    cart.addItem(basket, 0);
    cart.addItem(socks, 0);
    cart.addItem(bag, 0);
  
    // Display the cart initially
    cart.displayCart();
  
    // Initialize event listeners for cart actions
    initializeCartActions();
  });
  