 //Order-details 
 //Order-details
 //Order-details
    //DropDown


const dropdownBtn = document.querySelector(".dropdown-btn");
const orderDropdown = document.querySelector(".order-dropdown");

// Dropdown Open/Close
dropdownBtn.addEventListener("click", function (e) {
    e.preventDefault();
    orderDropdown.classList.toggle("open");
});

const sidebarLinks = document.querySelectorAll(".sidebar-item > a");

sidebarLinks.forEach(link => {

    link.addEventListener("click", function () {

        if (!this.classList.contains("dropdown-btn")) {

            orderDropdown.classList.remove("open");

        }

    });

});









//WishlistPanel


const wishlistPanel = document.getElementById("wishlistPanel");

function openWishlist(){

    wishlistPanel.classList.add("active");

    loadWishlist();

}

function closeWishlist(){

    wishlistPanel.classList.remove("active");

}

function loadWishlist(){

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    let wishlistItems = document.getElementById("wishlistItems");

    wishlistItems.innerHTML = "";

    if(wishlist.length === 0){

        wishlistItems.innerHTML = `
        <div class="empty-wishlist">

            <i class="fa fa-heart-o"></i>

            <h3>Your Wishlist is Empty</h3>

            <p>Add products to your wishlist.</p>

        </div>
        `;

        return;
    }

    wishlist.forEach(function(product,index){

        wishlistItems.innerHTML += `

        <div class="wishlist-card">

            <img src="${product.image}" class="wishlist-img">

            <div class="wishlist-info">

                <h4>${product.name}</h4>

                <p>${product.price}</p>

           

            <button class="buy-btn"
            onclick='buyNow(
            ${JSON.stringify(product)}
            )'>
            Buy Now
        </button>
            <button class="remove-btn"
            onclick="removeWishlist(${index})">

            <i class="fa fa-trash"></i>

            </button>
 </div>
        </div>

        `;

    });

}

function removeWishlist(index){

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    wishlist.splice(index,1);

    localStorage.setItem("wishlist",JSON.stringify(wishlist));

    loadWishlist();

}
function buyNow(product){

    product.quantity = 1;

    localStorage.setItem("checkoutProduct", JSON.stringify(product));


    window.location.href = "checkout.html";
}

















//Active-Orders
//Active-orders




//Track-btn


const trackBtn = document.querySelector(".track-btn");

if(trackBtn){

    trackBtn.addEventListener("click",function(){

       window.location.href = "track-order.html";


    });

}






//Cancel-btn

const cancelBtn=document.querySelector(".cancel-btn");

if(cancelBtn){

cancelBtn.addEventListener("click",function(){

    if(confirm("Do you want to cancel this order?\n\nClick OK to cancel or Cancel to keep your order.")){

        let order = JSON.parse(localStorage.getItem("activeOrder"));

        order.status = "Cancelled";

      let cancelledOrders = 
JSON.parse(localStorage.getItem("cancelledOrders")) || [];



cancelledOrders.push(order);


if(cancelledOrders.length > 3){
    cancelledOrders.shift();
}


localStorage.setItem(
    "cancelledOrders",
    JSON.stringify(cancelledOrders)
);

        localStorage.removeItem("activeOrder");

        alert("Order Cancelled Successfully");

        window.location.href="cancelled.html";

    }

});
}



//Active Product


let order = JSON.parse(localStorage.getItem("activeOrder"));

if(order){

    document.getElementById("paymentMethod").innerText = order.paymentMethod;
    document.getElementById("orderId").innerText = order.orderId;
    document.getElementById("orderDate").innerText = order.orderDate;
    document.getElementById("orderStatus").innerText = order.status;

    document.querySelector(".order-heading span").innerText = order.orderId;

    document.getElementById("customerName").innerText =
        order.shipping.firstName + " " + order.shipping.lastName;

    document.getElementById("customerMobile").innerText =
        order.shipping.mobile;

  

    document.getElementById("customerAddress").innerText =
        order.shipping.house + ", " +
        order.shipping.city + ", " +
        order.shipping.state + ", " +
        order.shipping.country + " - " +
        order.shipping.pin;

    document.getElementById("subtotal").innerText = "₹" + order.subtotal;
    document.getElementById("tax").innerText = "₹" + order.tax;
    document.getElementById("discount").innerText = "-₹" + order.discount;
    document.getElementById("total").innerText = "₹" + order.total;

    let productContainer = document.getElementById("orderProducts");

    productContainer.innerHTML = "";

    order.products.forEach(product=>{

        productContainer.innerHTML += `

        <div class="checkout-item">

            <img src="${product.image}" class="item-img">

            <div class="item-right">

                <h4>${product.title || product.name}</h4>

                
                <div class="item-bottom">
                    <span class="item-qty">
                        Qty : ${product.quantity}
                    </span>

                    <span class="item-price">
                        ₹${product.price}
                    </span>
                </div>

            </div>

        </div>

        `;

    });

}
else{

    alert("No Active Order Found");

}





















//CANCELLED-ORDER
//CANCELLED-ORDER
//CANCELLED-ORDER







document.addEventListener("DOMContentLoaded", function () {

    let orders = JSON.parse(localStorage.getItem("cancelledOrders")) || [];

    let container = document.querySelector(".cancelled-container");


    if (orders.length === 0) {

        container.innerHTML = `
        <div class="empty-order">
            <h3>No Cancelled Orders</h3>
            <p>You have no cancelled orders.</p>
        </div>
        `;

        return;

    }


    container.innerHTML = orders.map(order => `


            <div class="order-details">

                <h3>Order ID : ${order.orderId}</h3>

                <p>Date : ${order.orderDate}</p>

                <p>
                    Status :
                    <span class="cancelled">
                        ${order.status}
                    </span>
                </p>


                <h4>Products</h4>


                ${order.products.map(product => `

                <div class="cancel-product">

                    <img src="${product.image}" class="cancel-product-img">


                    <div class="cancel-product-info">

                         <h4>${product.title || product.name}</h4>

                <p>Qty : ${product.quantity}</p>

                <p>${product.price}</p>

                    </div>

                </div>


                `).join("")}


                <p>Total : ₹${order.total}</p>


            </div>



    `).join("");


});

















//COMPLETED-ORDERS
//COMPLETED-ORDERS
//COMPLETED-ORDERS



let completedOrders =
JSON.parse(localStorage.getItem("completedOrders")) || [];

let container =
document.querySelector(".completed-container");

if(completedOrders.length === 0){

    container.innerHTML = `
        <div class="empty-order">
            <h3>No Completed Orders</h3>
            <p>You have no completed orders.</p>
        </div>
    `;

}
else{

    container.innerHTML = "";

    completedOrders.slice().reverse().forEach(function(order){

        container.innerHTML += `


            <div class="order-details">

                <h3>Order ID : ${order.orderId}</h3>

                <p>Date : ${order.orderDate}</p>

                <p>Status :
                    <span class="completed">
                        ${order.status}
                    </span>
                </p>

                ${order.products.map(product=>`

                    <div class="product-item">

                        <img src="${product.image}" width="80">

                        <div class="item-right">

                <h4>${product.title || product.name}</h4>

                
                <div class="item-bottom">
                    <span class="item-qty">
                        Qty : ${product.quantity}
                    </span>

                    <span class="item-price">
                        ₹${product.price}
                    </span>
                </div>

            </div>


                    </div>

                `).join("")}

                <h4>Total : ₹${order.total}</h4>

            </div>


        `;

    });
 
}
















//ADDRESSES
//ADDRESSES
//ADDRESSES



let addresses = JSON.parse(localStorage.getItem("addresses")) || [];

let container = document.getElementById("addressContainer");

console.log(addresses);
console.log(container);

container.innerHTML = "";

if(addresses.length === 0){

    container.innerHTML = `
        <h2>No Saved Addresses</h2>
    `;

}else{

    addresses.forEach(function(address,index){
console.log(address);
        container.innerHTML += `

        <div class="address-card">

            <div class="address-left">

                <div class="address-icon">
                    <i class="fa fa-home"></i>
                </div>

                <div class="address-details">

                    <div class="title-row">

                        <h3>Address ${index+1}</h3>


                    </div>

                    <p>
                        <i class="fa fa-user-o"></i>

                        ${address.firstName}
                        ${address.lastName}

                    </p>

                    <p>

                        <i class="fa fa-phone"></i>

                        ${address.mobile}

                    </p>

                    <p>

                        <i class="fa fa-map-marker"></i>

                        ${address.house},
                        ${address.city},
                        ${address.state},
                        ${address.country}
                        -
                        ${address.pin}

                    </p>
                </div>

            </div>

        </div>

        `;

    });

}
















//TRACK-ORDERS
//TRACK-ORDERS
//TRACK-ORDERS


/* ================================
   TRACK ORDER
================================ */

let order = JSON.parse(localStorage.getItem("activeOrder"));

if(order){

    // Order Details
    document.getElementById("trackOrderId").innerText = order.orderId;

    // Fake Tracking Details
    document.getElementById("trackingId").innerText =
        "BD" + Math.floor(Math.random()*900000000 + 100000000);

    document.getElementById("estimatedDate").innerText =
        "17 July 2026";

    // Shipping Address
    document.getElementById("customerName").innerText =
        order.shipping.firstName + " " + order.shipping.lastName;

    document.getElementById("customerMobile").innerText =
        order.shipping.mobile;

    document.getElementById("customerEmail").innerText =
        order.shipping.email;

    document.getElementById("customerAddress").innerText =

        order.shipping.house + ", " +

        order.shipping.city + ", " +

        order.shipping.state + ", " +

        order.shipping.country + " - " +

        order.shipping.pin;

    // Order Summary


    // Products

    let productContainer =
        document.getElementById("trackProducts");

    productContainer.innerHTML = "";

    order.products.forEach(product=>{

        productContainer.innerHTML += `

        <div class="checkout-item">

            <img src="${product.image}" class="item-img">

            <div class="item-right">

                <h4>${product.title || product.name}</h4>

                <p class="item-info">
    <span>Qty : ${product.quantity}</span>
    <span>₹${product.price}</span>
</p>


     
     
     </div>

        </div>

        `;

    });


  
}
else{

    alert("No Active Order Found");

    window.location.href="active.html";

}