document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('show');

  if (hamburger.textContent === '☰') {
    hamburger.textContent = '✖';
  } else {
    hamburger.textContent = '☰';
  }
});

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Nairobi Kenya Temple",
    location: "Nairobi, Kenya",
    dedicated: "2022, June, 05",
    area: 18600,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/nairobi-kenya-temple/400x250/nairobi-kenya-temple-60488-main.jpg",
  },
  {
    templeName: "Rome Italy Temple",
    location: "Rome, Italy",
    dedicated: "2019, October, 10",
    area: 41000,
    imageUrl:
      "https://churchofjesuschristtemples.org/rome-italy-temple/images/main.jpg",
  },
  {
    templeName: "Tokyo Japan Temple",
    location: "Tokyo, Japan",
    dedicated: "1980, August, 27",
    area: 52920,
    imageUrl:
      "https://churchofjesuschristtemples.org/tokyo-japan-temple/images/main.jpg",
  }

];
// Function to display temples
function displayTemples(filteredTemples) {
  const container = document.getElementById("temple-container");
  container.innerHTML = ""; // clear previous content

  filteredTemples.forEach(t => {
    const card = document.createElement("div");
    card.classList.add("temple-card");

    card.innerHTML = `
      <h2>${t.templeName}</h2>
      <p><strong>Location:</strong> ${t.location}</p>
      <p><strong>Dedicated:</strong> ${t.dedicated}</p>
      <p><strong>Area:</strong> ${t.area.toLocaleString()} sq ft</p>
      <img src="${t.imageUrl}" alt="${t.templeName}" loading="lazy">
    `;

    container.appendChild(card);
  });
}

// Filtering functions
function filterOld() {
  return temples.filter(t => new Date(t.dedicated).getFullYear() < 1900);
}

function filterNew() {
  return temples.filter(t => new Date(t.dedicated).getFullYear() > 2000);
}

function filterLarge() {
  return temples.filter(t => t.area > 90000);
}

function filterSmall() {
  return temples.filter(t => t.area < 10000);
}

function showAll() {
  return temples;
}

// Event listeners for navigation
document.getElementById("nav-old").addEventListener("click", () => {
  displayTemples(filterOld());
});

document.getElementById("nav-new").addEventListener("click", () => {
  displayTemples(filterNew());
});

document.getElementById("nav-large").addEventListener("click", () => {
  displayTemples(filterLarge());
});

document.getElementById("nav-small").addEventListener("click", () => {
  displayTemples(filterSmall());
});

document.getElementById("nav-home").addEventListener("click", () => {
  displayTemples(showAll());
});

// Initial load: show all temples
window.addEventListener("DOMContentLoaded", () => {
  displayTemples(showAll());
});