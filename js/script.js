/* ==========================================
   KOVAPESU
   SCRIPT.JS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       STICKY HEADER
    ========================== */

    const header = document.querySelector("header");

    let lastScroll = 0;

  window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

    header.classList.add("scrolled");

} else {

    header.classList.remove("scrolled");

}

   if (window.scrollY > lastScroll && window.scrollY > 150) {

    console.log("HIDE");
    header.classList.add("hide");

} else {

    console.log("SHOW");
    header.classList.remove("hide");

}

    lastScroll = window.scrollY;

});



    /* ==========================
       HERO ANIMATION
    ========================== */

    const heroContent = document.querySelector(".hero-content");

    if(heroContent){

        heroContent.style.opacity = "0";
        heroContent.style.transform = "translateY(40px)";
        heroContent.style.transition = "all 1s ease";

        setTimeout(() => {

            heroContent.style.opacity = "1";
            heroContent.style.transform = "translateY(0px)";

        },300);

    }



    /* ==========================
       FADE IN SECTIONS
    ========================== */

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{

        threshold:.15

    });

    document.querySelectorAll("section").forEach(section=>{

        section.classList.add("hidden");

        observer.observe(section);

    });

});

/* ==========================================
   SMOOTH SCROLL
========================================== */

const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {

    link.addEventListener("click", function(e){

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth",
                block:"start"

            });

        }

    });

});


/* ==========================================
   ACTIVE NAVIGATION
========================================== */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.clientHeight;

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});


/* ==========================================
   CARD HOVER EFFECT
========================================== */

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px) scale(1.02)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* ==========================================
   BUTTON RIPPLE EFFECT
========================================== */

const buttons = document.querySelectorAll(".primary-btn, .nav-button");

buttons.forEach(button => {

    button.addEventListener("click", function(e){

        const circle = document.createElement("span");

        const diameter = Math.max(this.clientWidth, this.clientHeight);

        circle.style.width = diameter + "px";
        circle.style.height = diameter + "px";

        circle.style.position = "absolute";
        circle.style.borderRadius = "50%";
        circle.style.background = "rgba(255,255,255,.35)";
        circle.style.left = (e.offsetX - diameter/2) + "px";
        circle.style.top = (e.offsetY - diameter/2) + "px";
        circle.style.pointerEvents = "none";
        circle.style.transform = "scale(0)";
        circle.style.transition = ".5s";

        this.style.position = "relative";
        this.style.overflow = "hidden";

        this.appendChild(circle);

        requestAnimationFrame(() => {

            circle.style.transform = "scale(3)";
            circle.style.opacity = "0";

        });

        setTimeout(() => {

            circle.remove();

        },500);

    });

});

/* ==========================================
   KOVAPESU PREMIUM EFFECTS
========================================== */

/* HERO PARALLAX */

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {

    if(hero){

        hero.style.backgroundPositionY =
            window.scrollY * 0.35 + "px";

    }

});


/* ==========================
   COUNTER ANIMATION
========================== */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            const counter = entry.target;

            const target = +counter.dataset.target;

            let current = 0;

            const speed = target / 100;

            const update = ()=>{

                current += speed;

                if(current < target){

                    counter.innerText = Math.floor(current);

                    requestAnimationFrame(update);

                }else{

                    counter.innerText = target + "+";

                }

            };

            update();

            counterObserver.unobserve(counter);

        }

    });

});

counters.forEach(counter=>{

    counterObserver.observe(counter);

});


/* ==========================
   BACK TO TOP BUTTON
========================== */

const topButton = document.createElement("button");

topButton.innerHTML = "↑";

topButton.className = "back-to-top";

document.body.appendChild(topButton);

window.addEventListener("scroll",()=>{

    if(window.scrollY > 500){

        topButton.classList.add("visible");

    }else{

        topButton.classList.remove("visible");

    }

});

topButton.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


/* ==========================
   CARD FADE DELAY
========================== */

const allCards = document.querySelectorAll(".card");

allCards.forEach((card,index)=>{

    card.style.transitionDelay = (index*0.08)+"s";

});


/* ==========================
   FOOTER YEAR
========================== */

const year = new Date().getFullYear();

const footer = document.querySelector("footer");

if(footer){

    const copyright = footer.querySelector("p:last-child");

    if(copyright){

        copyright.innerHTML = "© " + year + " KovaPesu";

    }

}

/* ==========================
   MOBILE MENU
========================== */

const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".nav-links");

console.log("Mobile menu loaded");

console.log(menuToggle);
console.log(mobileNav);

if (menuToggle && mobileNav) {

    menuToggle.addEventListener("click", () => {

        console.log("MENU CLICK");

        mobileNav.classList.toggle("active");
        menuToggle.classList.toggle("active");

        menuToggle.innerHTML =
            menuToggle.classList.contains("active") ? "✕" : "☰";

    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            mobileNav.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.innerHTML = "☰";
        });
    });

}

/* ==========================================
   FAQ ACCORDION
========================================== */

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {

    question.addEventListener("click", () => {

        const currentItem = question.parentElement;

        // Suljetaan kaikki muut
        document.querySelectorAll(".faq-item").forEach(item => {

            if (item !== currentItem) {
                item.classList.remove("active");
            }

        });

        // Avataan tai suljetaan klikattu
        currentItem.classList.toggle("active");

    });

});
