/**
* Objective: To combine and projects.
* Author:
* Date Created:
* Modified:
*/

//Will be displaying hamburger buttons when diaply is less than 960px.
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav-items");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
});

//To popup modal.
const newsletterButton = document.querySelectorAll(".newsletter");
const modal = document.querySelector(".modal");
newsletterButton.forEach(button => {
    button.addEventListener("click", () => {
        modal.classList.add("show");
    });
});

///To hide modal.
const close = document.querySelector(".close");
close.addEventListener("click", () => {
    modal.classList.remove("show");
});

//To show/hide accordions.
const accordions = document.querySelectorAll(".accordions .title");
accordions.forEach(accordion => {
    accordion.addEventListener("click", event => {
        event.target.classList.toggle("active");
        event.target.nextElementSibling.classList.toggle("active");
    })
});


function updateCarousel(){
    var swiper = new Swiper(".mySwiper", {
        //will be changing based on screen size.
        slidesPerView: window.innerWidth < 960 ? 1 : 2, // number of slides to show at a time.
        spaceBetween: 150,
        slidesPerGroup: window.innerWidth < 960 ? 1 : 1, //shift 1 slide per click
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
        el: ".swiper-pagination",
        clickable: true,
        },
        navigation: {
        nextEl: ".swiper-next",
        prevEl: ".swiper-prev",
        },
    });
}
updateCarousel();
//To monitor the display size.
window.onresize = () => {
    updateCarousel();
}

