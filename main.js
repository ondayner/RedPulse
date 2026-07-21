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
    // Inicialización de iconos Lucide
    if (window.lucide) {
        lucide.createIcons();
    }

    const contactForm = document.getElementById('contact-form');
    const formBtn = document.getElementById('form-btn');
    const btnText = document.getElementById('btn-text');
    const formAlert = document.getElementById('form-alert');

    // Correo receptor de RedPulse
    const DESTINATION_EMAIL = 'redpulse@gmail.com';

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // 1. Captura de valores
            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const message = document.getElementById('form-message').value.trim();

            // 2. Estado de carga inicial
            btnText.innerText = 'Procesando Envío...';
            formBtn.disabled = true;
            formBtn.classList.add('opacity-75', 'cursor-not-allowed');

            setTimeout(() => {
                // 3. Preparar asunto y cuerpo formateado para mailto
                const subject = encodeURIComponent(`[Proyecto RedPulse] - Solicitud de ${name}`);
                const body = encodeURIComponent(
                    `Hola Equipo RedPulse,\n\n` +
                    `Se ha recibido una consulta desde el formulario web:\n\n` +
                    `• Cliente: ${name}\n` +
                    `• Correo: ${email}\n\n` +
                    `• Detalles del Proyecto:\n${message}\n\n` +
                    `---`
                );

                // 4. Disparar el gestor de correo del usuario
                window.location.href = `mailto:${DESTINATION_EMAIL}?subject=${subject}&body=${body}`;

                // 5. Alerta de éxito formateada al estilo RedPulse (Modo Oscuro)
                formAlert.classList.remove('hidden', 'bg-red-900/40', 'text-red-400');
                formAlert.classList.add('bg-emerald-950', 'text-emerald-400', 'border', 'border-emerald-800', 'block');
                formAlert.innerHTML = `✨ <strong>¡Gracias, ${name}!</strong> Redirigiendo a tu app de correo para enviar a <u>${DESTINATION_EMAIL}</u>.`;

                // 6. Resetear entradas del formulario
                contactForm.reset();

                // 7. Restauración del botón tras 5 segundos
                setTimeout(() => {
                    btnText.innerText = 'Enviar Mensaje';
                    formBtn.disabled = false;
                    formBtn.classList.remove('opacity-75', 'cursor-not-allowed');
                    formAlert.classList.add('hidden');

                    if (window.lucide) {
                        lucide.createIcons();
                    }
                }, 5000);

            }, 1000);
        });
    }
});