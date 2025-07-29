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
const forecast = document.querySelector('#forecast');


// -------- Required Variables for the URL -------- //
const key = "692bd7103849f20085cd57cde936564f"
const latitude = "41.51156666482383"
const longitude = "-112.01563251929556"
const weatherUrl = `//api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=imperial`
const forecastUrl = `//api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}&units=imperial`;

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
    } 
    catch (error) {
        console.log(error);
    }
}

async function apiFetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data); 
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } 
    catch (error) {
        console.log(error);
    }
}

apiFetch();
apiFetchForecast();

// ------- Display JSON Data ------- //
function displayResults(data) {
    town.innerHTML = data.name;
    description.innerHTML = data.weather[0].description;
    temperature.innerHTML = `${Math.round(data.main.temp)}°F`;
    graphic.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
    graphic.setAttribute("alt", data.weather[0].description);
    graphic.setAttribute("loading", "lazy");
}

// ------- Fetch and Display Forecast Data ------- //
function displayForecast(data) {
    // Get the forecast spans
    const today = document.querySelector('#today');
    const tomorrow = document.querySelector('#tomorrow');
    const dayAfterTomorrow = document.querySelector('#dayAfterTomorrow');
    
    // OpenWeatherMap 5-day forecast gives data every 3 hours
    // We'll get the high temperature for each day by finding the maximum temp in each day's forecasts
    
    // Group forecasts by date
    const forecastsByDate = {};
    const currentDate = new Date();
    
    data.list.forEach(forecast => {
        const forecastDate = new Date(forecast.dt * 1000);
        const dateKey = forecastDate.toDateString();
        
        if (!forecastsByDate[dateKey]) {
            forecastsByDate[dateKey] = [];
        }
        forecastsByDate[dateKey].push(forecast);
    });
    
    // Get dates for today, tomorrow, and day after tomorrow
    const todayDate = currentDate.toDateString();
    const tomorrowDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000).toDateString();
    const dayAfterDate = new Date(currentDate.getTime() + 2 * 24 * 60 * 60 * 1000).toDateString();
    
    // Function to get high temperature for a day
    function getDayHighTemp(forecasts) {
        if (!forecasts || forecasts.length === 0) return 'N/A';
        const temps = forecasts.map(f => f.main.temp_max);
        return `${Math.round(Math.max(...temps))}°F`;
    }
    
    // Populate the forecast spans
    if (today) {
        today.textContent = getDayHighTemp(forecastsByDate[todayDate]);
    }
    if (tomorrow) {
        tomorrow.textContent = `Tomorrow: ${getDayHighTemp(forecastsByDate[tomorrowDate])}`;
    }
    if (dayAfterTomorrow) {
        const dayAfterName = new Date(currentDate.getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'long' });
        dayAfterTomorrow.textContent = `${dayAfterName}: ${getDayHighTemp(forecastsByDate[dayAfterDate])}`;
    }
}

// -------- Member Directory and Cards -------- //
// This script fetches member data from a JSON file and displays it in card or list format
// It also sorts members by their membership level (Gold, Silver, Member)

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
// -------- Async/Await ------- //
async function getMemberData () {
   try{
        const response = await fetch(url);
        const data = await response.json();
        memberData = data;
        const sortedMembers = sortMembersByLevel(memberData);
        displayMembers(sortedMembers, "card");
        
        // Call spotlight function after data is loaded
        displaySpotlightMembers();
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

        cards.appendChild(card);
    });
};


document.addEventListener('DOMContentLoaded', function() {
    const cardButton = document.querySelector("#card");
    const listButton = document.querySelector("#list");
    
    if (cardButton) {
        cardButton.addEventListener("click", () => {
            const sortedMembers = sortMembersByLevel(memberData);
            displayMembers(sortedMembers, "card");
        });
    }
    
    if (listButton) {
        listButton.addEventListener("click", () => {
            const sortedMembers = sortMembersByLevel(memberData);
            displayMembers(sortedMembers, "list");
        });
    }
});

getMemberData();

// ---------- Member Company Spotlight Section ----------- //

function displaySpotlightMembers() {
    console.log('displaySpotlightMembers called');
    const highlightCards = document.querySelector('#highlight-cards');
    
    if (!highlightCards) {
        console.log('No highlight-cards element found');
        return;
    }
    
    if (!memberData.length) {
        console.log('No member data available');
        return;
    }
    
    // Filter for Gold and Silver members only
    const eligibleMembers = memberData.filter(member => 
        member.membership_level === "Gold" || member.membership_level === "Silver"
    );
    
    console.log('Eligible members:', eligibleMembers.length);
    
    if (eligibleMembers.length === 0) {
        console.log('No Gold or Silver members found');
        return;
    }
    
    // Randomly shuffle and select 3 members
    const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
    const selectedMembers = shuffled.slice(0, 3);
    
    // Clear existing content
    highlightCards.innerHTML = "";
    
    // Create cards for selected members
    selectedMembers.forEach(member => {
        let card = document.createElement("div");
        card.className = "spotlight-card";
        
        let name = document.createElement("h3");
        let image = document.createElement("img");
        let phone = document.createElement("p");
        let website = document.createElement("a");
        let membership = document.createElement("span");
        
        name.textContent = member.name;
        
        image.setAttribute("src", member.image);
        image.setAttribute("alt", `Logo of ${member.name}`);
        image.setAttribute("loading", "lazy");
        
        phone.textContent = member.phone;
        
        website.href = member.website_url;
        website.textContent = "Visit Website";
        website.target = "_blank";
        
        membership.textContent = member.membership_level;
        membership.className = `membership-${member.membership_level.toLowerCase()}`;
        
        card.appendChild(name);
        card.appendChild(image);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(membership);
        
        highlightCards.appendChild(card);
    });
    
    console.log('Spotlight cards created');
}



// -------- Member Directory Button Event Listeners -------- //
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');


    const cardButton = document.querySelector("#card");
    const listButton = document.querySelector("#list");
    
    if (cardButton) {
        cardButton.addEventListener("click", () => {
            const sortedMembers = sortMembersByLevel(memberData);
            displayMembers(sortedMembers, "card");
        });
    }
    
    if (listButton) {
        listButton.addEventListener("click", () => {
            const sortedMembers = sortMembersByLevel(memberData);
            displayMembers(sortedMembers, "list");
        });
    }

// ----- Form Submission and Thank You Page Response Handling ----- //  
    
    // Handle form submission
    const membershipForm = document.getElementById('membershipForm');
    console.log('Form found:', membershipForm);
    
    if (membershipForm) {
        membershipForm.addEventListener('submit', function(e) {
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
    const responseDiv = document.getElementById('responseData');
    if (responseDiv) {
        const urlParams = new URLSearchParams(window.location.search);
        
        if (urlParams.toString()) {
            let html = '<h3>Your Submitted Information:</h3><ul>';
            
            for (let [key, value] of urlParams.entries()) {
                const formattedKey = key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                html += `<li><strong>${formattedKey}:</strong> ${value}</li>`;
            }
            html += '</ul>';
            responseDiv.innerHTML = html;
        } else {
            responseDiv.innerHTML = '<p>No form data received.</p>';
        }
    }
});

// -------- Membership Modals -------- //

const openButton = document.querySelector("#openButton");
const dialogBox = document.querySelector("#dialogBox");
const closeButton = document.querySelector("#closeButton");
const dialogBoxText = document.querySelector("#dialogBox div");


openButtonG.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxText.innerHTML = `<h2>Gold Membership Benefits</h2>
                <p>Gold Members receive premium benefits including:</p>
                <ul>
                    <li>Spotlight on the home page</li>
                    <li>Priority listing in the directory</li>
                    <li>Featured in monthly newsletters</li>
                    <li>Discounts on events and advertising</li>
                    <li>Exclusive networking opportunities</li>
                </ul>` 
})

openButtonS.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxText.innerHTML = `<h2>Silver Membership Benefits</h2>
                <p>Silver Members receive additional benefits including:</p>
                <ul>
                <li>Spotlight on the home page</li>    
                <li>Enhanced listing in the directory</li>
                    <li>Inclusion in monthly newsletters</li>
                    <li>Discounts on events</li>
                </ul>` 
})

openButtonB.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxText.innerHTML = `<h2>Bronze Membership Benefits</h2>
                <p>Bronze Members receive basic benefits including:</p>
                <ul>
                    <li>Basic listing in the directory</li>
                    <li>Inclusion in newsletters</li>
                    <li>Access to events</li>
                </ul>`
})

openButtonNP.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxText.innerHTML = `<h2>Non-Profit Membership Benefits</h2>
                <p>Non-Profit Members receive basic benefits including:</p>
                <ul>
                    <li>Basic listing in the directory</li>
                    <li>Inclusion in newsletters</li>
                    <li>Access to events</li>
                </ul>` 
})

// ------ Close the dialog box ------ //
closeButton.addEventListener("click", () => {
    dialogBox.close();
});
