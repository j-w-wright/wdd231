// ------------------ Footer Copyright and Last Modified ---------------- //
const date = new Date();
const currentYear = date.getFullYear();
document.getElementById("currentYear").innerHTML = currentYear;

const lastModified = new Date(document.lastModified);
document.getElementById("lastModified").innerHTML = lastModified.toLocaleString([], {
    hour12: false
});

// --------------------- Hamburger Menu ------------------------ //
const navbutton = document.querySelector('#ham-btn'); // # is for an ID
const navBar = document.querySelector('#nav-bar');
// Toggle the show class off and on //
navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navBar.classList.toggle('show');
});


const url = 'data/memberinformation.json';

const cards = document.querySelector('#cards');

// --------------------- Async/Await --------------------------- //
async function getMemberData () {
   try{
        const response = await fetch(url);
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error("Fetch error: ", error);
    }
}

// --------------------- Member Card --------------------------- //
    // Each entry includes name, address, phone number, website URL, image or icon file name, membership level
    // Membership levels 1=member, 2=silver, 3=gold

const displayMembers = (members) => {
    members.forEach((member) => {
        let card = document.createElement("section");
        let name = document.createElement("h2");
        let address = document.createElement("p");
        let phone = document.createElement("p");
        let image = document.createElement("img");
        let website = document.createElement("#");
        let membership_level = document.createElement("p");

        name.textContent = `${member.name}`;
        address.textContent = `Address: ${member.address}`;
        phone.textContent = `Phone: ${member.phone}`;
        membership_level.textContent = `Membership Level: ${member.membership_level}`;
        website.setAttribute("src", member.website_url);

        image.setAttribute("src", image.image);
        image.setAttribute("alt", `Logo of ${member.name}`);
        image.setAttribute("loading", "lazy");
        image.setAttribute("width", "340");
        image.setAttribute("height", "440");

        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(membership_level);


        cards.appendChild(card);
    })
}

getMemberData();