function loadNavbar() {
  const navbar = document.querySelector('.navbar');
  navbar.innerHTML = `
        <h1 class="brand">Hunger Apps</h1>
        <button class="hamburger-button" aria-label="Toggle navigation" id="drawer-toggle">
        ☰
        </button>
        <input type="checkbox" id="check" name="check" style="display: none;">
        <nav class="nav-bar">
        
                <li><a href="/">Home</a></li>
                <li><a href="/favorite.html">Favorite</a></li>
                <li><a href="https://www.instagram.com/dhimasprimajaya/">About Us</a></li>
        
        </nav>
        `;
  document.getElementById('drawer-toggle').addEventListener('click', () => {
    const drawer = document.querySelector('.nav-bar');
    const isDrawerOpen = drawer.style.right === '0%';
    drawer.style.right = isDrawerOpen ? '-100%' : '0%';
  });
  document.getElementById('drawer-toggle').addEventListener('focus', () => {
    const drawer = document.querySelector('.nav-bar');
    drawer.style.right = '0%'; // Menampilkan drawer saat fokus
  });
  window.addEventListener('load', () => {
    document.querySelector('.skip-link').focus();
  });
}

module.exports = loadNavbar;
