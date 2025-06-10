// document.addEventListener('DOMContentLoaded', function () {
//     fetch('data.json')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             let gridWarp = document.querySelector('.grid-warp')
//             data.forEach((dessert) => {

//                 let imageUrl = dessert.image.desktop;
//                 if (window.innerWidth < 600) {
//                     imageUrl = dessert.image.mobile;
//                 } else if (window.innerWidth < 1024) {
//                     imageUrl = dessert.image.tablet;
//                 }
//                 const article = document.createElement('article');
//                 article.classList.add('grid-item');
//                 article.innerHTML = `
//             <figure class="image-contunet">
//             <img src="${imageUrl}" alt="${dessert.name}">
//             </figure>
//             <button class="cart-button">
//                 <img src="assets/images/icon-add-to-cart.svg" alt="icon-add-to-cart">
//                     Add to Cart
//             </button>
//             <button class="cart-plus-minus hidden">
//                 <span class="decrement"><img src="assets/images/icon-decrement-quantity.svg" alt=""></span>
//                 <span class="value">1</span>
//                 <span class="increment"><img src="assets/images/icon-increment-quantity.svg" alt="" ></span>
//             </button>
//             <div class="item-ctegory">${dessert.category}</div>
//             <h3 class="tertiary-header">${dessert.name}</h3>
//             <div class="item-price">$ ${dessert.price}</div>
//                 `
//                 gridWarp.appendChild(article);

//                 // toggleButton()
//                 const cartButton = article.querySelector('.cart-button')
//                 const cartPlusMins = article.querySelector('.cart-plus-minus')
//                 const decrementBtn = article.querySelector('.decrement');
//                 const incrementBtn = article.querySelector('.increment');
//                 const valueSpan = article.querySelector('.value');
//                 const emptyCart = document.querySelector('.empty-cart');
//                 const fullCart = document.querySelector('.full-cart');
//                 const numberTotal = document.querySelector('.numer-total')
//                 cartButton.addEventListener('click', function () {
//                     cartButton.classList.add('hidden');
//                     cartPlusMins.classList.remove('hidden')
//                     valueSpan.innerHTML = `1`

//                 });

//                 decrementBtn.addEventListener('click', function (e) {
//                     let value = parseInt(valueSpan.textContent);
//                     if (value > 1) {
//                         valueSpan.textContent = value - 1;
//                     } else if (value == 1) {
//                         valueSpan.textContent = value - 1;
//                         cartButton.classList.remove('hidden');
//                         cartPlusMins.classList.add('hidden')
//                     }

//                 })
//                 incrementBtn.addEventListener('click', function (e) {
//                     let value = parseInt(valueSpan.textContent);
//                     valueSpan.textContent = value + 1;
//                 });
//                 cartButton.addEventListener('click', function () {
//                     emptyCart.classList.add('hidden')
//                     let valeuTotal = parseInt(numberTotal.textContent) || 0;
//                     numberTotal.textContent = valeuTotal + 1
//                     fullCart.innerHTML += `
//                     <div class="cart-container">
//                     <p class="heading-cart">${dessert.name}</p>
//                     <article class="cart-items">

//                 <span class="quantity">1x</span>
//                 <span class="each-item">@ ${dessert.price}</span>
//                 <span class="total-item">$ ${dessert.price}</span>
//                 <button class="close-icon">
//                 <img src="assets/images/icon-remove-item.svg" alt="" srcset="">
//                 </button>
//                 </article>
//                 </div>
//                     `

//                 })
//                 const removeBtn = fullCart.querySelector('.cart-container:last-child .close-icon');

//                 console.log(removeBtn)

//                 removeBtn.addEventListener('click', function (e) {
//                     e.stopPropagation();
//                     this.closest('.cart-container').remove();
//                 })



//             });
//         })
//         .catch(error => {
//             console.error('Error loading JSON data:', error);
//         });

// })


document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            const gridWarp = document.querySelector('.grid-warp');
            const emptyCart = document.querySelector('.empty-cart');
            const fullCart = document.querySelector('.full-cart');
            const numberTotal = document.querySelector('.numer-total');

            data.forEach((dessert) => {
                // Responsive image selection
                let imageUrl = dessert.image.desktop;
                if (window.innerWidth < 600) imageUrl = dessert.image.mobile;
                else if (window.innerWidth < 1024) imageUrl = dessert.image.tablet;

                // Create article element
                const article = document.createElement('article');
                article.classList.add('grid-item');
                article.innerHTML = `
                    <figure class="image-contunet">
                        <img src="${imageUrl}" alt="${dessert.name}">
                    </figure>
                    <button class="cart-button">
                        <img src="assets/images/icon-add-to-cart.svg" alt="icon-add-to-cart">
                        Add to Cart
                    </button>
                    <button class="cart-plus-minus hidden">
                        <span class="decrement"><img src="assets/images/icon-decrement-quantity.svg" alt=""></span>
                        <span class="value">1</span>
                        <span class="increment"><img src="assets/images/icon-increment-quantity.svg" alt=""></span>
                    </button>
                    <div class="item-ctegory">${dessert.category}</div>
                    <h3 class="tertiary-header">${dessert.name}</h3>
                    <div class="item-price">$ ${dessert.price}</div>
                `;

                gridWarp.appendChild(article);

                // Get elements for this specific article
                const cartButton = article.querySelector('.cart-button');
                const cartPlusMinus = article.querySelector('.cart-plus-minus');
                const decrementBtn = article.querySelector('.decrement');
                const incrementBtn = article.querySelector('.increment');
                const valueSpan = article.querySelector('.value');
                let cartItem = null;

                // Combined click handler for cart button
                cartButton.addEventListener('click', function() {
                    cartButton.classList.add('hidden');
                    cartPlusMinus.classList.remove('hidden');
                    valueSpan.textContent = '1';

                    emptyCart.classList.add('hidden');
                    
                    // Update total count
                    if (numberTotal) {
                        numberTotal.textContent = (parseInt(numberTotal.textContent) || 0) + 1;
                    }

                    // Add item to cart
                    if (fullCart) {
                        cartItem = document.createElement('div');
                        cartItem.className = 'cart-container';
                        cartItem.innerHTML = `
                            <p class="heading-cart">${dessert.name}</p>
                            <article class="cart-items">
                                <span class="quantity">1x</span>
                                <span class="each-item">@ ${dessert.price}</span>
                                <span class="total-item">$${dessert.price}</span>
                                <button class="close-icon">
                                    <img src="assets/images/icon-remove-item.svg" alt="Remove item">
                                </button>
                            </article>
                        `;
                        
                        // Add remove functionality
                        const removeBtn = cartItem.querySelector('.close-icon');
                        removeBtn.addEventListener('click', function(e) {
                            e.stopPropagation();
                            const quantity = parseInt(cartItem.querySelector('.quantity').textContent.replace('x', ''));
                            cartItem.remove();
                            
                            // Update total count
                            if (numberTotal) {
                                const currentTotal = parseInt(numberTotal.textContent) || 0;
                                numberTotal.textContent = Math.max(0, currentTotal - quantity);
                            }
                            
                            // Show empty cart if no items left
                            if (fullCart.children.length === 0) {
                                emptyCart.classList.remove('hidden');
                            }
                        });

                        fullCart.appendChild(cartItem);
                    }
                });

                // Function to update quantity in cart
                const updateCartQuantity = (newQuantity) => {
                    if (cartItem) {
                        const quantityElement = cartItem.querySelector('.quantity');
                        const totalElement = cartItem.querySelector('.total-item');
                        
                        quantityElement.textContent = `${newQuantity}x`;
                        const price = parseFloat(dessert.price);
                        totalElement.textContent = `$${(price * newQuantity).toFixed(2)}`;
                    }
                };

                // Quantity controls
                decrementBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    let value = parseInt(valueSpan.textContent);
                    
                    if (value > 1) {
                        valueSpan.textContent = value - 1;
                        updateCartQuantity(value - 1);
                    } else {
                        valueSpan.textContent = '0';
                        cartButton.classList.remove('hidden');
                        cartPlusMinus.classList.add('hidden');
                        updateCartQuantity(0);
                    }
                });

                incrementBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    let value = parseInt(valueSpan.textContent);
                    valueSpan.textContent = value + 1;
                    updateCartQuantity(value + 1);
                });
            });
        })
        .catch(error => {
            console.error('Error loading JSON data:', error);
        });
});