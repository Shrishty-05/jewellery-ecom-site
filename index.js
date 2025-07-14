

// for cart items updation
function initNavBar() {
    const cart = document.getElementById("nav-cart");
    const cart_btns = document.querySelectorAll(".cart-btn");
    let cartAmount = document.getElementById("cart-amount");

    const overlay = document.querySelector(".overlay");
    const cartItems = document.getElementById("cart-items");

    let count = parseInt(localStorage.getItem("cartAmount")) || 0;
    let stored_in_cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    cartAmount.innerHTML = `(${count})`;
    renderCartItems(stored_in_cart);


    // cart button logic
    cart_btns.forEach((btn) => {
        btn.addEventListener("click", () => {

            const product = btn.closest(".product-card");

            const productData = {
                name: product.querySelector(".product-name").innerText,
                img: product.querySelector(".product-img").src,
                price: product.querySelector(".price").innerText
            }
            console.log("Product Data:", productData);
            stored_in_cart.push(productData);
            console.log("Stored In Cart:", stored_in_cart);

            count++;
            localStorage.setItem("cartItems", JSON.stringify(stored_in_cart));
            localStorage.setItem("cartAmount", count);

            cartAmount.innerHTML = `(${count})`;
            btn.innerText = "Added✔️";

            // dynamically update cart list 
            renderCartItems(stored_in_cart);


        });

    });

    // cart modal 
    const cart_modal = document.getElementById("cart-modal");
    const close_cart_btn = document.getElementById("close-modal");

    // open cart 
    const openCart = () => {
        cart_modal.classList.remove("cart-hidden");
        overlay.classList.remove("hidden");
        renderCartItems(stored_in_cart);
    }

    // close cart 
    const closeCart = () => {
        cart_modal.classList.add("cart-hidden");
        overlay.classList.add("hidden");
    }

    cart.addEventListener("click", openCart);
    close_cart_btn.addEventListener("click", closeCart);
    overlay.addEventListener("click", closeCart);

    // clear cart
    const clearCart = document.getElementById("clear-cart");

    //update cart even on reload and update local storage
    clearCart.addEventListener("click", () => {

        stored_in_cart = [];
        // cartItems.innerHTML = "";

        count = 0;
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("cartAmount", count);

        cartAmount.innerHTML = `(${count})`;
       
        // button updation on clear cart 
        cart_btns.forEach((btn) => {
            btn.innerText = "Add to bag";
        })

        renderCartItems(stored_in_cart);
    });

    // form open
    let loginLinks = document.querySelectorAll(".login-link");
    const login_form = document.getElementById("login-form");

    loginLinks.forEach((login) => {

        login.addEventListener("click", () => {
            login_form.classList.remove("hidden");
            overlay.classList.remove("hidden");
        });
    });

    const close_form_btn = document.getElementById("close-form-btn");

    close_form_btn.addEventListener("click", () => {
        login_form.classList.add("hidden");
        overlay.classList.add("hidden");
    })

    overlay.addEventListener("click", () => {
        signup_form.classList.add("hidden");
        login_form.classList.add("hidden");
        overlay.classList.add("hidden");
    })

    // signup form open
    const signup = document.getElementById("signup");
    const signup_form = document.getElementById("signup-form");
    const close_signup_form = document.getElementById("close-signup-form-btn");

    close_signup_form.addEventListener("click", () => {
        signup_form.classList.add("hidden");
        overlay.classList.add("hidden");
    })

    signup.addEventListener("click", () => {
        login_form.classList.add("hidden");
        signup_form.classList.remove("hidden");
    });


    // form validation
    login_form.addEventListener("submit", validateForm);
    signup_form.addEventListener("submit", validateForm);

}

// render cart items 
function renderCartItems(items) {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    if (items.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty 🛒</p>";
        return;
    }

    items.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
      <div class="cart-item">
      <img src="${item.img}" width="60" id="img-in-cart">
        <h4 id="name-in-cart">${item.name}</h4>
        <p id="price-in-cart">${item.price}</p>
      </div>`
            ;

        cartItemsContainer.appendChild(div);
    });
}


// sidebar 
function openSidebar() {
    document.getElementById("Sidebar").classList.add("show");
}

function closeSidebar() {
    document.getElementById("Sidebar").classList.remove("show");
}

// function openLoginForm() {
//     login_form.classList.remove("hidden");
//      overlay.classList.remove("hidden");
// }

// function closeLoginForm() {
//      login_form.classList.add("hidden");
//      overlay.classList.add("hidden");
// }

const validateForm = (e) => {
    e.preventDefault();

    // getting values 
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();

    let password = document.getElementById("password").value.trim();
    let sg_name = document.getElementById("sg-name").value.trim();
    let sg_email = document.getElementById("sg-email").value.trim();

    // get errors
    let nameError = document.getElementById("nameError");
    let emailError = document.getElementById("emailError");
    let phoneError = document.getElementById("phoneError");
    let sgPassError = document.getElementById("sg-passError");
    let sgEmailError = document.getElementById("sg-emailError");
    let sgNameError = document.getElementById("sg-nameError");

    // reset values of error;
    nameError.innerHTML = "";
    emailError.innerHTML = "";
    phoneError.innerHTML = "";
    sgPassError.innerHTML = "";
    sgEmailError.innerHTML = "";
    sgNameError.innerHTML = "";

    // state of validation
    var isValid = true;

    // check for validation 
    if (name === "") {
        nameError.innerText = "*Enter a valid name!";
        isValid = false;
    }

    if (sg_name === "") {
        sgNameError.innerText = "*Enter a valid name!";
        isValid = false;
    }

    const emailPattern = /^\S+@\S+\.\S+$/;

    if (!emailPattern.test(email)) {
        emailError.innerText = "*Enter a valid email id!";
        isValid = false;
    }

    if (!emailPattern.test(sg_email)) {
        sgEmailError.innerText = "*Enter a valid email id!";
        isValid = false;
    }

    const phonePattern = /^\d{10}$/;

    if (!phonePattern.test(phone)) {
        phoneError.innerText = "*Enter a valid phone number!";
        isValid = false;
    }

    if(password.length < 6){
        sgPassError.innerText = "Password must contain minimum 6 characters";
        isValid = false;
    }

    // if all the details are valid , proceed the submission
    if (isValid) {
        alert("Form submitted successfully!");
        login_form.reset();
        signup_form.reset();
    }
};


