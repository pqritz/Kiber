const searchInput = document.getElementById('search-input');
const dropdownMenu = document.getElementById('dropdown-menu');

// Mock data for demonstration purposes
const mockData = ['Apple', 'Banana', 'Orange', 'Grapes', 'Strawberry', 'Watermelon', 'Mango', 'Pineapple', 'Kiwi', 'Cherry', 'Peach'];
var allStores = jsonToArray()
var userLat = null;
var userLon = null;

searchInput.addEventListener('input', updateDropdownMenu);
searchInput.addEventListener('click', showClosest)
document.addEventListener('click', hideDropdownMenu);

window.onload = function () {
    getLocation()
};

function updateDropdownMenu() {
    const searchTerm = searchInput.value;
    // You can perform your search logic here using the searchTerm

    // Clear previous results
    dropdownMenu.innerHTML = '';

    // Filter and display up to ten results
    const filteredResults = allStores.filter(item => item.uun.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 6);

    if (filteredResults.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No matching results found';
        li.classList.add('no-results');
        dropdownMenu.appendChild(li);
    } else {
        filteredResults.forEach(result => {
            result = result.uun;
            const li = document.createElement('li');
            li.textContent = result;
            li.addEventListener('click', () => {
                searchInput.value = result;
                hideDropdownMenu();
            });
            dropdownMenu.appendChild(li);
        });
    }

    // Show the dropdown menu
    dropdownMenu.style.display = 'block';
}

function hideDropdownMenu() {
    dropdownMenu.style.display = 'none';
}

function showClosest() {
    getLocation()
    if (userLon == null && userLat == null) {
        alert("It seems that we couldnt get your Location")
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("couldnt")
    }
}

function showPosition(position) {
    userLat = position.coords.latitude;
    userLon = position.coords.longitude;
}

function jsonToArray() {
    var storesFromArray = []
    fetch("../json/Stores.json").then(Response => Response.json())
        .then(data => {
            data.Stores.forEach(element => {
                var newStore = {}
                newStore.brand = element.name
                newStore.uun = element.uun
                newStore.lon = element.longitude
                newStore.lat = element.latitude
                storesFromArray.push(newStore)
            });
        });
    return storesFromArray
}