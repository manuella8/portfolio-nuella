
/* =====================================================
   PROJETS — NAVIGATION, ANIMATIONS ET INTERACTIONS
   Compatible avec les quatre sections : IA × Vidéo,
   UI/UX, Graphisme et Entrepreneuriat.
===================================================== */
(() => {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const tabs = [...document.querySelectorAll('.project-tab[href^="#"]')];
        const sections = tabs
            .map(tab => document.querySelector(tab.getAttribute('href')))
            .filter(Boolean);

        const progressBar = document.querySelector('.scroll-progress span');

        // Défilement fluide vers les projets.
        tabs.forEach(tab => {
            tab.addEventListener('click', event => {
                const target = document.querySelector(tab.getAttribute('href'));

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: reduceMotion ? 'auto' : 'smooth',
                    block: 'start'
                });

                history.replaceState(null, '', tab.getAttribute('href'));
            });
        });

        // L'onglet actif suit la section visible.
        if ('IntersectionObserver' in window && sections.length) {
            const sectionObserver = new IntersectionObserver(entries => {
                const visible = entries
                    .filter(entry => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (!visible) return;

                tabs.forEach(tab => {
                    const active =
                        tab.getAttribute('href') === `#${visible.target.id}`;

                    tab.classList.toggle('active', active);

                    if (active) {
                        tab.setAttribute('aria-current', 'location');
                    } else {
                        tab.removeAttribute('aria-current');
                    }
                });
            }, {
                rootMargin: '-18% 0px -62% 0px',
                threshold: [0, 0.1, 0.25, 0.45, 0.65]
            });

            sections.forEach(section => sectionObserver.observe(section));
        }

        // Barre de progression de lecture.
        let ticking = false;

        const updateProgress = () => {
            if (!progressBar) return;

            const scrollable =
                document.documentElement.scrollHeight - window.innerHeight;

            const progress = scrollable > 0
                ? window.scrollY / scrollable
                : 0;

            progressBar.style.transform =
                `scaleX(${Math.min(1, Math.max(0, progress))})`;

            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateProgress);
                ticking = true;
            }
        }, { passive: true });

        updateProgress();

        // Une seule vidéo peut jouer à la fois.
        const videos = [
            ...document.querySelectorAll('.video-wrapper video')
        ];

        // Vidéo absente du dossier videos/ : on affiche un message au lieu d'un lecteur vide.
        videos.forEach(video => {
            const wrapper = video.closest('.video-wrapper');
            const markMissing = () => wrapper && wrapper.classList.add('is-missing');
            video.querySelectorAll('source').forEach(source => {
                source.addEventListener('error', markMissing);
            });
            video.addEventListener('error', markMissing);
            // Filet de sécurité si l'erreur est arrivée avant ce script.
            setTimeout(() => {
                if (video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) markMissing();
            }, 3000);
        });

        videos.forEach(video => {
            video.addEventListener('play', () => {
                videos.forEach(other => {
                    if (other !== video) {
                        other.pause();
                    }
                });
            });
        });

        // Apparition progressive des éléments au défilement.
        const revealSelector = [
            '.project-info-card',
            '.process-item',
            '.process-card',
            '.video-card',
            '.design-principle',
            '.design-project-card',
            '.entrepreneur-project',
            '.entrepreneur-highlight',
            '.graphic-process-card',
            '.graphic-category-card',
            '.graphic-work-card',
            '.graphic-highlight',
            '.project-block'
        ].join(',');

        const revealElements = [
            ...document.querySelectorAll(revealSelector)
        ];

        if ('IntersectionObserver' in window && !reduceMotion) {
            const revealObserver = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach(entry => {
                        if (!entry.isIntersecting) return;

                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    });
                },
                {
                    threshold: 0.08,
                    rootMargin: '0px 0px -35px 0px'
                }
            );

            revealElements.forEach((element, index) => {
                element.classList.add('js-reveal');

                // Petit décalage pour un effet d'apparition en cascade.
                element.style.transitionDelay =
                    `${(index % 5) * 65}ms`;

                revealObserver.observe(element);
            });
        } else {
            revealElements.forEach(element => {
                element.classList.add('is-visible');
            });
        }

        // Halo lumineux qui suit la souris sur ordinateur.
        const glow = document.querySelector('.cursor-glow');

        if (
            glow &&
            window.matchMedia('(pointer: fine)').matches &&
            !reduceMotion
        ) {
            window.addEventListener('pointermove', event => {
                glow.style.left = `${event.clientX}px`;
                glow.style.top = `${event.clientY}px`;
                glow.classList.add('is-active');
            }, { passive: true });

            document.addEventListener('pointerleave', () => {
                glow.classList.remove('is-active');
            });
        }

        // Visionneuse d'images (lightbox).
        // Fonctionne avec .image-open et les boutons data-lightbox.
        const lightbox = document.getElementById('image-lightbox');
        const lightboxImage = lightbox?.querySelector('img');
        const closeButton = lightbox?.querySelector('.lightbox-close');

        let lastFocusedElement = null;

        const openLightbox = (src, alt, trigger) => {
            if (!lightbox || !lightboxImage || !src) return;

            lastFocusedElement = trigger || document.activeElement;

            lightboxImage.src = src;
            lightboxImage.alt = alt || 'Aperçu de la création';

            lightbox.classList.add('is-open');
            lightbox.setAttribute('aria-hidden', 'false');

            document.body.classList.add('lightbox-open');

            closeButton?.focus();
        };

        const closeLightbox = () => {
            if (!lightbox || !lightboxImage) return;

            lightbox.classList.remove('is-open');
            lightbox.setAttribute('aria-hidden', 'true');

            document.body.classList.remove('lightbox-open');

            lightboxImage.removeAttribute('src');

            if (
                lastFocusedElement &&
                typeof lastFocusedElement.focus === 'function'
            ) {
                lastFocusedElement.focus();
            }
        };

        document.addEventListener('click', event => {
            const button = event.target.closest(
                '.image-open, .portfolio-image-button[data-lightbox]'
            );

            if (!button) return;

            const image = button.querySelector('img');

            if (!image) return;

            const src =
                button.dataset.lightbox ||
                image.currentSrc ||
                image.src;

            if (!src || src.includes('REMPLACER')) return;

            event.preventDefault();

            openLightbox(src, image.alt, button);
        });

        // Fermer la visionneuse avec le bouton.
        closeButton?.addEventListener('click', closeLightbox);

        // Fermer en cliquant sur le fond.
        lightbox?.addEventListener('click', event => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });

        // Fermer avec la touche Échap.
        document.addEventListener('keydown', event => {
            if (
                event.key === 'Escape' &&
                lightbox?.classList.contains('is-open')
            ) {
                closeLightbox();
            }
        });

        // Signaler les images manquantes dans les maquettes.
        document.querySelectorAll(
            '.uiux-main-image img, ' +
            '.uiux-screen img, ' +
            '.graphic-work-visual img, ' +
            '.portfolio-image-button img'
        ).forEach(image => {
            image.addEventListener('error', () => {
                image.classList.add('image-missing');
                image.alt = `${image.alt} — image à ajouter`;
                image.style.minHeight = '100px';
                image.style.opacity = '.3';
            });
        });
    });
})();
