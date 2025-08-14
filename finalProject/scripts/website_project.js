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
            
            window.location.href = `thankyou_employment.html?${params.toString()}`;
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
    try {
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
                    <p class="description">${item.description}</p>
                    <p class="price">$${item.price}</p>
                `;

                newItemsContainer.appendChild(itemDiv);
            });
        }
    } catch (error) {
        console.error('Error displaying new menu items:', error);
        const newItemsContainer = document.querySelector('#newItems');
        if (newItemsContainer) {
            newItemsContainer.innerHTML = '<p>Error displaying new menu items.</p>';
        }
    }
}
    
async function loadNewMenuItems() {

    const container = document.querySelector('#newItems');
    if (!container) {
        console.log('New items container not found on this page.');
        return;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data loaded successfully:', data);
        console.log('Current month/year:', new Date().toLocaleDateString('default', { month: 'long' }), new Date().getFullYear());
        displayNewMenuItems(data.items || data);
        } catch(error) {
            console.error('There was a problem with the fetch operation:', error);
            container.innerHTML = '<p>Error loading new menu items. Please try again later.</p>';
        }
}

document.addEventListener('DOMContentLoaded', loadNewMenuItems);

async function loadMenuItems() {
    const menuItemsContainer = document.querySelector('#menu-items');
    if (!menuItemsContainer) return;

    try {
        const response = await fetch('data/menu_items.json');
        const data = await response.json();
        displayMenuItems(data.items || data);
    } catch(error) {
            menuItemsContainer.innerHTML = '<p>Error loading menu items.</p>';
            console.error(error);
        }
}

// Only run on menu.html
if (window.location.pathname.endsWith('menu.html')) {
    document.addEventListener('DOMContentLoaded', loadMenuItems);
}

// ------- Employment Positions Modals ------- //

const openButtonC = document.querySelectorAll('#openButtonC');
const openButtonT = document.querySelectorAll('#openButtonT');
const openButtonM = document.querySelectorAll('#openButtonM');
const dialogBox = document.querySelector('#dialogBox');
const closeButton = document.querySelector('#closeButton');
const dialogBoxText = document.querySelector('#dialogBox div');

openButtonC.forEach(button => {
    button.addEventListener('click', () => {
        dialogBox.showModal();
        dialogBoxText.innerHTML = `<h2>Cook</h2>
        <p>We are looking for a skilled cook to join our team. Responsibilities include cooking menu items, maintaining kitchen cleanliness, and ensuring food safety standards.</p>
        <p>Requirements: Previous cooking experience, ability to work in a fast-paced environment, and a passion for food.</p>
        <p>20-30 hours per week, $18/hour.</p>`;
    });
});

openButtonT.forEach(button => {
    button.addEventListener('click', () => {
        dialogBox.showModal();
        dialogBoxText.innerHTML = `<h2>Team Member</h2>
        <p>We are looking for a team member who has a positive attitude, and enjoys working with others.  </p>
        <p>Requirements: Must be able to work evenings and weekends. </p>
        <p>15-25 hours per week, $15/hour.</p>`;

    });
});

openButtonM.forEach(button => {
    button.addEventListener('click', () => {
        dialogBox.showModal();
        dialogBoxText.innerHTML = `<h2>Manager</h2>
        <p>We are looking for a manager during the evening. </p>
        <p>Requirements: Must have previous management experience, be able to work evenings and weekends, and have a passion for food.</p>
        <p>30-40 hours per week, $20/hour.</p>`;
    });
});

// Close the dialog box when the close button is clicked
if (closeButton) {
    closeButton.addEventListener('click', () => {
        dialogBox.close();
    });
}

function displayMenuItems(menuItems) {
    const menuItemsContainer = document.querySelector('#menu-items');
    if (!menuItemsContainer) return;

    menuItemsContainer.innerHTML = ''; // Clear previous content

    menuItems.forEach((item, idx) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('menu-item');

        // Unique modal ID for each item
        const modalId = `menu-modal-${idx}`;

        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <img src="${item.image}" alt="${item.name} Image">
            <button class="view-details" data-modal="${modalId}">View Details</button>
            <dialog id="${modalId}" class="menu-modal">
                <div>
                    <h3>${item.name}</h3>
                    <img src="${item.image}" alt="${item.name} Image">
                    <p class="description">${item.description}</p>
                    <p class="price">$${item.price}</p>
                    <button class="close-modal">Close</button>
                </div>
            </dialog>`;

        menuItemsContainer.appendChild(itemDiv);

        // Add event listeners for modal open/close
        const viewBtn = itemDiv.querySelector('.view-details');
        const modal = itemDiv.querySelector('.menu-modal');
        const closeBtn = itemDiv.querySelector('.close-modal');

        viewBtn.addEventListener('click', () => {
            modal.showModal();
        });

        closeBtn.addEventListener('click', () => {
            modal.close();
        });
    });
}
