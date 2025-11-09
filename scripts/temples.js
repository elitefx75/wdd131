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
