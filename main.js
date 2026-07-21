tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#fff1f2',
                    100: '#ffe4e6',
                    500: '#f43f5e',
                    600: '#e11d48',
                    700: '#be123c',
                    900: '#881337',
                    glow: '#ff2a55'
                }
            }
        }
    }
}

        lucide.createIcons();

        const mobileBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        const observerOptions = {
            threshold: 0.15
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) {
        lucide.createIcons();
    }

    // --- FORMULARIO REDPULSE ---
    const redPulseForm = document.getElementById('contact-form');
    if (redPulseForm) {
        redPulseForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formBtn = document.getElementById('form-btn');
            const btnText = document.getElementById('btn-text');
            const formAlert = document.getElementById('form-alert');

            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const message = document.getElementById('form-message').value.trim();
            const DESTINATION = 'redpulse@gmail.com';

            btnText.innerText = 'Procesando Envío...';
            formBtn.disabled = true;

            setTimeout(() => {
                const subject = encodeURIComponent(`[Proyecto RedPulse] - Solicitud de ${name}`);
                const body = encodeURIComponent(
                    `Cliente: ${name}\n` +
                    `Correo: ${email}\n\n` +
                    `Detalles del Proyecto:\n${message}`
                );

                // Disparo limpio de Mailto sin romper la seguridad del Form
                window.location.assign(`mailto:${DESTINATION}?subject=${subject}&body=${body}`);

                formAlert.className = 'p-4 rounded-xl text-xs font-medium text-center bg-emerald-950 text-emerald-400 border border-emerald-800 block';
                formAlert.innerHTML = `✨ <strong>¡Gracias, ${name}!</strong> Se ha abierto tu app de correo para enviar a <u>${DESTINATION}</u>.`;

                redPulseForm.reset();

                setTimeout(() => {
                    btnText.innerText = 'Enviar Mensaje';
                    formBtn.disabled = false;
                    formAlert.className = 'hidden';
                }, 5000);
            }, 800);
        });
    }

    // --- FORMULARIO VEKTOR ---
    const vektorForm = document.getElementById('contactForm');
    if (vektorForm) {
        vektorForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('submitBtn');
            const btnText = document.getElementById('btnText');
            const formStatus = document.getElementById('formStatus');

            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const message = document.getElementById('contactMessage').value.trim();
            const DESTINATION = 'vektor@gmail.com';

            submitBtn.disabled = true;
            btnText.innerText = 'Procesando Envío...';

            setTimeout(() => {
                const subject = encodeURIComponent(`[Solicitud Vektor] - ${name}`);
                const body = encodeURIComponent(
                    `Nombre: ${name}\n` +
                    `Correo: ${email}\n\n` +
                    `Mensaje:\n${message}`
                );

                window.location.assign(`mailto:${"redpulse@gmail.com"}?subject=${subject}&body=${body}`);

                btnText.innerText = '¡App de Correo Abierta!';
                submitBtn.classList.replace('bg-brand', 'bg-green-600');

                formStatus.className = 'text-xs text-center font-bold text-green-600 block mt-2';
                formStatus.innerHTML = `✓ Preparado para enviar a <u>${DESTINATION}</u>. Confirma en tu app de correo.`;

                vektorForm.reset();

                setTimeout(() => {
                    submitBtn.disabled = false;
                    btnText.innerText = 'Enviar Solicitud';
                    submitBtn.classList.replace('bg-green-600', 'bg-brand');
                    formStatus.className = 'hidden';
                }, 5000);
            }, 800);
        });
    }
});