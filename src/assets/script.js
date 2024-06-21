// Define an array of product objects, each representing a product in the store
const products = [
  {
    name: "Cherry",
    price: 2,
    quantity: 0,
    productId: 1,
    image: "./images/cherry.jpg",
  },
  {
    name: "Orange",
    price: 3,
    quantity: 0,
    productId: 2,
    image: "./images/orange.jpg",
  },
  {
    name: "Strawberry",
    price: 1.5,
    quantity: 0,
    productId: 3,
    image: "./images/strawberry.jpg",
  },
];

// Declare an empty array named cart to hold the items in the cart
const cart = [];

// Helper function to find a product by its productId in the products array
// - productId: The ID of the product to find
// - Returns the product object with the matching productId, or undefined if not found
function findProductById(productId) {
  return products.find((product) => product.productId === productId);
}

// Helper function to find a product in the cart by its productId
// - productId: The ID of the product to find in the cart
// - Returns the product object in the cart with the matching productId, or undefined if not found
function findProductInCart(productId) {
  return cart.find((product) => product.productId === productId);
}

// Function to add a product to the cart
// - productId: The ID of the product to add to the cart
// - Increases the product's quantity if it's already in the cart
// - Adds the product to the cart if it's not already there, and sets its quantity to 1
function addProductToCart(productId) {
  // Find the product in the products array by its ID
  const product = findProductById(productId);
  if (!product) return; // If the product is not found, do nothing

  // Check if the product is already in the cart
  const cartProduct = findProductInCart(productId);
  if (cartProduct) {
    // If the product is in the cart, increase its quantity
    cartProduct.quantity += 1;
  } else {
    // If the product is not in the cart, add it to the cart and set its quantity to 1
    product.quantity = 1;
    cart.push(product);
  }
}

// Function to increase the quantity of a product in the cart
// - productId: The ID of the product to increase the quantity of
function increaseQuantity(productId) {
  // Find the product in the cart by its ID
  const cartProduct = findProductInCart(productId);
  if (cartProduct) {
    // If the product is in the cart, increase its quantity
    cartProduct.quantity += 1;
  }
}

// Function to decrease the quantity of a product in the cart
// - productId: The ID of the product to decrease the quantity of
// - If the quantity decreases to 0, the product is removed from the cart
function decreaseQuantity(productId) {
  // Find the product in the cart by its ID
  const cartProduct = findProductInCart(productId);
  if (cartProduct) {
    // If the product is in the cart, decrease its quantity
    cartProduct.quantity -= 1;
    // If the product quantity reaches 0, remove it from the cart
    if (cartProduct.quantity === 0) {
      removeProductFromCart(productId);
    }
  }
}

// Function to remove a product from the cart
// - productId: The ID of the product to remove from the cart
// - Sets the product's quantity to 0 before removing it from the cart
function removeProductFromCart(productId) {
  // Find the index of the product in the cart by its ID
  const cartProductIndex = cart.findIndex((product) => product.productId === productId);
  if (cartProductIndex !== -1) {
    // If the product is in the cart, set its quantity to 0
    const product = cart[cartProductIndex];
    product.quantity = 0;
    // Remove the product from the cart array
    cart.splice(cartProductIndex, 1);
  }
}

// Function to calculate the total cost of the items in the cart
// - No parameters
// - Iterates through the cart to get the total of all products
// - Returns the sum of the products in the cart
function cartTotal() {
  // Reduce the cart array to get the total price of all products
  return cart.reduce((total, product) => total + product.price * product.quantity, 0);
}

// Function to empty the cart
// - No parameters
// - Sets the length of the cart array to 0, effectively emptying the cart
function emptyCart() {
  cart.length = 0;
}

// Variable to hold the balance amount
let balance = 0;

// Function to handle payment
// - amount: The amount of money given for the payment
// - Returns a negative number if there is a remaining balance
// - Returns a positive number if money should be returned to the customer
function pay(amount) {
  // Add the amount to the current balance
  balance += amount;
  // Calculate the total cost of the items in the cart
  const total = cartTotal();
  // Calculate the difference between the balance and the total cost
  const difference = balance - total;
  if (difference >= 0) {
    // If the balance is sufficient, reset the balance and empty the cart
    balance = 0;
    emptyCart();
  }
  // Return the difference, which can be negative (remaining balance) or positive (change to be returned)
  return difference;
}

// Export the functions and arrays for testing purposes
module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay,
  emptyCart,
  // Uncomment the following line if completing the currency converter bonus
  // currency
};
