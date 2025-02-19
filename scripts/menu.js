document.querySelector('.menu-button').addEventListener('click', () => {
    const menu = document.querySelector('.menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

document.querySelector('.close-menu').addEventListener('click', () => {
    const menu = document.querySelector('.menu');
    menu.style.display = 'none';
});