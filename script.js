document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // ELEMENTOS PRINCIPALES
    // ==========================================

    const loader = document.getElementById("loader");
    const intro = document.getElementById("intro");
    const site = document.getElementById("site");
    const enterButton = document.getElementById("enter");


    // ==========================================
    // LOADER
    // ==========================================

    function hideLoader() {
        if (!loader) return;

        setTimeout(() => {
            loader.classList.add("hide");
        }, 1800);
    }

    window.addEventListener("load", hideLoader);

    // Seguridad: si la página tarda demasiado
    setTimeout(() => {
        if (loader && !loader.classList.contains("hide")) {
            loader.classList.add("hide");
        }
    }, 5000);


    // ==========================================
    // BOTÓN ENTRAR
    // ==========================================

    if (enterButton && intro && site) {

        enterButton.addEventListener("click", () => {

            enterButton.disabled = true;

            intro.style.transition =
                "opacity 1s ease, transform 1s ease";

            intro.style.opacity = "0";
            intro.style.transform = "scale(1.08)";

            setTimeout(() => {

                intro.style.display = "none";

                site.classList.remove("hidden");

                window.scrollTo({
                    top: 0,
                    behavior: "auto"
                });

                revealElements();

            }, 900);
        });
    }


    // ==========================================
    // MENÚ DE NAVEGACIÓN
    // ==========================================

    const menuLinks = document.querySelectorAll('a[href^="#"]');

    menuLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // ==========================================
    // ANIMACIONES AL HACER SCROLL
    // ==========================================

    let revealObserver = null;

    function revealElements() {

        const elements = document.querySelectorAll(".reveal");

        // Si el navegador no soporta IntersectionObserver
        if (!("IntersectionObserver" in window)) {

            elements.forEach(element => {
                element.classList.add("active");
            });

            return;
        }

        // Si ya existe el observer
        if (revealObserver) {

            elements.forEach(element => {
                revealObserver.observe(element);
            });

            return;
        }

        revealObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("active");

                        revealObserver.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        elements.forEach(element => {
            revealObserver.observe(element);
        });
    }


    // ==========================================
    // LUCES QUE SIGUEN EL MOUSE
    // ==========================================

    const lights = document.querySelectorAll(".light");

    if (
        lights.length > 0 &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        document.addEventListener("mousemove", event => {

            const x =
                (event.clientX / window.innerWidth - 0.5) * 2;

            const y =
                (event.clientY / window.innerHeight - 0.5) * 2;

            lights.forEach((light, index) => {

                const amount = (index + 1) * 8;

                light.style.translate =
                    `${x * amount}px ${y * amount}px`;

            });

        });

    }


    // ==========================================
    // EFECTO DE CHISPAS AL HACER CLICK
    // ==========================================

    document.addEventListener("click", event => {

        createSpark(
            event.clientX,
            event.clientY
        );

    });


    // ==========================================
    // CREAR CHISPA
    // ==========================================

    function createSpark(x, y) {

        const spark = document.createElement("span");

        // Posición
        spark.style.position = "fixed";
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;

        // Tamaño
        spark.style.width = "5px";
        spark.style.height = "5px";

        // Forma
        spark.style.borderRadius = "50%";

        // Colores y brillo
        spark.style.background = "#ffffff";

        spark.style.boxShadow =
            "0 0 10px #ffffff, 0 0 25px #ff1744";

        // No bloquear clicks
        spark.style.pointerEvents = "none";

        // Encima de todo
        spark.style.zIndex = "9999";

        // Agregar al documento
        document.body.appendChild(spark);


        // ======================================
        // DIRECCIÓN DE LA CHISPA
        // ======================================

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            30 + Math.random() * 70;

        const endX =
            Math.cos(angle) * distance;

        const endY =
            Math.sin(angle) * distance;


        // ======================================
        // ANIMACIÓN
        // ======================================

        const animation = spark.animate(

            [
                {
                    transform:
                        "translate(-50%, -50%) scale(1)",

                    opacity: 1
                },

                {
                    transform:
                        `translate(calc(-50% + ${endX}px), calc(-50% + ${endY}px)) scale(0)`,

                    opacity: 0
                }
            ],

            {
                duration: 700,
                easing: "ease-out",
                fill: "forwards"
            }

        );


        // Eliminar chispa cuando termina
        animation.onfinish = () => {
            spark.remove();
        };

    }


    // ==========================================
    // EFECTO 3D EN LAS MOTOS
    // ==========================================

    const bikeCards =
        document.querySelectorAll(".bike-card");


    bikeCards.forEach(card => {

        card.addEventListener("mousemove", event => {

            // Solo en computadora
            if (
                !window.matchMedia("(pointer: fine)").matches
            ) {
                return;
            }

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            // Calcular rotación
            const rotateY =
                ((x / rect.width) - 0.5) * 8;

            const rotateX =
                ((y / rect.height) - 0.5) * -8;


            // Aplicar efecto 3D
            card.style.transform =
                `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;

        });


        // Regresar a posición normal
        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";

        });

    });


    // ==========================================
    // INICIAR ANIMACIONES SI EL SITIO YA ESTÁ VISIBLE
    // ==========================================

    if (
        site &&
        !site.classList.contains("hidden")
    ) {

        revealElements();

    }


    // ==========================================
    // SEGURIDAD PARA LAS ANIMACIONES
    // ==========================================

    setTimeout(() => {

        if (
            site &&
            !site.classList.contains("hidden")
        ) {

            revealElements();

        }

    }, 2500);


});