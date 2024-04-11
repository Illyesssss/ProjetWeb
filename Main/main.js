const menuHamburger = document.querySelector(".menu-slide");	
const navLinks = document.querySelector(".nav-link");

menuHamburger.addEventListener('click',()=>{
    navLinks.classList.toggle('mobile-menu')
})