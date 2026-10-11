// Navbar Fixed
window.onscroll = function() {
    const header = document.querySelector('header');
    const fixedNav = header.offsetTop;
    const toTop = document.querySelector('#to-top');

    if(window.pageYOffset > fixedNav) {
        header.classList.add('navbar-fixed');
        toTop.classList.remove('hidden');
        toTop.classList.add('flex');
    } else {
        header.classList.remove('navbar-fixed');
        toTop.classList.remove('flex');
        toTop.classList.add('hidden');
    }
};

// Hamburger
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('hamburger-active');
    navMenu.classList.toggle('hidden');
});

// Click diluar Hamburger
window.addEventListener('click', function(e) {
    if(e.target != hamburger && e.target != navMenu) {
        hamburger.classList.remove('hamburger-active');
        navMenu.classList.add('hidden');
    }
});

// Dark Mode Toggle
const darkToggle = document.querySelector('#dark-toggle');
const html = document.querySelector('html');

darkToggle.addEventListener('click', function() {
    if(darkToggle.checked){
        html.classList.add('dark');
        localStorage.theme = 'dark';
    } else {
        html.classList.remove('dark');
        localStorage.theme = 'light';
    }
});

// pindahkan posisi toggle sesuai mode
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    darkToggle.checked = true;
  } else {
    darkToggle.checked = false;
  }

// Portfolio: show more projects and open project details
const projectCards = document.querySelectorAll('.project-card');
const showAllProjects = document.querySelector('#show-all-projects');
const showAllArrow = document.querySelector('#show-all-arrow');
const projectModal = document.querySelector('#project-modal');
const closeProjectModal = document.querySelector('#close-project-modal');

showAllProjects.addEventListener('click', function() {
    const isExpanded = showAllProjects.getAttribute('aria-expanded') === 'true';

    projectCards.forEach(function(card, index) {
        if (index >= 4) {
            card.classList.toggle('hidden', isExpanded);
        }
    });

    showAllProjects.setAttribute('aria-expanded', String(!isExpanded));
    showAllProjects.querySelector('span').textContent = isExpanded ? 'Lihat semua proyek' : 'Tampilkan lebih sedikit';
    showAllArrow.classList.toggle('rotate-180', !isExpanded);
});

projectCards.forEach(function(card) {
    const imageButton = card.querySelector('.project-image-button');

    imageButton.addEventListener('click', function() {
        const image = imageButton.querySelector('img');

        projectModal.querySelector('#modal-project-image').src = image.src;
        projectModal.querySelector('#modal-project-image').alt = image.alt;
        projectModal.querySelector('#modal-project-title').textContent = card.querySelector('h3').textContent;
        projectModal.querySelector('#modal-project-description').textContent = card.querySelector('.project-description').textContent;
        projectModal.showModal();
    });
});

closeProjectModal.addEventListener('click', function() {
    projectModal.close();
});

projectModal.addEventListener('click', function(event) {
    if (event.target === projectModal) {
        projectModal.close();
    }
});