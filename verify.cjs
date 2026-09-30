const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync('app.js', 'utf8');
for (const page of ['home', 'games', 'team', 'contact']) {
  const nodes = new Map();
  function element(id) {
    if (!nodes.has(id))
      nodes.set(id, {
        innerHTML: '',
        listeners: {},
        classList: { add() {}, remove() {} },
        attributes: {},
        setAttribute(key, value) {
          this.attributes[key] = value;
        },
        contains(target) {
          return target === this;
        },
        focus() {
          this.focused = true;
        },
        addEventListener(type, callback) {
          this.listeners[type] = callback;
        },
        querySelector() {
          return element('close');
        },
        showModal() {
          this.open = true;
        },
        close() {
          this.open = false;
        },
      });
    return nodes.get(id);
  }
  const context = {
    document: {
      body: { dataset: { page }, append() {} },
      createElement() {
        return element('curtain');
      },
      addEventListener(type, callback) {
        element('document').listeners[type] = callback;
      },
      getElementById(id) {
        if (
          (id === 'game-dialog' && page !== 'home') ||
          (id === 'contact-form' && page !== 'contact')
        )
          return null;
        return element(id);
      },
    },
    window: {
      matchMedia() {
        return { matches: true, addEventListener() {} };
      },
      addEventListener() {},
      location: { href: '' },
    },
    FormData: class {
      get(key) {
        return {
          name: 'Test Visitor',
          email: 'test@example.com',
          message: 'Hello & welcome!\nPizza?',
        }[key];
      }
    },
  };
  vm.runInNewContext(source, context);
  const html = element('app')
    .innerHTML.replace(/>\s+/g, '>')
    .replace(/\s+</g, '<')
    .replace(/\s+/g, ' ')
    .trim();
  const toggle = element('menu-toggle');
  const nav = element('main-nav');
  assert.equal(nav.hidden, true);
  toggle.listeners.click();
  assert.equal(nav.hidden, false);
  assert.equal(toggle.attributes['aria-expanded'], 'true');
  element('document').listeners.keydown({ key: 'Escape' });
  assert.equal(nav.hidden, true);
  assert.equal(toggle.focused, true);
  toggle.listeners.click();
  nav.listeners.click({
    target: {
      closest() {
        return {};
      },
    },
  });
  assert.equal(nav.hidden, true);
  toggle.listeners.click();
  element('document').listeners.pointerdown({ target: {} });
  assert.equal(nav.hidden, true);
  assert.match(html, /id="main"/);
  assert.match(html, /aria-current="page"/);
  for (const destination of ['index.html', 'games.html', 'team.html', 'contact.html'])
    assert.ok(html.includes(`href="${destination}"`));
  assert.ok(html.includes('>Games</a>'));
  assert.ok(html.includes('>Home</a>'));
  assert.ok(
    html.includes('href="index.html" class="brand" aria-label="Re:Pixel Studio home"'),
  );
  const activePage = page === 'home' ? 'index' : page;
  assert.ok(html.includes(`href="${activePage}.html" aria-current="page"`));
  if (page === 'home') {
    assert.ok(html.includes('src="assets/planet.png"'));
    assert.ok(html.includes('src="assets/pizza.png"'));
  }
  for (const [, asset] of html.matchAll(/src="([^"]+)"/g))
    assert.ok(fs.existsSync(decodeURIComponent(asset)), 'Missing asset: ' + asset);
  if (page === 'games') {
    assert.match(html, /id="games"/);
    assert.match(html, /Gleep Glorp Adventures/);
    assert.match(html, /Epic Games Store/);
  }
  if (page === 'team') {
    assert.equal((html.match(/class="member"/g) || []).length, 5);
    assert.equal((html.match(/<img class="avatar"/g) || []).length, 5);
    assert.match(html, /Lauren<br>Patton/);
    assert.match(html, /Sophia<br>Hoffman/);
    assert.match(html, /Cameron<br>Chamusco/);
    assert.match(html, /Lynette<br>Hemingway/);
    assert.match(html, /Sofia<br>Godoy/);
    assert.ok(!html.includes('Lawson'));
    assert.ok(html.includes('src="assets/web/team.png"'));
  }
  if (page === 'contact') {
    assert.ok(html.includes('site-header contact-header'));
    assert.ok(html.includes('class="header-line"'));
    assert.ok(html.includes('class="site-footer"'));
    let prevented = false;
    element('contact-form').listeners.submit({
      preventDefault() {
        prevented = true;
      },
      currentTarget: {},
    });
    assert.ok(prevented);
    const draft = new URL(context.window.location.href);
    assert.equal(draft.protocol, 'mailto:');
    assert.ok(draft.searchParams.get('body').includes('Hello & welcome!\nPizza?'));
    assert.ok(element('form-status').textContent.includes('Add the studio'));
  }
  console.log(`PASS: ${page} rendering and interactions`);
}

async function verifyNavigation() {
  const classes = new Set();
  const handlers = {};
  const storage = new Map([['repixel-curtain', 'open']]);
  const preference = { matches: false, addEventListener() {} };
  const menuNode = {
    setAttribute() {},
    addEventListener() {},
    contains() {
      return false;
    },
  };
  let destination;
  let animations = 0;
  const curtain = {
    setAttribute() {},
    addEventListener(type, callback) {
      handlers[type] = callback;
    },
    classList: {
      add(value) {
        classes.add(value);
      },
      remove(value) {
        classes.delete(value);
      },
    },
    animate() {
      animations++;
      return { finished: Promise.resolve(), cancel() {} };
    },
  };
  const context = {
    URL,
    document: {
      body: { dataset: { page: 'team' }, append() {} },
      getElementById(id) {
        return id === 'app'
          ? {}
          : ['menu-toggle', 'main-nav'].includes(id)
            ? menuNode
            : null;
      },
      createElement() {
        return curtain;
      },
      addEventListener(type, callback) {
        handlers[type] = callback;
      },
    },
    window: {
      matchMedia() {
        return preference;
      },
      addEventListener(type, callback) {
        handlers[type] = callback;
      },
      location: {
        href: 'http://localhost/team.html',
        origin: 'http://localhost',
        pathname: '/team.html',
        assign(href) {
          destination = href;
        },
      },
    },
    sessionStorage: {
      getItem(key) {
        return storage.get(key);
      },
      setItem(key, value) {
        storage.set(key, value);
      },
      removeItem(key) {
        storage.delete(key);
      },
    },
  };
  vm.runInNewContext(source, context);
  assert.ok(classes.has('is-arriving'));
  assert.equal(storage.has('repixel-curtain'), false);
  handlers.animationend({ target: curtain });
  assert.equal(classes.has('is-arriving'), false);
  async function click(href, extras = {}) {
    let prevented = false;
    const link = {
      href,
      hasAttribute() {
        return false;
      },
    };
    await handlers.click({
      target: {
        closest() {
          return link;
        },
      },
      button: 0,
      preventDefault() {
        prevented = true;
      },
      ...extras,
    });
    return prevented;
  }
  assert.equal(await click('http://localhost/contact.html', { ctrlKey: true }), false);
  assert.equal(await click('https://example.com/contact.html'), false);
  assert.equal(await click('http://localhost/team.html#main'), false);
  preference.matches = true;
  assert.equal(await click('http://localhost/contact.html'), false);
  assert.equal(animations, 0);
  preference.matches = false;
  assert.equal(await click('http://localhost/contact.html'), true);
  assert.equal(destination, 'http://localhost/contact.html');
  assert.equal(storage.get('repixel-curtain'), 'open');
  assert.ok(classes.has('is-covering'));
  handlers.pageshow();
  assert.equal(classes.has('is-covering'), false);
  assert.equal(await click('http://localhost/index.html#games'), true);
  assert.equal(destination, 'http://localhost/index.html#games');
  handlers.pageshow();
  assert.equal(await click('http://localhost/games.html'), true);
  assert.equal(destination, 'http://localhost/games.html');
  console.log(
    'PASS: curtain navigation, arrival, reduced motion, modified clicks, anchors, and Back restoration',
  );
}
verifyNavigation().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
