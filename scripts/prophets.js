const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetData () {
   try{
        const response = await fetch(url);
        const data = await response.json();
    //console.table(data.prophets);
        displayProphets(data.prophets);
    } catch (error) {
        console.error("Fetch error: ", error);
    }

}

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        let card = document.createElement("section");
        let fullName = document.createElement("h2");
        let birthdate = document.createElement("p");
        let birthplace = document.createElement("p");
        let portrait= document.createElement("img");

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        birthdate.textContent = `Birthdate: ${prophet.birthdate}`;
        birthplace.textContent = `Birthplace: ${prophet.birthplace}`;
        portrait.setAttribute("src", prophet.imageurl);
        portrait.setAttribute("alt", `Picture of ${prophet.fullName} the prophet`);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "340");
        portrait.setAttribute("height", "440");

        card.appendChild(fullName);
        card.appendChild(birthdate);
        card.appendChild(birthplace);
        card.appendChild(portrait);


        cards.appendChild(card);
    })
}

getProphetData();