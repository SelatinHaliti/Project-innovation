function filterByType(type) {
    const listings = document.querySelectorAll('.listing');
    listings.forEach(listing => {
        if (type === 'all') {
            listing.style.display = 'block';
        } else if (listing.getAttribute('data-for') === type) {
            listing.style.display = 'block';
        } else {
            listing.style.display = 'none';
        }
    });
}

function updatePrice() {
    const price = document.getElementById('price').value;
    document.getElementById('priceValue').textContent = "$" + price.toLocaleString();
    filterByPriceAndSurface();
}

function updateSurface() {
    filterByPriceAndSurface();
}

function filterByPriceAndSurface() {
    const price = document.getElementById('price').value;
    const surface = document.getElementById('surface').value;
    const listings = document.querySelectorAll('.listing');
    listings.forEach(listing => {
        const listingPrice = parseInt(listing.getAttribute('data-price'));
        const listingSurface = parseInt(listing.getAttribute('data-surface'));

        if (listingPrice <= price && listingSurface >= surface) {
            listing.style.display = 'block';
        } else {
            listing.style.display = 'none';
        }
    });
}

function searchProperties() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const listings = document.querySelectorAll('.listing');
    listings.forEach(listing => {
        const title = listing.querySelector('h2').textContent.toLowerCase();
        if (title.includes(searchInput)) {
            listing.style.display = 'block';
        } else {
            listing.style.display = 'none';
        }
    });
}

function viewDetails(propertyName) {
    alert("More details about: " + propertyName);
}

