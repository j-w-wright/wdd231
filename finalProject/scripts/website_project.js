// -------- Hamburger Menu -------- //
const navbutton = document.querySelector('#ham-btn'); // # is for an ID
const navBar = document.querySelector('#nav-bar'); // # is for an ID
// Toggle the show class off and on //
navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navBar.classList.toggle('show');
});

// -------- Display Visit Message -------- //
// Function to display visit message
function displayVisitMessage() {
    // Get the last visit date from localStorage
    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = new Date();
    const currentTime = currentDate.getTime();
    
    let message = '';
    
    if (!lastVisit) {
        // First visit
        message = "Welcome! Let us know if you have any questions.";
    } else {
        // Calculate days between visits
        const lastVisitTime = parseInt(lastVisit);
        const timeDifference = currentTime - lastVisitTime;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        
        if (daysDifference < 1) {
            // Less than a day
            message = "Welcome back!  Let us know if you have any questions.";
        } else if (daysDifference === 1) {
            // Exactly 1 day
            message = "You last visited 1 day ago.";
        } else {
            // More than 1 day
            message = `You last visited ${daysDifference} days ago.`;
        }
    }
    
    // Display the message
    const visitMessageElement = document.getElementById('visit-message');
    if (visitMessageElement) {
        visitMessageElement.textContent = message;
        visitMessageElement.style.display = 'block';
    }
    
    // Store current visit date
    localStorage.setItem('lastVisit', currentTime.toString());
}

// Run when page loads
document.addEventListener('DOMContentLoaded', displayVisitMessage);


// -------- Footer Copyright and Last Modified ------- //
const date = new Date();
const currentYear = date.getFullYear();
document.getElementById("currentYear").innerHTML = currentYear;

const lastModified = new Date(document.lastModified);
document.getElementById("lastModified").innerHTML = lastModified.toLocaleString([], {
    hour12: false
});

// Wayfinding - Set active navigation item
function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navigation a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('href');
        
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

document.addEventListener('DOMContentLoaded', setActiveNavigation);

// ----- Form Submission and Thank You Page Response Handling ----- //  
    
    // Handle form submission
const applicationForm = document.getElementById('application-form');
    console.log('Form found:', applicationForm);
    
    if (applicationForm) {
        applicationForm.addEventListener('submit', function(e) {
            console.log('Form submitted!');
            
            if (!this.checkValidity()) {
                console.log('Form is not valid, submission cancelled');
                return;
            }
            
            e.preventDefault(); // Prevent default submission ONLY if valid
            
            // Set timestamp
            const timestampField = document.getElementById("timestamp");
            if (timestampField) {
                const now = new Date();
                timestampField.value = now.toLocaleString();
                console.log('Timestamp set:', now.toLocaleString());
            }
            
            // Get form data and redirect
            const formData = new FormData(this);
            const params = new URLSearchParams();
            
            for (let [key, value] of formData.entries()) {
                params.append(key, value);
            }
            
            window.location.href = `thankyou.html?${params.toString()}`;
        });
    }
    
    // Thank You Page Response Display
    const responseDiv = document.querySelector('#responseData');
    if (responseDiv) {
        const urlParams = new URLSearchParams(window.location.search);
        
        if (urlParams.toString()) {
            let html = '<p><strong>Here is your submitted information: </strong></p><ul>';
            for (let [key, value] of urlParams.entries()) {
                const formattedKey = key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                html += `<li><strong>${formattedKey}:</strong> ${value}</li>`;
            }
            html += '</ul>';
            responseDiv.innerHTML = html;
        } else {
            responseDiv.innerHTML = '<p>No form data received.</p>';
        };
    }

// ------- Display New Menu Items ------- //
const url = 'data/monthly_specials.json'; // URL to the JSON file


function displayNewMenuItems(newItems) {
    const newItemsContainer = document.querySelector('#newItems');
    if (newItemsContainer && newItems) {
        // Clear existing items
        newItemsContainer.innerHTML = '';

        // Get current month and year
        const currentDate = new Date();
        const currentMonth = currentDate.toLocaleString('default', { month: 'long'});
        const currentYear = currentDate.getFullYear().toString();

        // Filter items for current month and year
        const currentMonthItems = newItems.filter(item => item.month === currentMonth && item.year === currentYear);

        if (currentMonthItems.length === 0) {
            newItemsContainer.innerHTML = `<p>No new items available for ${currentMonth} ${currentYear}.</p>`;
            return; 
        }


        currentMonthItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('new-items');

            itemDiv.innerHTML = `
                <h3>${item.name}</h3>
                <img src="${item.image}" alt="${item.name} Image">
                <p>${item.description}</p>
                <p>${item.price}</p>
            `;

            newItemsContainer.appendChild(itemDiv);
        });
    }
}
    
function loadNewMenuItems() {

    const container = document.querySelector('#newItems');
    if (!container) {
        console.log('New items container not found on this page.');
        return;
    }
    // Fetch the new items from the JSON file
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data loaded successfully: ', data);
            console.log('Current month/year:', new Date().toLocaleDateString('default', { month: 'long' }), new Date().getFullYear());
            displayNewMenuItems(data.items || data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            container.innerHTML = '<p>Error loading new menu items. Please try again later.</p>';
        });
}

document.addEventListener('DOMContentLoaded', loadNewMenuItems);
