let cartData = [];

// QUANTITY VALIDATION

document.addEventListener("click", function(e){

    const plus = e.target.closest(".quantity-box .plus");
    const minus = e.target.closest(".quantity-box .minus");

    if(plus){

        const input = plus.parentElement.querySelector(".quantity-input");

        let value = parseInt(input.value) || 1;

        if(value < 10){
            input.value = value + 1;
        }

    }

    if(minus){

        const input = minus.parentElement.querySelector(".quantity-input");

        let value = parseInt(input.value) || 1;

        if(value > 1){
            input.value = value - 1;
        }

    }

});




    //    SLIDER SECTION   

    // Loop through each slider container on page
    document.querySelectorAll(".slider-container").forEach(container => {

        // Get slider track
        const slider = container.querySelector(".product-slider");

        // Get previous button
        const prevBtn = container.querySelector(".prev");

        // Get next button
        const nextBtn = container.querySelector(".next");

        // Get all product cards
        const cards = [...slider.children];

        // Get gap between cards from CSS
        const gap = parseInt(getComputedStyle(slider).gap) || 0;

        // Calculate one card width including gap
        const cardWidth = cards[0].offsetWidth + gap;

        // Store number of original cards
        const cloneCount = cards.length;



        // Clone cards for left side (reverse order)
        cards.slice().reverse().forEach(card => {
            slider.insertBefore(card.cloneNode(true), slider.firstChild);
        });

        // Clone cards for right side
        cards.forEach(card => {
            slider.appendChild(card.cloneNode(true));
        });

        // Set starting position (middle of slider)
        slider.scrollLeft = cardWidth * cloneCount;



        //    BUTTON NAVIGATION   

        // Next button click → scroll right
        nextBtn.addEventListener("click", () => {
            slider.scrollBy({
                left: cardWidth,
                behavior: "smooth"
            });
        });

        // Previous button click → scroll left
        prevBtn.addEventListener("click", () => {
            slider.scrollBy({
                left: -cardWidth,
                behavior: "smooth"
            });
        });



        //    DRAG FEATURE   

        let isDragging = false;        // check if user is dragging
        let startX = 0;               // starting mouse position
        let startScrollLeft = 0;      // starting scroll position

        // Mouse down → start drag
        slider.addEventListener("mousedown", (e) => {
            isDragging = true;
            slider.classList.add("dragging");

            startX = e.pageX;
            startScrollLeft = slider.scrollLeft;
        });

        // Mouse move → drag slider
        document.addEventListener("mousemove", (e) => {
            if (!isDragging) return;

            slider.scrollLeft =
                startScrollLeft - (e.pageX - startX);
        });

        // Mouse up → stop dragging
        document.addEventListener("mouseup", () => {
            isDragging = false;
            slider.classList.remove("dragging");
        });



        //    INFINITE LOOP   

        slider.addEventListener("scroll", () => {

            // Max scroll limit
            const maxScroll =
                cardWidth * (cards.length * 2);

            // If reached start → jump to middle
            if (slider.scrollLeft <= 0) {

                slider.classList.add("dragging");

                slider.scrollLeft += cardWidth * cards.length;

                slider.classList.remove("dragging");
            }

            // If reached end → jump back to middle
            if (slider.scrollLeft >= maxScroll) {

                slider.classList.add("dragging");

                slider.scrollLeft -= cardWidth * cards.length;

                slider.classList.remove("dragging");
            }
        });

    });



    //    ------WISHLIST TOGGLE----   

    // Listen for any click on page
    document.addEventListener("click", function (e) {

        // Check if clicked element is wishlist button
        const wishBtn = e.target.closest(".wish-btn");

        // If not wishlist button → stop
        if (!wishBtn) return;

        // Toggle active class (heart fill/empty)
        wishBtn.classList.toggle("active");

    });



    //    KEYBOARD NAVIGATION   

    // Listen for keyboard press
    document.addEventListener("keydown", (e) => {

        // Right arrow → next slide
        if (e.key === "ArrowRight") {
            document.querySelector(".next")?.click();
        }

        // Left arrow → previous slide
        if (e.key === "ArrowLeft") {
            document.querySelector(".prev")?.click();
        }

    });


//ADD to cart

   let count = 0;

const cartIcon = document.querySelector(".cart-icon");
const cartItems = document.getElementById("cartItems");

document.querySelectorAll(".product-card .cart-btn").forEach(button => {

    button.addEventListener("click", function() {

        const card = this.closest(".product-card");

        const image = card.querySelector("img").src;
        const title = card.querySelector("h3").textContent.trim();
        const newPrice = card.querySelector(".new-price").textContent;
        const quantity = Number(card.querySelector(".quantity-input").value);
        const priceNumber = parseInt(newPrice.replace(/[^0-9]/g, ""));

        cartIcon.style.display = "flex";

        if(cartItems.innerHTML.includes("No items added yet")){
            cartItems.innerHTML = "";
        }

        // check same product already exists
        const existingItem = [...document.querySelectorAll(".cart-item")]
        .find(item =>
            item.querySelector("h4").textContent === title
        );

        if(existingItem){

            const qtyElement = existingItem.querySelector(".qty-value");

            let currentQty = Number(qtyElement.textContent);

            let totalQty = currentQty + quantity;

                if(totalQty > 10){
                    totalQty = 10;
                }

                qtyElement.textContent = totalQty;
                const product = cartData.find(item => item.title === title);

                if(product){
                    product.quantity = totalQty;
                }

                updateTotal();

        }

        else{

            count++;
           cartData.push({
    title,
    price: priceNumber,
    quantity,
    image 
});
        localStorage.setItem("cart", JSON.stringify(cartData));

            document.getElementById("cartCount").textContent = count;

            cartItems.innerHTML += `
            <div class="cart-item">

                <img src="${image}" alt="${title}">

                <div class="cart-details">

                    <h4>${title}</h4>

                    <div class="price">
                        <span class="new-price">${newPrice}</span>
                    </div>

                    <div class="cart-footer">

                        <div class="cart-controls">

                            <button class="cart-qty-btn qty-minus">
                                <i class="fa fa-minus"></i>
                            </button>

                            <span class="qty-value">${quantity}</span>

                            <button class="cart-qty-btn qty-plus">
                                <i class="fa fa-plus"></i>
                            </button>

                        </div>

                        <button class="delete-btn">
                            <i class="fa fa-trash"></i>
                        </button>

                    </div>

                </div>

            </div>
            `;
            updateTotal();
        }

    });

});


cartIcon.addEventListener("click", () => {
    document.getElementById("cartPanel").classList.add("active");
});

document.getElementById("closeCart").addEventListener("click", () => {
    document.getElementById("cartPanel").classList.remove("active");
});


document.addEventListener("click", function(e){

    const plusBtn = e.target.closest(".qty-plus");
    const minusBtn = e.target.closest(".qty-minus");
    const deleteBtn = e.target.closest(".delete-btn");

    if(plusBtn){

        let qty = plusBtn.parentElement.querySelector(".qty-value");

        let current = Number(qty.textContent);

        if(current < 10){
          qty.textContent = current + 1;
          const title = plusBtn.closest(".cart-item").querySelector("h4").textContent;

            cartData.find(item=>item.title===title).quantity++;

            updateTotal();
}
        else{
          alert("Maximum quantity allowed is 10");
}   
    }

    if(minusBtn){

        let qty = minusBtn.parentElement.querySelector(".qty-value");

        let current = Number(qty.textContent);

        if(current > 1){
            qty.textContent = current - 1;
            const title = minusBtn.closest(".cart-item").querySelector("h4").textContent;

            cartData.find(item=>item.title===title).quantity--;

            updateTotal();
        }
    }

    if(deleteBtn){

        deleteBtn.closest(".cart-item").remove();
        const title = deleteBtn.closest(".cart-item").querySelector("h4").textContent;

        cartData = cartData.filter(item => item.title !== title);

        updateTotal();

        count--;

        if(count < 0){
            count = 0;
        }

        document.getElementById("cartCount").textContent = count;

        if(document.querySelectorAll(".cart-item").length === 0){

            cartItems.innerHTML = "<p>No items added yet</p>";
        }
    }

});

function updateTotal(){

    let total = 0;

    cartData.forEach(item=>{

        total += item.price * item.quantity;

    });

    document.getElementById("total-price").innerText = total;
}














