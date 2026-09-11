"use strict";

/* =========================================================
   DOM ELEMENTS
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const header = document.querySelector(".header");

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("#navMenu a");

const buttons = document.querySelectorAll(".btn, .submit-btn");
const images = document.querySelectorAll("img");


/* =========================================================
   MOBILE MENU
========================================================= */

if (menuBtn && navMenu) {

    const closeMenu = () => {

        navMenu.classList.remove("active");
        menuBtn.classList.remove("active");

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

        menuBtn.setAttribute(
            "aria-label",
            "Open navigation menu"
        );
    };


    const openMenu = () => {

        navMenu.classList.add("active");
        menuBtn.classList.add("active");

        menuBtn.setAttribute(
            "aria-expanded",
            "true"
        );

        menuBtn.setAttribute(
            "aria-label",
            "Close navigation menu"
        );
    };


    /* Toggle menu */

    menuBtn.addEventListener("click", event => {

        event.stopPropagation();

        const isOpen =
            navMenu.classList.contains("active");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    });


    /* Close after clicking navigation link */

    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {
            closeMenu();
        });

    });


    /* Close with Escape */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            navMenu.classList.contains("active")
        ) {

            closeMenu();

            menuBtn.focus();
        }

    });


    /* Close when clicking outside */

    document.addEventListener("click", event => {

        if (
            !navMenu.classList.contains("active")
        ) {
            return;
        }


        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedButton =
            menuBtn.contains(event.target);


        if (
            !clickedInsideMenu &&
            !clickedButton
        ) {

            closeMenu();

        }

    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

if (revealElements.length > 0) {

    /*
     * Hide elements before animation.
     * CSS controls the actual animation.
     */

    revealElements.forEach(element => {

        element.classList.add(
            "reveal-hidden"
        );

    });


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        entry.target.classList.remove(
                            "reveal-hidden"
                        );

                        entry.target.classList.add(
                            "reveal-show"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -60px 0px"
                }

            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        /* Fallback */

        revealElements.forEach(element => {

            element.classList.remove(
                "reveal-hidden"
            );

            element.classList.add(
                "reveal-show"
            );

        });

    }

}


/* =========================================================
   STAGGER ANIMATION
========================================================= */

const cardGroups = [

    ".services-grid .service-card",

    ".projects-grid .project-card",

    ".why-grid .why-card",

    ".process-grid .process-item",

    ".about-stats .stat-box"

];


cardGroups.forEach(selector => {

    const cards =
        document.querySelectorAll(selector);


    cards.forEach((card, index) => {

        card.style.setProperty(
            "--stagger-delay",
            `${index * 0.10}s`
        );

    });

});


/* =========================================================
   HEADER + ACTIVE NAVIGATION
========================================================= */

function updateNavigation() {

    const scrollPosition =
        window.scrollY;


    /* -------------------------------------------------------
       Header Shadow
    ------------------------------------------------------- */

    if (header) {

        header.classList.toggle(
            "scrolled",
            scrollPosition > 30
        );

    }


    /* -------------------------------------------------------
       Active Navigation
    ------------------------------------------------------- */

    let currentSection = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 160;

        const sectionBottom =
            sectionTop +
            section.offsetHeight;


        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionBottom
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        const href =
            link.getAttribute("href");


        const isActive =
            href === `#${currentSection}`;


        link.classList.toggle(
            "active",
            isActive
        );

    });

}


/* Run once */

updateNavigation();


/* Update on scroll */

window.addEventListener(
    "scroll",
    updateNavigation,
    {
        passive: true
    }
);


/* =========================================================
   SMOOTH ANCHOR BEHAVIOR
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");


            /* Ignore empty # */

            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


/* =========================================================
   CONTACT FORM
   Formspree handles actual submission.
========================================================= */

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        () => {

            const submitButton =
                contactForm.querySelector(
                    ".submit-btn"
                );


            /* Show sending message */

            if (formMessage) {

                formMessage.textContent =
                    "Sending your message...";

            }


            /* Disable submit button */

            if (submitButton) {

                submitButton.disabled = true;

                submitButton.textContent =
                    "Sending...";

            }

        }
    );

}


/* =========================================================
   BUTTON CLICK EFFECT
========================================================= */

buttons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            button.classList.add(
                "clicked"
            );


            window.setTimeout(() => {

                button.classList.remove(
                    "clicked"
                );

            }, 250);

        }
    );

});


/* =========================================================
   IMAGE LOADING
========================================================= */

images.forEach(image => {

    /*
     * Image is already loaded
     */

    if (image.complete) {

        image.classList.add(
            "loaded"
        );

        return;
    }


    /*
     * Wait until image loads
     */

    image.addEventListener(
        "load",
        () => {

            image.classList.add(
                "loaded"
            );

        },
        {
            once: true
        }
    );


    /*
     * Handle broken images
     */

    image.addEventListener(
        "error",
        () => {

            image.classList.add(
                "loaded"
            );

        },
        {
            once: true
        }
    );

});


/* =========================================================
   RESIZE HANDLING
========================================================= */

let resizeTimer = null;


window.addEventListener(
    "resize",
    () => {

        clearTimeout(resizeTimer);


        resizeTimer = setTimeout(() => {

            /*
             * Close mobile menu when
             * switching to desktop.
             */

            if (
                window.innerWidth > 900 &&
                navMenu &&
                menuBtn
            ) {

                navMenu.classList.remove(
                    "active"
                );

                menuBtn.classList.remove(
                    "active"
                );

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            }


            updateNavigation();

        }, 150);

    },
    {
        passive: true
    }
);


/* =========================================================
   PAGE READY
========================================================= */

function pageReady() {

    document.body.classList.add(
        "page-ready"
    );

}


/*
 * DOMContentLoaded
 */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        pageReady,
        {
            once: true
        }
    );

} else {

    pageReady();

}


/* =========================================================
   REDUCED MOTION SUPPORT
========================================================= */

const reducedMotionQuery =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


function handleReducedMotion(event) {

    if (!event.matches) {
        return;
    }


    revealElements.forEach(element => {

        element.classList.remove(
            "reveal-hidden"
        );

        element.classList.add(
            "reveal-show"
        );

        element.style.transitionDelay =
            "0s";

    });

}


/* Initial check */

handleReducedMotion(
    reducedMotionQuery
);


/* Watch for system preference changes */

if (
    typeof reducedMotionQuery.addEventListener ===
    "function"
) {

    reducedMotionQuery.addEventListener(
        "change",
        handleReducedMotion
    );

}


/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.log(
    "Grandstone Construction website loaded successfully."
);