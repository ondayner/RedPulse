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

        const contactForm = document.getElementById('contact-form');
        const formBtn = document.getElementById('form-btn');
        const btnText = document.getElementById('btn-text');
        const formAlert = document.getElementById('form-alert');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const message = document.getElementById('form-message').value;

            btnText.innerText = 'Procesando...';
            formBtn.disabled = true;
            formBtn.classList.add('opacity-75');

            setTimeout(() => {
                formAlert.classList.remove('hidden', 'bg-red-900/40', 'text-red-400');
                formAlert.classList.add('bg-emerald-950', 'text-emerald-400', 'border', 'border-emerald-800');
                formAlert.innerText = `¡Gracias, ${name}! Tu solicitud ha sido recibida correctamente. Nos comunicaremos a ${email} en breve.`;

                contactForm.reset();
                btnText.innerText = 'Enviar Mensaje';
                formBtn.disabled = false;
                formBtn.classList.remove('opacity-75');

                lucide.createIcons();
            }, 1200);
        });