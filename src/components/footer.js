function loadFooter() {
  const navbar = document.getElementsByTagName('footer')[0];
  const element = `
  <p>Copyright © 2024 - Hunger Apps DPJ</p>
  `;
  navbar.innerHTML = element;
}

module.exports = { loadFooter };
