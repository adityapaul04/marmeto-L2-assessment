document.addEventListener("DOMContentLoaded", function () {
    const productContainer = document.getElementById("product-container");
    const toggleButtons = document.querySelectorAll(".toggle-btn");

    //Fetch Data
    async function fetchProductData(category) {
        try {
            const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
            const data = await response.json();

            productContainer.innerHTML = "";

            const selectedCategory = data.categories.find(cat => cat.category_name.toLowerCase() === category.toLowerCase());

            if (selectedCategory) {
                selectedCategory.category_products.forEach(product => {
                    const productCard = document.createElement("div");
                    productCard.classList.add("product-card");

                    const productImage = document.createElement("img");
                    productImage.src = product.image;
                    productCard.appendChild(productImage);

                    const productBadge = document.createElement("div");
                    productBadge.classList.add("badge");
                    
                    if (product.badge_text) {
                        productBadge.textContent = product.badge_text;
                        productCard.appendChild(productBadge);
                    }

                    const productInfo = document.createElement("div");
                    productInfo.classList.add("product-info");

                    const productDetails = document.createElement("div");
                    productDetails.classList.add("product-details");

                    const titleVendorDiv = document.createElement("div");
                    titleVendorDiv.classList.add("title-vendor");

                    const productTitle = document.createElement("h2");
                    productTitle.textContent = product.title;
                    titleVendorDiv.appendChild(productTitle);

                    const bulletPoint = document.createTextNode(" • ");
                    titleVendorDiv.appendChild(bulletPoint);

                    const productVendor = document.createElement("p");
                    productVendor.textContent = product.vendor;
                    productVendor.classList.add("product-vendor");
                    titleVendorDiv.appendChild(productVendor);

                    productDetails.appendChild(titleVendorDiv);


                    const priceInfoDiv = document.createElement("div");
                    priceInfoDiv.classList.add("price-info");

                    const productPrice = document.createElement("p");
                    productPrice.textContent = "Rs " + product.price;
                    productPrice.classList.add("product-price");
                    priceInfoDiv.appendChild(productPrice);

                    const compareAtPrice = document.createElement("p");
                    compareAtPrice.textContent = product.compare_at_price;
                    compareAtPrice.style.color = "#8F8F8F";
                    compareAtPrice.style.textDecoration = "line-through";
                    priceInfoDiv.appendChild(compareAtPrice);

                    const discountPercentage = ((product.compare_at_price - product.price) / product.compare_at_price) * 100;
                    const discount = document.createElement("p");
                    discount.textContent = discountPercentage.toFixed(2) + "% off";
                    discount.style.color = "#FF3737";
                    priceInfoDiv.appendChild(discount);

                    productDetails.appendChild(priceInfoDiv);

                    productInfo.appendChild(productDetails);

                    const addToCartBtn = document.createElement("button");
                    addToCartBtn.textContent = "Add to Cart";
                    productInfo.appendChild(addToCartBtn);

                    productCard.appendChild(productInfo);
                    productContainer.appendChild(productCard);
                });
            } else {
                console.error('Category not found in data');
            }
        } catch (error) {
            console.error('Error fetching product data: ', error);
        }
    }

    // Event listener for toggle buttons
    toggleButtons.forEach(button => {
        button.addEventListener("click", function () {
            toggleButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            const category = this.getAttribute("data-category");
            fetchProductData(category);
        });
    });

    // Initial default category (men)
    fetchProductData("men");
});
