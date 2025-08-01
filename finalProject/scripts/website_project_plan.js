// -------- Hamburger Menu -------- //
const navbutton = document.querySelector('#ham-btn'); // # is for an ID
const navBar = document.querySelector('#main-nav'); // # is for an ID
// Toggle the show class off and on //
navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navBar.classList.toggle('show');
});

// -------- Footer Copyright and Last Modified ------- //
const date = new Date();
const currentYear = date.getFullYear();
document.getElementById("currentYear").innerHTML = currentYear;

const lastModified = new Date(document.lastModified);
document.getElementById("lastModified").innerHTML = lastModified.toLocaleString([], {
    hour12: false
});