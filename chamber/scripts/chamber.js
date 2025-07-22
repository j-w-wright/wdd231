// -------- Footer Copyright and Last Modified ------- //
const date = new Date();
const currentYear = date.getFullYear();
document.getElementById("currentYear").innerHTML = currentYear;

const lastModified = new Date(document.lastModified);
document.getElementById("lastModified").innerHTML = lastModified.toLocaleString([], {
    hour12: false
});

// -------- Hamburger Menu -------- //
const navbutton = document.querySelector('#ham-btn'); // # is for an ID
const navBar = document.querySelector('#nav-bar');
// Toggle the show class off and on //
navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navBar.classList.toggle('show');
});


// -------- Weather API -------- //
const town = document.querySelector('#town');
const description = document.querySelector('#description');
const temperature = document.querySelector('#temperature');
const graphic = document.querySelector('#graphic');


// -------- Required Variables for the URL -------- //
const key = "692bd7103849f20085cd57cde936564f"
const latitude = "41.51156666482383"
const longitude = "-112.01563251929556"
const weatherUrl = `//api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=imperial`

async function apiFetch() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data); 
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// ------- Display JSON Data ------- //
function displayResults(data) {
    town.innerHTML = data.name;
    description.innerHTML = data.weather[0].description;
    temperature.innerHTML = `${Math.round(data.main.temp)}°F`;
    graphic.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
    graphic.setAttribute("alt", data.weather[0].description);
    graphic.setAttribute("loading", "lazy");
}








const url = 'data/memberinformation.json';
const cards = document.querySelector('#cards');
let memberData = [];

function sortMembersByLevel(members) {
    const order = { "Gold": 1, "Silver": 2, "Member": 3 };
    return members.slice().sort((a, b) => {
        return (order[a.membership_level] || 99) - (order[b.membership_level] || 99);
    });
}

// -------- Async/Await ------- //
async function getMemberData () {
   try{
        const response = await fetch(url);
        const data = await response.json();
        memberData = data; //important to make sure to include this so the array is populated.
        const sortedMembers = sortMembersByLevel(memberData);
        displayMembers(sortedMembers, "card");
    } catch (error) {
        console.error("Fetch error: ", error);
    }
}

const displayMembers = (members, view = "card") => {
    cards.innerHTML = "";
    cards.className = view === "card" ? "cards" : "list";
    members.forEach((member) => {
        let card = document.createElement("section");
        let name = document.createElement("h2");

        // Container with img and information
        let infoRow = document.createElement("div");
        infoRow.className = "card-info-row";

        //let image = document.createElement("img");
        let address = document.createElement("p");
        let phone = document.createElement("p");
        let membership_level = document.createElement("p");
        let website = document.createElement("a");
        

        name.textContent = member.name;
        address.textContent = `Address: ${member.address}`;
        phone.textContent = `Phone: ${member.phone}`;
        membership_level.textContent = `Membership Level: ${member.membership_level}`;
        website.href = member.website_url;
        website.textContent = "Visit Website";
        website.target = "_blank";

        // Only create and append image in the card view
        if (view === "card") {
            let image = document.createElement("img");
            image.setAttribute("src", member.image);
            image.setAttribute("alt", `Logo of ${member.name}`);
            image.setAttribute("loading", "lazy");
            image.setAttribute("width", "40");
            image.setAttribute("height", "40");
            infoRow.appendChild(image);
        }


        let infoCol = document.createElement("div");
        infoCol.className = "card-info-col";
        infoCol.appendChild(address);
        infoCol.appendChild(phone);
        infoCol.appendChild(membership_level);
        infoCol.appendChild(website);

        infoRow.appendChild(infoCol);

        card.appendChild(name);
        card.appendChild(infoRow);
        
        //card.appendChild(name);
        //card.appendChild(address);
        //card.appendChild(phone);
        //card.appendChild(membership_level);
        //card.appendChild(website);

        cards.appendChild(card);
    });
};

document.querySelector("#card").addEventListener("click", () => {
    const sortedMembers = sortMembersByLevel(memberData);
    displayMembers(sortedMembers, "card");
});
document.querySelector("#list").addEventListener("click", () => {
    const sortedMembers = sortMembersByLevel(memberData);
    displayMembers(sortedMembers, "list");
});

getMemberData();

// ---------- Member Company Spotlight Section ----------- //
