const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1399,
        image: "images/wireless headphones.png"
    },

    {
        id: 2,
        name: "Gaming Mouse",
        price: 499,
        image: "images/gaming mouse.png"
    },

    {
        id: 3,
        name: "Mechanical Keyboard",
        price: 1099,
        image: "images/mechanical keyboard.png"
    },

    {
        id: 4,
        name: "Smart Watch",
        price: 2099,
        image: "images/smart watch.png"
    },

    {
        id: 5,
        name: "USB-C Cable",
        price: 199,
        image: "images/usb c cable.png"
    },

    {
        id: 6,
        name: "Bluetooth Speaker",
        price: 999,
        image: "images/blutooth speaker.png"
    }
];


let cart = [];


/* =========================
   GET ELEMENTS
========================= */

const productContainer =
    document.getElementById("product-container");

const cartCount =
    document.getElementById("cart-count");

const search =
    document.getElementById("search");

const cartButton =
    document.getElementById("cart-button");

const cartOverlay =
    document.getElementById("cart-overlay");

const closeCart =
    document.getElementById("close-cart");

const cartItems =
    document.getElementById("cart-items");

const cartTotal =
    document.getElementById("cart-total");

const checkoutButton =
    document.getElementById("checkout-button");

const checkoutSection =
    document.getElementById("checkout-section");

const backToCart =
    document.getElementById("back-to-cart");

const checkoutForm =
    document.getElementById("checkout-form");

const checkoutTotal =
    document.getElementById("checkout-total");


/* =========================
   DISPLAY PRODUCTS
========================= */

function displayProducts(list) {

    productContainer.innerHTML = "";

    list.forEach(function(product) {

        const card =
            document.createElement("div");

        card.className = "product";


        card.innerHTML =
            '<img src="' +
            product.image +
            '" alt="' +
            product.name +
            '">' +

            '<h3>' +
            product.name +
            '</h3>' +

            '<p>₹' +
            product.price +
            '</p>' +

            '<button class="add-cart" onclick="addToCart(' +
            product.id +
            ')">' +

            'Add to Cart' +

            '</button>';


        productContainer.appendChild(card);
    });
}


/* =========================
   ADD TO CART
========================= */

function addToCart(productId) {

    const product =
        products.find(function(item) {

            return item.id === productId;
        });


    if (!product) {
        return;
    }


    const existing =
        cart.find(function(item) {

            return item.id === productId;
        });


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1

        });
    }


    updateCart();


    alert(
        product.name +
        " added to cart!"
    );
}


/* =========================
   UPDATE CART
========================= */

function updateCart() {

    updateCartCount();

    displayCart();

    updateCheckoutTotal();
}


/* =========================
   CART COUNT
========================= */

function updateCartCount() {

    let count = 0;


    cart.forEach(function(item) {

        count += item.quantity;
    });


    cartCount.textContent = count;
}


/* =========================
   DISPLAY CART
========================= */

function displayCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML =
            '<div class="empty-cart">' +
            '🛒' +
            '<br><br>' +
            'Your cart is empty.' +
            '<br><br>' +
            'Add some products!' +
            '</div>';


        cartTotal.textContent = "0";

        return;
    }


    let total = 0;


    cart.forEach(function(item) {

        const itemTotal =
            item.price *
            item.quantity;


        total += itemTotal;


        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML =

            '<img src="' +
            item.image +
            '" alt="' +
            item.name +
            '">' +

            '<div class="cart-item-info">' +

            '<h3>' +
            item.name +
            '</h3>' +

            '<div class="cart-item-price">' +
            '₹' +
            item.price +
            '</div>' +

            '<div class="quantity-controls">' +

            '<button onclick="decreaseQuantity(' +
            item.id +
            ')">' +
            '−' +
            '</button>' +

            '<span class="quantity">' +
            item.quantity +
            '</span>' +

            '<button onclick="increaseQuantity(' +
            item.id +
            ')">' +
            '+' +
            '</button>' +

            '</div>' +

            '</div>' +

            '<button class="remove-cart-item" ' +
            'onclick="removeFromCart(' +
            item.id +
            ')">' +

            '🗑️' +

            '</button>';


        cartItems.appendChild(cartItem);
    });


    cartTotal.textContent =
        total.toLocaleString("en-IN");
}


/* =========================
   INCREASE QUANTITY
========================= */

function increaseQuantity(productId) {

    const item =
        cart.find(function(item) {

            return item.id === productId;
        });


    if (item) {

        item.quantity++;

        updateCart();
    }
}


/* =========================
   DECREASE QUANTITY
========================= */

function decreaseQuantity(productId) {

    const item =
        cart.find(function(item) {

            return item.id === productId;
        });


    if (!item) {
        return;
    }


    item.quantity--;


    if (item.quantity <= 0) {

        cart =
            cart.filter(function(item) {

                return item.id !== productId;
            });
    }


    updateCart();
}


/* =========================
   REMOVE PRODUCT
========================= */

function removeFromCart(productId) {

    cart =
        cart.filter(function(item) {

            return item.id !== productId;
        });


    updateCart();
}


/* =========================
   CALCULATE TOTAL
========================= */

function getCartTotal() {

    let total = 0;


    cart.forEach(function(item) {

        total +=
            item.price *
            item.quantity;
    });


    return total;
}


/* =========================
   CHECKOUT TOTAL
========================= */

function updateCheckoutTotal() {

    checkoutTotal.textContent =
        getCartTotal()
            .toLocaleString("en-IN");
}


/* =========================
   OPEN CART
========================= */

cartButton.addEventListener(
    "click",
    function() {

        checkoutSection.classList.remove(
            "active"
        );

        cartItems.style.display =
            "block";

        document.querySelector(
            ".cart-footer"
        ).style.display =
            "block";


        displayCart();


        cartOverlay.classList.add(
            "active"
        );
    }
);


/* =========================
   CLOSE CART
========================= */

closeCart.addEventListener(
    "click",
    function() {

        cartOverlay.classList.remove(
            "active"
        );
    }
);


/* =========================
   CLOSE OUTSIDE
========================= */

cartOverlay.addEventListener(
    "click",
    function(event) {

        if (
            event.target === cartOverlay
        ) {

            cartOverlay.classList.remove(
                "active"
            );
        }
    }
);


/* =========================
   OPEN CHECKOUT
========================= */

checkoutButton.addEventListener(
    "click",
    function() {

        if (cart.length === 0) {

            alert(
                "Your cart is empty!"
            );

            return;
        }


        cartItems.style.display =
            "none";


        document.querySelector(
            ".cart-footer"
        ).style.display =
            "none";


        checkoutSection.classList.add(
            "active"
        );


        updateCheckoutTotal();
    }
);


/* =========================
   BACK TO CART
========================= */

backToCart.addEventListener(
    "click",
    function() {

        checkoutSection.classList.remove(
            "active"
        );


        cartItems.style.display =
            "block";


        document.querySelector(
            ".cart-footer"
        ).style.display =
            "block";


        displayCart();
    }
);


/* =========================
   SEARCH
========================= */

search.addEventListener(
    "input",
    function() {

        const text =
            search.value
                .toLowerCase()
                .trim();


        const filteredProducts =
            products.filter(
                function(product) {

                    return product.name
                        .toLowerCase()
                        .includes(text);
                }
            );


        displayProducts(
            filteredProducts
        );
    }
);


/* =========================
   PLACE ORDER
========================= */

checkoutForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        if (cart.length === 0) {

            alert(
                "Your cart is empty!"
            );

            return;
        }


        const name =
            document.getElementById(
                "customer-name"
            ).value.trim();


        const phone =
            document.getElementById(
                "customer-phone"
            ).value.trim();


        const address =
            document.getElementById(
                "customer-address"
            ).value.trim();


        const city =
            document.getElementById(
                "customer-city"
            ).value.trim();


        const pin =
            document.getElementById(
                "customer-pin"
            ).value.trim();


        const payment =
            document.querySelector(
                'input[name="payment"]:checked'
            ).value;


        if (
            name === "" ||
            phone === "" ||
            address === "" ||
            city === "" ||
            pin === ""
        ) {

            alert(
                "Please fill in all details."
            );

            return;
        }


        if (
            !/^[0-9]{10}$/.test(phone)
        ) {

            alert(
                "Please enter a valid 10-digit phone number."
            );

            return;
        }


        if (
            !/^[0-9]{6}$/.test(pin)
        ) {

            alert(
                "Please enter a valid 6-digit PIN code."
            );

            return;
        }


        if (payment === "online") {

            alert(
                "Online payment will be connected later."
            );

            return;
        }


        const orderTotal =
            getCartTotal();


        alert(
            "Order placed successfully! 🎉\n\n" +
            "Customer: " +
            name +
            "\n" +
            "Total: ₹" +
            orderTotal.toLocaleString("en-IN") +
            "\n" +
            "Payment: Cash on Delivery"
        );


        cart = [];


        checkoutForm.reset();


        checkoutSection.classList.remove(
            "active"
        );


        cartItems.style.display =
            "block";


        document.querySelector(
            ".cart-footer"
        ).style.display =
            "block";


        updateCart();


        cartOverlay.classList.remove(
            "active"
        );
    }
);


/* =========================
   START WEBSITE
========================= */

displayProducts(products);

updateCart();