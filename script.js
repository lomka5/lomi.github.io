// Language translations
const translations = {
    en: {
        logo: "LOMI",
        title: "Web Designer",
        social: {
            telegram: "Telegram",
            github: "GitHub",
            youtube: "YouTube",
            steam: "Steam"
        }
    },
    ru: {
        logo: "ЛОМИ",
        title: "Веб-дизайнер",
        social: {
            telegram: "Телеграм",
            github: "Гитхаб",
            youtube: "Ютуб",
            steam: "Стим"
        }
    }
};

// Default language
let currentLang = 'en';

// Social media data
const socialMedia = [
    { name: 'telegram', icon: '📱', link: 'https://t.me/solomka_topka' },
    { name: 'github', icon: '🐙', link: 'https://github.com/lomka5' },
    { name: 'youtube', icon: '📺', link: 'https://www.youtube.com/channel/UCOGI5GhA6Fc0Ctwc62c7w1Q' },
    { name: 'steam', icon: '🎮', link: 'https://steamcommunity.com/id/kapysta_killer/' }
];

// DOM elements
const logoEl = document.getElementById('logo');
const titleEl = document.querySelector('#title h1');
const professionEl = document.querySelector('#title h2');
const langRuBtn = document.getElementById('lang-ru');
const langEnBtn = document.getElementById('lang-en');
const socialCardsEl = document.getElementById('social-cards');
const customCursor = document.getElementById('custom-cursor');

// Initialize
function init() {
    // Load language from localStorage or browser
    const storedLang = localStorage.getItem('lomi-lang');
    if (storedLang) {
        currentLang = storedLang;
    } else {
        currentLang = navigator.language.startsWith('ru') ? 'ru' : 'en';
    }

    // Set active button
    if (currentLang === 'ru') {
        langRuBtn.classList.add('active');
        langEnBtn.classList.remove('active');
    } else {
        langEnBtn.classList.add('active');
        langRuBtn.classList.remove('active');
    }

    // Update UI
    updateLanguage();

    // Render social cards
    renderSocialCards();

    // Add event listeners
    langRuBtn.addEventListener('click', () => switchLanguage('ru'));
    langEnBtn.addEventListener('click', () => switchLanguage('en'));

    // Custom cursor
    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = e.pageX + 'px';
        customCursor.style.top = e.pageY + 'px';
    });

    // Cursor hover effects on social cards
    socialCardsEl.addEventListener('mouseover', (e) => {
        if (e.target.closest('.social-card')) {
            customCursor.classList.add('hover');
        }
    });

    socialCardsEl.addEventListener('mouseout', (e) => {
        if (!e.target.closest('.social-card')) {
            customCursor.classList.remove('hover');
        }
    });

    // Pixel launch animation (only if not reduced motion)
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        showPixelLaunch();
    }

    // Easter egg: Konami code or secret sequence
    let easterEggSequence = [];
    const secretCode = ['l', 'o', 'm', 'i']; // typing "lomi"

    document.addEventListener('keydown', (e) => {
        easterEggSequence.push(e.key.toLowerCase());
        if (easterEggSequence.length > secretCode.length) {
            easterEggSequence.shift();
        }

        if (JSON.stringify(easterEggSequence) === JSON.stringify(secretCode)) {
            triggerEasterEgg();
            easterEggSequence = []; // reset after triggering
        }
    });
}

// Switch language
function switchLanguage(lang) {
    if (lang === currentLang) return;
    currentLang = lang;
    localStorage.setItem('lomi-lang', lang);

    // Update active buttons
    if (lang === 'ru') {
        langRuBtn.classList.add('active');
        langEnBtn.classList.remove('active');
    } else {
        langEnBtn.classList.add('active');
        langRuBtn.classList.remove('active');
    }

    updateLanguage();
}

// Update all translatable elements
function updateLanguage() {
    const t = translations[currentLang];
    logoEl.textContent = t.logo;
    professionEl.textContent = t.title;

    // Update social card labels
    document.querySelectorAll('.social-card span').forEach((span, index) => {
        const key = socialMedia[index].name;
        span.textContent = t.social[key];
    });
}

// Render social cards
function renderSocialCards() {
    socialCardsEl.innerHTML = '';
    socialMedia.forEach(platform => {
        const card = document.createElement('div');
        card.className = 'social-card';
        card.innerHTML = `
            <a href="${platform.link}" target="_blank" rel="noopener noreferrer">
                <img src="assets/${platform.name}.svg" alt="${platform.name}">
                <span></span>
            </a>
        `;
        socialCardsEl.appendChild(card);
    });

    // Update labels after adding to DOM
    updateLanguage();
}

// Pixel launch animation
function showPixelLaunch() {
    // Create a full-screen overlay with pixelated Lomi logo
    const launchOverlay = document.createElement('div');
    launchOverlay.style.position = 'fixed';
    launchOverlay.style.top = '0';
    launchOverlay.style.left = '0';
    launchOverlay.style.width = '100%';
    launchOverlay.style.height = '100%';
    launchOverlay.style.backgroundColor = '#000';
    launchOverlay.style.display = 'flex';
    launchOverlay.style.flexDirection = 'column';
    launchOverlay.style.alignItems = 'center';
    launchOverlay.style.justifyContent = 'center';
    launchOverlay.style.zIndex = '9998';
    launchOverlay.style.color = '#8a2be2';
    launchOverlay.style.fontFamily = 'Courier New, monospace';
    launchOverlay.style.fontSize = '4rem';
    launchOverlay.style.textShadow = '0 0 5px #8a2be2';
    launchOverlay.innerHTML = '<div id="pixel-logo">LOMI</div>';

    // Add some pixelated effect (we can use a simple pixel font or break into characters)
    // For simplicity, we'll just show the text and then fade out.
    document.body.appendChild(launchOverlay);

    // After 2 seconds, fade out and remove
    setTimeout(() => {
        launchOverlay.style.opacity = '0';
        launchOverlay.style.transition = 'opacity 1s';
        setTimeout(() => {
            document.body.removeChild(launchOverlay);
        }, 1000);
    }, 2000);
}

// Easter egg function
function triggerEasterEgg() {
    // Example: change the background to a fun pattern or show a hidden message
    // We'll create a hidden message div that appears in the center
    const easterEggEl = document.createElement('div');
    easterEggEl.style.position = 'fixed';
    easterEggEl.style.top = '50%';
    easterEggEl.style.left = '50%';
    easterEggEl.style.transform = 'translate(-50%, -50%)';
    easterEggEl.style.backgroundColor = 'rgba(0,0,50,0.8)';
    easterEggEl.style.color = '#8a2be2';
    easterEggEl.style.padding = '2rem';
    easterEggEl.style.borderRadius = '10px';
    easterEggEl.style.textAlign = 'center';
    easterEggEl.style.boxShadow = '0 0 20px rgba(138,43,226,0.5)';
    easterEggEl.style.zIndex = '9999';
    easterEggEl.innerHTML = '<h2>Secret Found!</h2><p>You have unlocked a hidden message.</p>';
    document.body.appendChild(easterEggEl);

    setTimeout(() => {
        easterEggEl.remove();
    }, 3000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);