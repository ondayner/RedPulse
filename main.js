document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar iconos de Lucide al cargar
    if (window.lucide) {
        lucide.createIcons();
    }

    // 2. Control del Menú Móvil
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.getElementById('nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            const isHidden = navList.classList.contains('hidden');
            
            if (isHidden) {
                // ABRIR MENÚ
                navList.classList.remove('hidden');
                navList.classList.add('flex');
                document.body.classList.add('overflow-hidden');
                menuToggle.innerHTML = '<i data-lucide="x" class="w-7 h-7"></i>';
            } else {
                // CERRAR MENÚ
                navList.classList.add('hidden');
                navList.classList.remove('flex');
                document.body.classList.remove('overflow-hidden');
                menuToggle.innerHTML = '<i data-lucide="menu" class="w-7 h-7"></i>';
            }
            
            if (window.lucide) {
                lucide.createIcons();
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 768 && !navList.classList.contains('hidden')) {
                    navList.classList.add('hidden');
                    navList.classList.remove('flex');
                    document.body.classList.remove('overflow-hidden');
                    
                    menuToggle.innerHTML = '<i data-lucide="menu" class="w-7 h-7"></i>';
                    if (window.lucide) {
                        lucide.createIcons();
                    }
                }
            });
        });
    }

    // 3. Efecto Header en Scroll
    const header = document.getElementById('navbar-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                header.classList.add('bg-sand-50/90', 'backdrop-blur-md', 'shadow-sm', 'py-3');
                header.classList.remove('py-4');
            } else {
                header.classList.remove('bg-sand-50/90', 'backdrop-blur-md', 'shadow-sm', 'py-3');
                header.classList.add('py-4');
            }
        });
    }

    // 4. Animaciones al hacer Scroll (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // 5. Calculadora Dinámica de Rutas
    const serviceSelect = document.getElementById('calc-service');
    const distanceInput = document.getElementById('calc-distance');
    const distanceVal = document.getElementById('distance-val');
    const calcResult = document.getElementById('calc-result');

    const rates = {
        ejecutivo: 8, 
        personal: 5,
        carga: 10
    };

    function updateCalculation() {
        if (!distanceInput || !serviceSelect || !distanceVal || !calcResult) return;
        const dist = parseInt(distanceInput.value) || 0;
        const service = serviceSelect.value;
        distanceVal.textContent = `${dist} km`;

        const rate = rates[service] || 0;
        const totalEstimated = dist * rate + 50;
        calcResult.textContent = `$${totalEstimated} USD / mes`;
    }

    if (distanceInput && serviceSelect) {
        distanceInput.addEventListener('input', updateCalculation);
        serviceSelect.addEventListener('change', updateCalculation);
    }

    // 6. Formulario de Contacto (Mailto)
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const formToast = document.getElementById('form-toast');

    const DESTINATION_EMAIL = 'nexum@gmail.com';

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            submitBtn.disabled = true;
            btnText.textContent = 'Procesando Envío Seguro...';
            submitBtn.classList.add('opacity-80', 'cursor-not-allowed');

            setTimeout(() => {
                const subject = `[Nueva Alianza Logística] - ${name}`;
                const body = 
`Hola Equipo Nexum,

Se ha recibido un nuevo requerimiento a través del sitio web:

• Cliente/Empresa: ${name}
• Correo de contacto: ${email}

• Requerimiento:
${message}

---
Mensaje enviado desde el formulario web.`;

                const mailtoUrl = `mailto:${DESTINATION_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                window.location.href = mailtoUrl;

                submitBtn.disabled = false;
                btnText.textContent = 'Abriendo App de Correo...';
                submitBtn.classList.remove('opacity-80', 'cursor-not-allowed');
                submitBtn.classList.replace('bg-sand-900', 'bg-emerald-800');

                formToast.classList.remove('hidden', 'bg-red-100', 'text-red-800');
                formToast.classList.add('bg-sand-200', 'text-sand-900', 'block');
                formToast.innerHTML = `✨ <strong>¡Gracias, ${name}!</strong> Se ha preparado el correo para <u>${DESTINATION_EMAIL}</u>. Por favor confirma el envío en tu aplicación de correo.`;

                contactForm.reset();

                setTimeout(() => {
                    btnText.textContent = 'Enviar Mensaje Directo';
                    submitBtn.classList.replace('bg-emerald-800', 'bg-sand-900');
                    formToast.classList.add('hidden');
                }, 6000);

            }, 1000);
        });
    }
});