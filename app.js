const page = document.body.dataset.page;
const alien = (className = '') => /* HTML */ `
  <img
    class="alien ${className}"
    src="assets/glorp.png"
    alt=""
    width="4608"
    height="4608"
  />
`;
const waves = (home = false) => /* HTML */ `
  <div class="landscape ${home ? 'landscape-home' : ''}" aria-hidden="true">
    <svg viewBox="0 0 1440 280" preserveAspectRatio="none">
      ${
        home
          ? /* HTML */ `
              <path
                fill="#d9eaf6"
                d="M0 110C150-65 300 237 475 70S785 207 963 63 1290 57 1440 14V280H0Z"
              />
            `
          : ''
      }
      <path
        fill="${home ? '#d0e2bc' : '#d8e88c'}"
        d="M0 166C178 5 295 276 483 127S778 257 980 102s308 9 460-25V280H0Z"
      />
      <path
        fill="${home ? '#aecb9a' : '#a1bf8b'}"
        d="M0 207C180 112 282 289 466 199s236 1 397 25 296-147 577-89V280H0Z"
      />
    </svg>
  </div>
`;
const logo = /* HTML */ `
  <img
    class="logo"
    src="assets/repixel.png"
    alt="Re:Pixel Studio"
    width="2176"
    height="752"
  />
`;
const homeBackdrop = /* HTML */ `
  <defs>
    <clipPath id="home-wave-clip">
      <path
        d="M0 52C155 70 212-12 343 15S526 34 648 9 816 12 921 39 1070 10 1183 17 1344 56 1440 48V850H0Z"
      />
    </clipPath>
  </defs>
  <g clip-path="url(#home-wave-clip)">
    <path fill="#e9e6e0" d="M0 0H1440V580C1320 810 1030 820 810 745S140 795 0 560Z" />
    <path
      fill="#dfe5e4"
      d="M1440 0H1120C920 0 810 95 730 255S575 570 730 730 1320 840 1440 645Z"
    />
  </g>
`;
const header = /* HTML */ `
  <header
    class="site-header ${page === 'contact' ? 'contact-header' : page === 'home' ? 'home-header' : 'scalloped'}"
  >
    <div class="header-inner">
      <a href="index.html" class="brand" aria-label="Re:Pixel Studio home">${logo}</a>
      <button
        class="menu-toggle"
        id="menu-toggle"
        type="button"
        aria-label="Open menu"
        aria-controls="main-nav"
        aria-expanded="false"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav id="main-nav" aria-label="Main navigation">
        <a href="index.html" ${page === 'home' ? 'aria-current="page"' : ''}>Home</a>
        <a href="games.html" ${page === 'games' ? 'aria-current="page"' : ''}>Games</a>
        <a href="team.html" ${page === 'team' ? 'aria-current="page"' : ''}>Our Team</a>
        <a href="contact.html" ${page === 'contact' ? 'aria-current="page"' : ''}>
          Contact
        </a>
        <span class="nav-smile" aria-hidden="true">&lt;3</span>
      </nav>
    </div>
    ${page === 'contact' || page === 'home' ? /* HTML */ `<svg class="header-line" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true">` + (page === 'home' ? homeBackdrop : '') + '<defs><linearGradient id="contact-wave"><stop stop-color="#c9c7c8"/><stop offset=".45" stop-color="#c9c7c8"/><stop offset=".6" stop-color="#9cc286"/></linearGradient></defs><path d="M0 52C155 70 212-12 343 15S526 34 648 9 816 12 921 39 1070 10 1183 17 1344 56 1440 48" fill="none" stroke="url(#contact-wave)" stroke-width="2"/></svg>' : ''}
  </header>
`;
const footer = /* HTML */ `
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-note">
        <div class="footer-socials">
          <span class="social-icon" role="img" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="5"
                stroke="currentColor"
                stroke-width="2"
              />
              <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2" />
              <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
            </svg>
          </span>
          <span class="social-icon" role="img" aria-label="YouTube">
            <svg viewBox="0 0 28 24" aria-hidden="true">
              <rect x="1" y="4" width="26" height="16" rx="4" fill="currentColor" />
              <path d="m11 8 7 4-7 4Z" fill="#afcb9c" />
            </svg>
          </span>
        </div>
        <a class="footer-email" href="mailto:re.pixel@hotmail.com">
          re.pixel@hotmail.com
        </a>
        <address>1901 Thornridge Cir. Shiloh, Hawaii 81063</address>
      </div>
    </div>
  </footer>
`;
const members = [
  { name: 'Sophia Hoffman', photo: 'web/sophiah.png', position: '35% 58%' },
  { name: 'Lauren Patton', photo: 'web/lauren.png', position: '50% 35%' },
  {
    name: 'Cameron Chamusco',
    photo: 'web/cameronjpg.png',
    position: '50% 24%',
  },
  {
    name: 'Lynette Hemingway',
    photo: 'web/LynetteH-93914b3f28.png',
    position: '50% 30%',
  },
  { name: 'Sofia Godoy', photo: 'web/sophiag.png', position: '50% 35%' },
];
const team = /* HTML */ `
  <main id="main" class="team-main">
    <section class="about-section">
      <div class="about-heading">
        <h1>
          About Us
          <span>from outer space.</span>
        </h1>
        ${alien('about-alien')}
      </div>
      <p class="about-copy">
        We are an independent game studio. We consist of artists, animators, designers,
        and more! We aim to create games that bring whimsy and joy to people’s lives.
      </p>
      <img
        class="team-photo"
        src="assets/web/team.png"
        alt="The Re:Pixel Studio team working together in the studio"
        width="2880"
        height="2160"
        decoding="async"
      />
    </section>
    <section class="founders" aria-labelledby="founders-title">
      <h2 id="founders-title">Founding Members</h2>
      <p class="subheading">Who brought you Gleep Glorp Adventures</p>
      <div class="member-grid">
        ${members
          .map(
            ({ name, photo, position }) => /* HTML */ `
              <article class="member">
                ${
                  photo
                    ? /* HTML */ `
                        <img
                          class="avatar"
                          src="assets/${photo}"
                          alt="${name}"
                          width="320"
                          height="320"
                          loading="lazy"
                          decoding="async"
                          style="object-position:${position}"
                        />
                      `
                    : /* HTML */ `
                        <div
                          class="avatar"
                          role="img"
                          aria-label="Photo of ${name} coming soon"
                        ></div>
                      `
                }
                <h3>${name.split(' ').join('<br>')}</h3>
              </article>
            `,
          )
          .join('')}
      </div>
    </section>
  </main>
  ${waves(true)}${footer}
`;
const contact = /* HTML */ `
  <main id="main" class="contact-main">
    <section class="contact-panel">
      <p class="eyebrow">Say hello!</p>
      <h1>Contact Us</h1>
      <p class="contact-intro">We would love to connect and hear from you!</p>
      <form id="contact-form">
        <label for="name">Name</label>
        <input id="name" name="name" autocomplete="name" required maxlength="100" />
        <label for="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autocomplete="email"
          required
          maxlength="254"
        />
        <label for="message">What’s on your mind?</label>
        <textarea id="message" name="message" required maxlength="5000"></textarea>
        <div class="form-bottom">
          <p id="form-status" role="status">Your message will open in your email app.</p>
          <button class="button green" type="submit">
            Say Hello
            <span aria-hidden="true">⟶</span>
          </button>
        </div>
      </form>
    </section>
  </main>
  ${waves(true)}${footer}
`;
const games = /* HTML */ `
  <main id="main" class="games-main">
    <section id="games" class="game-intro" aria-labelledby="games-title">
      <div>
        <h1 id="games-title">
          Gleep Glorp Adventures
          <span>from outer space.</span>
        </h1>
        <p>
          Gleep Glorp Adventures from Outer Space is a single player game where you take
          the role of a pizza delivery alien cat! Use cool abilities, timing, and the
          vastness of out of this world to deliver as many pizzas as possible.
        </p>
      </div>
      <img
        class="pizza-badge"
        src="game_assets/image%2021.png"
        alt=""
        width="470"
        height="471"
      />
    </section>
    <div class="game-preview" role="img" aria-label="Gameplay preview coming soon">
      <span>Gameplay preview coming soon</span>
    </div>
    <section class="play-section" aria-labelledby="play-title">
      <h2 id="play-title">Play Now!</h2>
      <p class="subheading">Gleep Glorp is waiting</p>
      <div class="store-panel">
        <div class="store-badges">
          <img
            src="game_assets/image%2020.png"
            alt="Steam"
            width="718"
            height="338"
            loading="lazy"
          />
          <img
            src="game_assets/image%2022.png"
            alt="Epic Games Store"
            width="696"
            height="364"
            loading="lazy"
          />
        </div>
        <p>join gleep glorp on their pizza journey in the galaxy.</p>
        <p class="store-status">Store links coming soon.</p>
      </div>
    </section>
  </main>
  ${waves(true)}${footer}
`;
const home = /* HTML */ `
  <main id="main" class="home-main">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow">small worlds, big imagination.</p>
        <h1 id="hero-title">
          Just games
          <br />
          <span>from outer space.</span>
        </h1>
        <a class="button blue" href="games.html">
          See our Games
          <span aria-hidden="true">&#10230;</span>
        </a>
      </div>
      <div class="hero-art">
        <div class="orbit-blob"></div>
        <img class="planet" src="assets/planet.png" alt="" width="153" height="98" />
        <img
          class="spark spark-one"
          src="assets/sparkle.png"
          alt=""
          width="190"
          height="207"
        />
        <img
          class="spark spark-two"
          src="assets/sparkle.png"
          alt=""
          width="190"
          height="207"
        />
        ${alien('hero-alien')}
        <img
          class="speech"
          src="assets/bubble.png"
          alt="Join me in Gleep Glorp's pizza adventure!"
          width="616"
          height="601"
        />
      </div>
    </section>
    <section id="games" class="game-card" aria-labelledby="game-title">
      <div class="game-copy">
        <p class="featured">
          <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <path
              d="m20 3 4.8 11.8L37 16l-9.2 8.1 2.8 12L20 29.7 9.4 36l2.8-11.9L3 16l12.2-1.2Z"
              stroke="currentColor"
              stroke-width="3"
              stroke-linejoin="round"
            />
          </svg>
          Featured Game
        </p>
        <h2 id="game-title">
          <span class="game-title-line">
            Gleep Glorp’s
            <svg class="game-burst" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <path
                d="M31 5v12M50 13l-8 9M59 33H47M50 52l-9-9M31 59V47M12 51l8-9M5 31h12M13 12l8 9"
                stroke="currentColor"
                stroke-width="5"
                stroke-linecap="round"
              />
            </svg>
          </span>
          <br />
          <span>Pizza Adventure!</span>
        </h2>
        <p>Join Gleep Glorp on their pizza journey in the galaxy.</p>
      </div>
      <div class="game-art">
        <img class="pizza" src="assets/pizza.png" alt="" width="744" height="792" />
      </div>
      <svg class="leaves" viewBox="0 0 120 170" fill="none" aria-hidden="true">
        <path
          d="M86 166C74 112 54 70 24 32m44 70 17-60"
          stroke="#63866a"
          stroke-width="4"
        />
        <g fill="#cedbb5" stroke="#63866a" stroke-width="3">
          <path
            d="M42 54C16 52 6 33 5 20c23-1 39 8 37 34ZM55 79C37 65 36 36 45 14c22 14 26 41 10 65ZM70 112C42 115 24 97 18 81c23-3 45 6 52 31ZM75 83C70 54 87 28 99 21c7 29-4 47-24 62ZM82 134c0-29 19-47 33-48-1 29-15 43-33 48Z"
          />
        </g>
      </svg>
      <a class="button green game-button" href="games.html">
        View Game
        <span aria-hidden="true">&#10230;</span>
      </a>
    </section>
  </main>
  ${waves(true)}${footer}
`;
document.getElementById('app').innerHTML =
  header + ({ home, games, team, contact }[page] || home);
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');
const mobileMenu = window.matchMedia('(max-width: 650px)');
let menuOpen = false;
function setMenu(open, returnFocus = false) {
  menuOpen = mobileMenu.matches && open;
  menuToggle.setAttribute('aria-expanded', String(menuOpen));
  menuToggle.setAttribute('aria-label', menuOpen ? 'Close menu' : 'Open menu');
  mainNav.hidden = mobileMenu.matches && !menuOpen;
  if (returnFocus) menuToggle.focus();
}
menuToggle.addEventListener('click', () => setMenu(!menuOpen));
mainNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuOpen) setMenu(false, true);
});
document.addEventListener('pointerdown', (event) => {
  if (menuOpen && !mainNav.contains(event.target) && !menuToggle.contains(event.target))
    setMenu(false);
});
mainNav.addEventListener('focusout', (event) => {
  if (
    menuOpen &&
    !mainNav.contains(event.relatedTarget) &&
    !menuToggle.contains(event.relatedTarget)
  )
    setMenu(false);
});
mobileMenu.addEventListener('change', () => {
  const focusWasInNav = mainNav.contains(document.activeElement);
  setMenu(false, mobileMenu.matches && focusWasInNav);
});
window.addEventListener('pageshow', () => setMenu(false));
setMenu(false);
// Reuse the header's scalloped edge as a curtain between local pages.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const curtain = document.createElement('div');
curtain.className = 'page-curtain';
curtain.setAttribute('aria-hidden', 'true');
curtain.innerHTML = alien('curtain-alien');
document.body.append(curtain);
let navigating = false;
let curtainAnimation;
function resetCurtain() {
  navigating = false;
  curtainAnimation?.cancel();
  curtain.classList.remove('is-covering');
}
window.addEventListener('pageshow', resetCurtain);
document.addEventListener('click', async (event) => {
  const link = event.target.closest('a[href]');
  if (
    !link ||
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    link.hasAttribute('download') ||
    (link.target && link.target !== '_self')
  )
    return;
  const destination = new URL(link.href, window.location.href);
  const currentPath = window.location.pathname.replace(/\/$/, '/index.html');
  if (
    destination.origin !== window.location.origin ||
    !/\/(index|games|team|contact)\.html$/.test(destination.pathname) ||
    destination.pathname === currentPath ||
    motionPreference.matches ||
    !curtain.animate
  )
    return;
  event.preventDefault();
  if (navigating) return;
  navigating = true;
  curtain.classList.add('is-covering');
  curtainAnimation = curtain.animate(
    [{ transform: 'translateY(calc(-100% - 30px))' }, { transform: 'translateY(0)' }],
    { duration: 260, easing: 'cubic-bezier(.55, 0, .2, 1)', fill: 'forwards' },
  );
  try {
    await curtainAnimation.finished;
  } catch {
    resetCurtain();
    return;
  }
  try {
    sessionStorage.setItem('repixel-curtain', 'open');
  } catch {
    /* Navigation still works with storage disabled. */
  }
  window.location.assign(destination.href);
});
try {
  if (sessionStorage.getItem('repixel-curtain')) {
    sessionStorage.removeItem('repixel-curtain');
    if (!motionPreference.matches) curtain.classList.add('is-arriving');
  }
} catch {
  /* Storage is optional. */
}
curtain.addEventListener('animationend', (event) => {
  if (event.target === curtain) curtain.classList.remove('is-arriving');
});

// Reveal once, so scrolling back never hides content the visitor has already read.
if (!motionPreference.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-pending');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  document
    .querySelectorAll(
      '.game-card, .game-preview, .play-section, .team-photo, .founders, .member',
    )
    .forEach((element, index) => {
      element.style.setProperty('--reveal-delay', `${Math.min(index, 4) * 60}ms`);
      element.classList.add('reveal-item', 'reveal-pending');
      observer.observe(element);
    });
  motionPreference.addEventListener('change', () => {
    if (motionPreference.matches) {
      document
        .querySelectorAll('.reveal-pending')
        .forEach((element) => element.classList.remove('reveal-pending'));
      observer.disconnect();
    }
  });
}
document.getElementById('contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Hello Re:Pixel — from ${data.get('name')}`);
  const body = encodeURIComponent(
    `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`,
  );
  // Add the studio's confirmed address here before launch.
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
  document.getElementById('form-status').textContent =
    'Email draft opened. Add the studio’s email address before sending. Your message is still here if you need to copy it.';
});
