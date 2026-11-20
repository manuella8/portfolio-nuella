/* =========================================
   CURSEUR LUMINEUX
========================================= */

const cursorGlow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {

    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;

});


/* =========================================
   APPARITION AU SCROLL
========================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

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


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================
   BOUTONS MAGNÉTIQUES
========================================= */

const magneticButtons =
    document.querySelectorAll(".magnetic");


magneticButtons.forEach((button) => {

    button.addEventListener("mousemove", (e) => {

        const rect = button.getBoundingClientRect();

        const x =
            e.clientX -
            rect.left -
            rect.width / 2;

        const y =
            e.clientY -
            rect.top -
            rect.height / 2;

        button.style.transform =
            `translate(${x * 0.15}px, ${y * 0.15}px)`;

    });


    button.addEventListener("mouseleave", () => {

        button.style.transform =
            "translate(0, 0)";

    });

});


/* =========================================
   EFFET PARALLAXE DES CARTES
========================================= */

const cards =
    document.querySelectorAll(".floating-card");


document.addEventListener("mousemove", (e) => {

    const x =
        (window.innerWidth / 2 - e.clientX) / 40;

    const y =
        (window.innerHeight / 2 - e.clientY) / 40;


    cards.forEach((card, index) => {

        const intensity =
            (index + 1) * 0.5;

        card.style.marginLeft =
            `${x * intensity}px`;

        card.style.marginTop =
            `${y * intensity}px`;

    });

});


/* =========================================
   ANIMATION DU TITRE
========================================= */

window.addEventListener("load", () => {

    const titleLines =
        document.querySelectorAll(".hero-title .reveal");

    titleLines.forEach((line, index) => {

        setTimeout(() => {

            line.classList.add("active");

        }, 400 + index * 180);

    });

});


/* =========================================
   EFFET HOVER SUR LES LIENS
========================================= */

const navLinks =
    document.querySelectorAll(".nav-links a");


navLinks.forEach((link) => {

    link.addEventListener("mouseenter", () => {

        cursorGlow.style.width = "450px";
        cursorGlow.style.height = "450px";

    });


    link.addEventListener("mouseleave", () => {

        cursorGlow.style.width = "300px";
        cursorGlow.style.height = "300px";

    });

});



/* =========================================
   ANIMATION TIMELINE
========================================= */

const timelineItems =
    document.querySelectorAll(".timeline-item");


const timelineObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                const item = entry.target;

                item.classList.add("timeline-visible");

                timelineObserver.unobserve(item);

            }

        });

    },

    {
        threshold: 0.2
    }

);


timelineItems.forEach((item) => {

    timelineObserver.observe(item);

});


/* =========================================
   EFFET PARALLAXE SUR LES CARTES
========================================= */

const interestCards =
    document.querySelectorAll(".interest-card");


interestCards.forEach((card) => {

    card.addEventListener("mousemove", (e) => {

        const rect =
            card.getBoundingClientRect();

        const x =
            e.clientX - rect.left;

        const y =
            e.clientY - rect.top;

        const rotateX =
            ((y / rect.height) - 0.5) * -8;

        const rotateY =
            ((x / rect.width) - 0.5) * 8;

        card.style.transform =
            `translateY(-10px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "translateY(0) rotateX(0) rotateY(0)";

    });

});




/* =========================================
   ANIMATIONS — SECTION PROJETS
   ========================================= */


/* PARALLAX DES VISUELS */

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {

    const visual = card.querySelector('.project-visual');
    const placeholder = card.querySelector('.project-placeholder');

    if (!visual || !placeholder) return;

    card.addEventListener('mousemove', (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 35;
        const rotateY = (x - centerX) / 35;

        placeholder.style.transform = `
            perspective(800px)
            rotateX(${-rotateX}deg)
            rotateY(${rotateY}deg)
            rotateZ(0deg)
            scale(1.05)
        `;

    });


    card.addEventListener('mouseleave', () => {

        placeholder.style.transform = `
            rotateZ(-5deg)
            scale(1)
        `;

    });

});


/* APPARITION DES PROJETS */

const projectReveal = document.querySelectorAll(
    '.projects-section .reveal'
);

const projectObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry, index) => {

            if (!entry.isIntersecting) return;

            entry.target.style.transitionDelay =
                `${index * 0.12}s`;

            entry.target.classList.add('visible');

            projectObserver.unobserve(entry.target);

        });

    },
    {
        threshold: 0.12
    }
);


projectReveal.forEach(element => {
    projectObserver.observe(element);
});


/* HOVER LUMINEUX */

projectCards.forEach(card => {

    card.addEventListener('mousemove', (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.background = `
            radial-gradient(
                circle at ${x}px ${y}px,
                rgba(157,108,255,0.08),
                rgba(255,255,255,0.025) 35%
            )
        `;

    });


    card.addEventListener('mouseleave', () => {

        card.style.background =
            'rgba(255,255,255,0.025)';

    });

});



/* =========================================
   ANIMATIONS — MES COMPÉTENCES
   ========================================= */


/* APPARITION DES CATÉGORIES */

const skillCategories = document.querySelectorAll(
    '.skills-section .skill-category'
);

const skillsObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry, index) => {

            if (!entry.isIntersecting) return;

            entry.target.style.transitionDelay =
                `${index * 0.12}s`;

            entry.target.classList.add('visible');

            skillsObserver.unobserve(entry.target);

        });

    },
    {
        threshold: 0.12
    }
);


skillCategories.forEach(category => {
    skillsObserver.observe(category);
});



/* EFFET 3D SUR LES CATÉGORIES */

skillCategories.forEach(category => {

    category.addEventListener('mousemove', (e) => {

        const rect = category.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX =
            (y - centerY) / 45;

        const rotateY =
            (x - centerX) / 45;

        category.style.transform = `
            perspective(1000px)
            rotateX(${-rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-8px)
        `;

    });


    category.addEventListener('mouseleave', () => {

        category.style.transform = '';

    });

});



/* INTERACTION DES LOGICIELS */

const softwareCards = document.querySelectorAll(
    '.software-card'
);


softwareCards.forEach(card => {

    card.addEventListener('mouseenter', () => {

        const logo =
            card.querySelector('.software-logo');

        if (logo) {

            logo.style.transform =
                'scale(1.12) rotate(-5deg)';

        }

    });


    card.addEventListener('mouseleave', () => {

        const logo =
            card.querySelector('.software-logo');

        if (logo) {

            logo.style.transform =
                'scale(1) rotate(0deg)';

        }

    });

});




/* =========================================
   ANIMATIONS — CONTACT
   ========================================= */


/* EFFET SUR L'EMAIL */

const contactEmail =
    document.querySelector('.contact-email');

if (contactEmail) {

    contactEmail.addEventListener('mousemove', (e) => {

        const rect =
            contactEmail.getBoundingClientRect();

        const x =
            ((e.clientX - rect.left) / rect.width) * 100;

        contactEmail.style.background = `
            radial-gradient(
                circle at ${x}% 50%,
                rgba(157,108,255,0.08),
                transparent 35%
            )
        `;

    });


    contactEmail.addEventListener('mouseleave', () => {

        contactEmail.style.background = 'none';

    });

}


/* ANIMATION DES LIENS SOCIAUX */

const socialLinks =
    document.querySelectorAll('.social-link');

socialLinks.forEach(link => {

    link.addEventListener('mouseenter', () => {

        const arrow =
            link.querySelector('span:last-child');

        if (arrow) {

            arrow.style.transform =
                'rotate(45deg)';

        }

    });


    link.addEventListener('mouseleave', () => {

        const arrow =
            link.querySelector('span:last-child');

        if (arrow) {

            arrow.style.transform =
                'rotate(0deg)';

        }

    });

});


/* FORMULAIRE */

const contactForm =
    document.querySelector('#contactForm');

/*
   Envoi du formulaire de contact.
   - FORM_ENDPOINT vide : le message s'ouvre dans la messagerie du visiteur (mailto).
   - Pour recevoir les messages directement par mail sans que le visiteur
     ouvre sa messagerie : créer un formulaire gratuit sur formspree.io et
     coller ici son adresse, par exemple 'https://formspree.io/f/abcdwxyz'.
*/
const FORM_ENDPOINT = '';
const CONTACT_EMAIL = 'manuellaagbaguede@gmail.com';

if (contactForm) {

    contactForm.addEventListener('submit', async (e) => {

        e.preventDefault();

        const button =
            contactForm.querySelector('.contact-submit span:first-child');
        const originalText = button ? button.textContent : '';
        const isEN = (localStorage.getItem('language') || 'fr') === 'en';

        const setLabel = (text, reset = true) => {
            if (!button) return;
            button.textContent = text;
            if (reset) setTimeout(() => { button.textContent = originalText; }, 3000);
        };

        const data = new FormData(contactForm);
        const name = (data.get('name') || '').toString().trim();
        const email = (data.get('email') || '').toString().trim();
        const message = (data.get('message') || '').toString().trim();

        if (FORM_ENDPOINT) {
            setLabel(isEN ? 'Sending…' : 'Envoi en cours…', false);
            try {
                const res = await fetch(FORM_ENDPOINT, {
                    method: 'POST',
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });
                if (!res.ok) throw new Error(res.status);
                contactForm.reset();
                setLabel(isEN ? 'Message sent ✓' : 'Message envoyé ✓');
            } catch (err) {
                setLabel(isEN ? 'Error, please email me directly' : 'Erreur, écrivez-moi par mail');
            }
            return;
        }

        const subject = `Contact portfolio — ${name}`;
        const body = `${message}\n\n${name}\n${email}`;
        window.location.href =
            `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setLabel(isEN ? 'Opening your email app…' : 'Ouverture de votre messagerie…');

    });

}



/* ================================
   THÈME CLAIR / SOMBRE
================================ */

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

if (themeToggle) {

    // Récupérer le thème sauvegardé
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        themeIcon.textContent = "☾";
    }

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");

        const isLight =
            document.body.classList.contains("light-theme");

        // Changer l'icône
        themeIcon.textContent = isLight ? "☾" : "☀";

        // Sauvegarder le choix
        localStorage.setItem(
            "theme",
            isLight ? "light" : "dark"
        );

    });
}





/* =========================================
   🌍 SYSTÈME DE LANGUE FR / EN
========================================= */

const languageFR = document.getElementById("languageFR");
const languageEN = document.getElementById("languageEN");

/* =========================================
   TRADUCTIONS
========================================= */

const translations = {

    fr: {

        /* NAVBAR */
        navAccueil: "Accueil",
        navApropos: "À propos",
        navProjets: "Projets",
        navCompetences: "Compétences",
        navContact: "Contact",
        navButton: "Parlons-nous",

        /* HERO */
        availability: "Disponible pour de nouveaux projets",
        hello: "Bonjour, je suis",
        create: "Je crée",
        experiment: "J'expérimente",

        heroDescription: `
            Product Designer & créative digitale.
            Je m'intéresse au <strong>UI/UX Design</strong>,
            à la communication, à la création vidéo,
            à l'intelligence artificielle et à l'entrepreneuriat.
        `,

        projectsButton: "Découvrir mes projets",
        aboutButton: "En savoir plus",

        floatingCreate: "Je crée",
        floatingCreateStrong: "Des expériences",

        floatingExplore: "J'explore",
        floatingAI: "L'intelligence artificielle",

        floatingTell: "Je raconte",
        floatingVideo: "Des histoires en vidéo",

        scroll: "FAITES DÉFILER",


        /* À PROPOS */

        aboutLabel: "À PROPOS DE MOI",

        aboutTitle: `
            Un parcours entre
            <span>technologie</span>,
            créativité et innovation.
        `,

        aboutIntro: `
            Mon parcours m'a permis de développer un profil
            à la croisée de la technologie, de la créativité
            et du monde professionnel.

            Aujourd'hui, j'explore différentes façons de
            transformer des idées en expériences et en
            contenus utiles.
        `,

        formationCategory: "FORMATION",

        formationTitle: `
            Intelligence Artificielle
            & Big Data
        `,

        formationText: `
            Un parcours universitaire qui m'a permis
            de développer des bases en technologie,
            données, intelligence artificielle et
            résolution de problèmes. J'ai eu à faire
            trois ans et je suis sorti avec une
            licence en Intelligence Artificielle et
            Big Data.
        `,

        experience: "EXPÉRIENCE",

        internshipCategory: "STAGE — BRASSERIE BB LOMÉ",

        internshipTitle: `
            Technologie & création
            dans un environnement industriel
        `,

        internshipText: `
            Durant mon stage, je participe à des
            activités liées à la technologie,
            à la création de contenus IA et à
            l'environnement industriel.
        `,

        aiVideoYear: "IA × VIDÉO",

        contentCategory: "CRÉATION DE CONTENU",

        aiVideoTitle: "Création de vidéos avec l'IA",

        aiVideoText: `
            Je crée des vidéos à l'aide de
            l'intelligence artificielle, notamment
            autour des résolutions de pannes,
            de la configuration des machines et
            de la transmission de connaissances
            techniques et également les publicités
            de produits et autres.
        `,

        industryYear: "INDUSTRIE",

        technicalCategory: "ENVIRONNEMENT TECHNIQUE",

        industryTitle: `
            Comprendre les systèmes
            industriels
        `,

        industryText: `
            J'ai également développé des connaissances
            sur différents aspects techniques de
            l'entreprise : fonctionnement de la
            chaudière, production et utilisation
            de l'air comprimé, équipements et
            processus industriels.
        `,

        projectsYear: "PROJETS",

        projectFollowCategory: "SUIVI DE PROJET",

        projectFollowTitle: `
            Bureau technique &
            assistance au suivi de projet
        `,

        projectFollowText: `
            Mon expérience m'a également permis
            de découvrir le fonctionnement du
            bureau technique et de participer à
            des activités liées au suivi de projets
            de l'entreprise, comme le suivi de PhMetre de l'entreprise.
        `,

        languagesYear: "LANGUES",

        personalCategory: "DÉVELOPPEMENT PERSONNEL",

        englishTitle: "Formation en anglais",

        englishText: `
            J'ai également suivi une formation
            en anglais afin de développer mes
            compétences linguistiques et
            d'élargir mes possibilités
            professionnelles.
        `,


        /* UNIVERS */

        universeLabel: "CE QUI M'ANIME",

        universeTitle: `
            Plusieurs univers.
            <span>Une même envie : créer.</span>
        `,

        productDesign: "Product Design",

        productDesignText: `
            Imaginer des expériences digitales
            simples, utiles et intuitives.
        `,

        communication: "Communication",

        communicationText: `
            Transmettre une idée et raconter
            une histoire à travers le contenu.
        `,

        videoCreation: "Création vidéo",

        videoCreationText: `
            Transformer une idée en contenu
            visuel et dynamique.
        `,

        artificialIntelligence: "Intelligence artificielle",

        artificialIntelligenceText: `
            Explorer l'IA comme outil de
            créativité et d'innovation.
        `,

        entrepreneurship: "Entrepreneuriat",

        entrepreneurshipText: `
            Imaginer des projets et transformer
            des idées en opportunités.
        `,


        /* PROJETS */

        projectsLabel: "MES PROJETS",

        projectsTitle: `
            Ce que je
            <span>crée.</span>
        `,

        projectsIntro: `
            Des projets à la croisée du design, de la technologie,
            de l'intelligence artificielle et de la créativité.
        `,

        projectMeta1: "Création vidéo · IA",

        projectTitle1: `
            L'IA au service
            <br>
            de la communication technique.
        `,

        projectDescription1: `
            Création de vidéos utilisant l'intelligence artificielle
            pour expliquer des situations techniques, des pannes,
            des solutions et la configuration de machines dans
            un environnement industriel.
        `,

        projectLink: "Voir le projet",

        projectMeta2: "UI/UX · Product Design",

        projectTitle2: `
            Transformer une idée
            <br>
            en expérience.
        `,

        projectDescription2: `
            Exploration du design d'interfaces et de produits
            numériques avec une attention particulière portée
            à l'expérience utilisateur, à la simplicité et
            à l'identité visuelle.
        `,

        projectMeta3: "Technologie · Industrie",

        projectTitle3: `
            Comprendre la technologie
            <br>
            pour mieux la raconter.
        `,

        projectDescription3: `
            Immersion dans un environnement industriel à travers
            l'observation des équipements, du bureau technique,
            du fonctionnement de la chaudière, de l'air comprimé
            et du suivi de projets.
        `,

        projectMeta4: "Créativité · Entrepreneuriat",

        projectTitle4: `
            Créer, expérimenter,
            <br>
            entreprendre.
        `,

        projectDescription4: `
            Des projets personnels autour de la création,
            de la communication, du digital et de l'entrepreneuriat.
            Des idées qui commencent sur une feuille et prennent
            progressivement vie.
        `,

        projectMeta5: "Graphisme · Communication",

        projectTitle5: `
            Donner une identité
            <br>
            aux idées.
        `,

        projectDescription5: `
            Création d'affiches, de logos et de supports visuels
            destinés à communiquer une idée, valoriser un projet
            ou construire une identité visuelle cohérente.
        `,

        projectBottom: "Et ce n'est que le début...",
        projectsCount: "05 projets",


        /* COMPÉTENCES */

        skillsLabel: "MES COMPÉTENCES",

        skillsTitle: `
            Les outils
            <span>que j'utilise.</span>
        `,

        skillsIntro: `
            Des outils qui me permettent de transformer
            une idée en interface, en contenu visuel
            ou en expérience digitale.
        `,

        design: "Design",

        designDescription: `
            Concevoir des interfaces et créer des
            visuels avec une attention particulière
            portée à l'expérience et à l'esthétique.
        `,

        development: "Développement",

        developmentDescription: `
            Donner vie aux interfaces et transformer
            les concepts en expériences web
            fonctionnelles.
        `,

        data: "Data",

        dataDescription: `
            Transformer les données en informations
            visuelles et créer des tableaux de bord
            compréhensibles.
        `,

        videoAI: "Vidéo & IA",

        videoAIDescription: `
            Explorer les nouvelles possibilités de
            création vidéo et de génération de contenu
            grâce à l'intelligence artificielle.
        `,

        skillsFooter: `
            Les outils changent.
            <strong>La créativité reste.</strong>
        `,


        /* CONTACT */

        contactLabel: "CONTACT",

        contactTitle: `
            Une idée ?
            <br>
            <span>Parlons-en.</span>
        `,

        contactDescription: `
            Un projet, une collaboration, une opportunité
            ou simplement envie d'échanger ?
            Ma boîte mail est ouverte.
        `,

        findMe: "RETROUVE-MOI",

        availabilityTitle: "Ouverte aux opportunités",

        availabilityText: "Stage · Collaboration · Projet",

        nameLabel: "Votre nom",
        emailLabel: "Votre email",
        messageLabel: "Votre message",

        namePlaceholder: "Jean Dupont",
        emailPlaceholder: "jean@email.com",
        messagePlaceholder: "Parlez-moi de votre projet...",

        sendMessage: "Envoyer le message",

        footerCreated: "Conçu & créé avec curiosité."

    },


    /* =========================================
       🇺🇸 ENGLISH
    ========================================= */

    en: {

        /* NAVBAR */
        navAccueil: "Home",
        navApropos: "About",
        navProjets: "Projects",
        navCompetences: "Skills",
        navContact: "Contact",
        navButton: "Let's talk",

        /* HERO */
        availability: "Available for new projects",
        hello: "Hello, I'm",
        create: "I create",
        experiment: "I experiment",

        heroDescription: `
            Product Designer & digital creative.
            I'm interested in <strong>UI/UX Design</strong>,
            communication, video creation,
            artificial intelligence and entrepreneurship.
        `,

        projectsButton: "Discover my projects",
        aboutButton: "Learn more",

        floatingCreate: "I create",
        floatingCreateStrong: "Experiences",

        floatingExplore: "I explore",
        floatingAI: "Artificial intelligence",

        floatingTell: "I tell",
        floatingVideo: "Stories through video",

        scroll: "SCROLL DOWN",


        /* ABOUT */

        aboutLabel: "ABOUT ME",

        aboutTitle: `
            A journey between
            <span>technology</span>,
            creativity and innovation.
        `,

        aboutIntro: `
            My journey has allowed me to develop a profile
            at the intersection of technology, creativity
            and the professional world.

            Today, I explore different ways to
            transform ideas into experiences and
            useful content.
        `,

        formationCategory: "EDUCATION",

        formationTitle: `
            Artificial Intelligence
            & Big Data
        `,

        formationText: `
            A university journey that allowed me
            to develop foundations in technology,
            data, artificial intelligence and
            problem solving. I completed three
            years and graduated with a Bachelor's
            degree in Artificial Intelligence and
            Big Data.
        `,

        experience: "EXPERIENCE",

        internshipCategory: "INTERNSHIP — BRASSERIE BB LOMÉ",

        internshipTitle: `
            Technology & creativity
            in an industrial environment
        `,

        internshipText: `
            During my internship, I participate in
            activities related to technology,
            AI content creation and the
            industrial environment.
        `,

        aiVideoYear: "AI × VIDEO",

        contentCategory: "CONTENT CREATION",

        aiVideoTitle: "Creating videos with AI",

        aiVideoText: `
            I create videos using artificial
            intelligence, particularly around
            troubleshooting, machine configuration,
            sharing technical knowledge and
            product advertising.
        `,

        industryYear: "INDUSTRY",

        technicalCategory: "TECHNICAL ENVIRONMENT",

        industryTitle: `
            Understanding industrial
            systems
        `,

        industryText: `
            I have also developed knowledge
            of different technical aspects of
            the company: boiler operation,
            compressed air production and use,
            equipment and industrial processes.
        `,

        projectsYear: "PROJECTS",

        projectFollowCategory: "PROJECT MONITORING",

        projectFollowTitle: `
            Technical office &
            project monitoring support
        `,

        projectFollowText: `
            My experience also allowed me
            to discover how the technical office
            operates and participate in activities
            related to project monitoring,
            such as monitoring the company's PhMeter.
        `,

        languagesYear: "LANGUAGES",

        personalCategory: "PERSONAL DEVELOPMENT",

        englishTitle: "English training",

        englishText: `
            I also completed English training
            to develop my language skills and
            broaden my professional
            opportunities.
        `,


        /* UNIVERSE */

        universeLabel: "WHAT DRIVES ME",

        universeTitle: `
            Several worlds.
            <span>One desire: to create.</span>
        `,

        productDesign: "Product Design",

        productDesignText: `
            Imagining simple, useful and
            intuitive digital experiences.
        `,

        communication: "Communication",

        communicationText: `
            Sharing an idea and telling
            a story through content.
        `,

        videoCreation: "Video Creation",

        videoCreationText: `
            Turning an idea into dynamic
            and visual content.
        `,

        artificialIntelligence: "Artificial Intelligence",

        artificialIntelligenceText: `
            Exploring AI as a tool for
            creativity and innovation.
        `,

        entrepreneurship: "Entrepreneurship",

        entrepreneurshipText: `
            Imagining projects and turning
            ideas into opportunities.
        `,


        /* PROJECTS */

        projectsLabel: "MY PROJECTS",

        projectsTitle: `
            What I
            <span>create.</span>
        `,

        projectsIntro: `
            Projects at the intersection of design, technology,
            artificial intelligence and creativity.
        `,

        projectMeta1: "Video Creation · AI",

        projectTitle1: `
            AI serving
            <br>
            technical communication.
        `,

        projectDescription1: `
            Creating videos using artificial intelligence
            to explain technical situations, breakdowns,
            solutions and machine configuration in
            an industrial environment.
        `,

        projectLink: "View project",

        projectMeta2: "UI/UX · Product Design",

        projectTitle2: `
            Turning an idea
            <br>
            into an experience.
        `,

        projectDescription2: `
            Exploring interface and digital product design
            with particular attention to user experience,
            simplicity and visual identity.
        `,

        projectMeta3: "Technology · Industry",

        projectTitle3: `
            Understanding technology
            <br>
            to tell its story better.
        `,

        projectDescription3: `
            Immersion in an industrial environment through
            observing equipment, the technical office,
            boiler operation, compressed air
            and project monitoring.
        `,

        projectMeta4: "Creativity · Entrepreneurship",

        projectTitle4: `
            Create, experiment,
            <br>
            build.
        `,

        projectDescription4: `
            Personal projects around creativity,
            communication, digital experiences and entrepreneurship.
            Ideas that start on paper and gradually
            come to life.
        `,

        projectMeta5: "Graphic Design · Communication",

        projectTitle5: `
            Giving identity
            <br>
            to ideas.
        `,

        projectDescription5: `
            Creating posters, logos and visual assets
            designed to communicate an idea, highlight a project
            or build a coherent visual identity.
        `,

        projectBottom: "And this is only the beginning...",
        projectsCount: "05 projects",


        /* SKILLS */

        skillsLabel: "MY SKILLS",

        skillsTitle: `
            The tools
            <span>I use.</span>
        `,

        skillsIntro: `
            Tools that allow me to transform
            an idea into an interface, visual content
            or a digital experience.
        `,

        design: "Design",

        designDescription: `
            Designing interfaces and creating
            visuals with particular attention
            to experience and aesthetics.
        `,

        development: "Development",

        developmentDescription: `
            Bringing interfaces to life and turning
            concepts into functional web
            experiences.
        `,

        data: "Data",

        dataDescription: `
            Turning data into visual information
            and creating understandable dashboards.
        `,

        videoAI: "Video & AI",

        videoAIDescription: `
            Exploring new possibilities for
            video creation and content generation
            through artificial intelligence.
        `,

        skillsFooter: `
            Tools change.
            <strong>Creativity remains.</strong>
        `,


        /* CONTACT */

        contactLabel: "CONTACT",

        contactTitle: `
            An idea?
            <br>
            <span>Let's talk.</span>
        `,

        contactDescription: `
            A project, a collaboration, an opportunity
            or simply want to chat?
            My inbox is open.
        `,

        findMe: "FIND ME",

        availabilityTitle: "Open to opportunities",

        availabilityText: "Internship · Collaboration · Project",

        nameLabel: "Your name",
        emailLabel: "Your email",
        messageLabel: "Your message",

        namePlaceholder: "John Doe",
        emailPlaceholder: "john@email.com",
        messagePlaceholder: "Tell me about your project...",

        sendMessage: "Send message",

        footerCreated: "Designed & created with curiosity."

    }

};


/* =========================================
   APPLICATION DE LA LANGUE
========================================= */

function setLanguage(language) {

    const t = translations[language];

    if (!t) return;

    /* HTML */
    document.documentElement.lang = language;

    /* NAVBAR */

    const navLinks = document.querySelectorAll(".nav-links > a");

    if (navLinks.length >= 5) {
        navLinks[0].textContent = t.navAccueil;
        navLinks[1].textContent = t.navApropos;
        navLinks[2].textContent = t.navProjets;
        navLinks[3].textContent = t.navCompetences;
        navLinks[4].textContent = t.navContact;
    }

    document.querySelector(".contact-button").childNodes[0].textContent =
        t.navButton + " ";


    /* HERO */


    document.querySelector(".small-intro").textContent =
        t.hello;

    const heroTitles = document.querySelectorAll(".hero-title .title-line");

    if (heroTitles.length >= 3) {
        heroTitles[0].innerHTML = `Manuella<span class="purple">.</span>`;
        heroTitles[1].innerHTML = `${t.create}<span class="purple">.</span>`;
        heroTitles[2].innerHTML = `${t.experiment}<span class="purple">.</span>`;
    }

    document.querySelector(".hero-description").innerHTML =
        t.heroDescription;

    document.querySelector(".primary-button").childNodes[0].textContent =
        t.projectsButton + " ";

    document.querySelector(".secondary-button").textContent =
        t.aboutButton;


    /* FLOATING CARDS */

    const floatingCards = document.querySelectorAll(".floating-card");

    if (floatingCards.length >= 3) {

        floatingCards[0].querySelector("small").textContent =
            t.floatingCreate;

        floatingCards[0].querySelector("strong").textContent =
            t.floatingCreateStrong;


        floatingCards[1].querySelector("small").textContent =
            t.floatingExplore;

        floatingCards[1].querySelector("strong").textContent =
            t.floatingAI;


        floatingCards[2].querySelector("small").textContent =
            t.floatingTell;

        floatingCards[2].querySelector("strong").textContent =
            t.floatingVideo;

    }

    document.querySelector(".scroll-indicator span").textContent =
        t.scroll;


    /* =====================================
       À PROPOS
    ===================================== */

    const about = document.querySelector("#apropos");

    about.querySelector(".section-label").textContent =
        t.aboutLabel;

    about.querySelector(".about-header h2").innerHTML =
        t.aboutTitle;

    about.querySelector(".about-introduction").textContent =
        t.aboutIntro;


    const timelineItems =
        about.querySelectorAll(".timeline-item");


    /* 1 — FORMATION */

    timelineItems[0].querySelector(".timeline-category").textContent =
        t.formationCategory;

    timelineItems[0].querySelector("h3").innerHTML =
        t.formationTitle;

    timelineItems[0].querySelectorAll("p")[1].textContent =
        t.formationText;


    /* 2 — STAGE */

    timelineItems[1].querySelector(".timeline-year").textContent =
        t.experience;

    timelineItems[1].querySelector(".timeline-category").textContent =
        t.internshipCategory;

    timelineItems[1].querySelector("h3").innerHTML =
        t.internshipTitle;

    timelineItems[1].querySelectorAll("p")[1].textContent =
        t.internshipText;


    /* 3 — IA VIDÉO */

    timelineItems[2].querySelector(".timeline-year").textContent =
        t.aiVideoYear;

    timelineItems[2].querySelector(".timeline-category").textContent =
        t.contentCategory;

    timelineItems[2].querySelector("h3").textContent =
        t.aiVideoTitle;

    timelineItems[2].querySelectorAll("p")[1].textContent =
        t.aiVideoText;


    /* 4 — INDUSTRIE */

    timelineItems[3].querySelector(".timeline-year").textContent =
        t.industryYear;

    timelineItems[3].querySelector(".timeline-category").textContent =
        t.technicalCategory;

    timelineItems[3].querySelector("h3").innerHTML =
        t.industryTitle;

    timelineItems[3].querySelectorAll("p")[1].textContent =
        t.industryText;


    /* 5 — PROJETS */

    timelineItems[4].querySelector(".timeline-year").textContent =
        t.projectsYear;

    timelineItems[4].querySelector(".timeline-category").textContent =
        t.projectFollowCategory;

    timelineItems[4].querySelector("h3").innerHTML =
        t.projectFollowTitle;

    timelineItems[4].querySelectorAll("p")[1].textContent =
        t.projectFollowText;


    /* 6 — LANGUES */

    timelineItems[5].querySelector(".timeline-year").textContent =
        t.languagesYear;

    timelineItems[5].querySelector(".timeline-category").textContent =
        t.personalCategory;

    timelineItems[5].querySelector("h3").textContent =
        t.englishTitle;

    timelineItems[5].querySelectorAll("p")[1].textContent =
        t.englishText;


    /* UNIVERS */

    const universe = document.querySelector(".about-universe");

    universe.querySelector(".section-label").textContent =
        t.universeLabel;

    universe.querySelector("h3").innerHTML =
        t.universeTitle;

    const interestCards =
        universe.querySelectorAll(".interest-card");

    interestCards[0].querySelector("h4").textContent =
        t.productDesign;

    interestCards[0].querySelector("p").textContent =
        t.productDesignText;

    interestCards[1].querySelector("h4").textContent =
        t.communication;

    interestCards[1].querySelector("p").textContent =
        t.communicationText;

    interestCards[2].querySelector("h4").textContent =
        t.videoCreation;

    interestCards[2].querySelector("p").textContent =
        t.videoCreationText;

    interestCards[3].querySelector("h4").textContent =
        t.artificialIntelligence;

    interestCards[3].querySelector("p").textContent =
        t.artificialIntelligenceText;

    interestCards[4].querySelector("h4").textContent =
        t.entrepreneurship;

    interestCards[4].querySelector("p").textContent =
        t.entrepreneurshipText;


    /* =====================================
       PROJETS
    ===================================== */

    const projects = document.querySelector("#projets");

    projects.querySelector(".section-label span:nth-child(2)").textContent =
        t.projectsLabel;

    projects.querySelector(".projects-title").innerHTML =
        t.projectsTitle;

    projects.querySelector(".projects-intro").textContent =
        t.projectsIntro;


    const projectCards =
        projects.querySelectorAll(".project-card");


    projectCards[0].querySelector(".project-meta span:nth-child(2)").textContent =
        t.projectMeta1;

    projectCards[0].querySelector("h3").innerHTML =
        t.projectTitle1;

    projectCards[0].querySelector("p").textContent =
        t.projectDescription1;


    projectCards[1].querySelector(".project-meta span:nth-child(2)").textContent =
        t.projectMeta2;

    projectCards[1].querySelector("h3").innerHTML =
        t.projectTitle2;

    projectCards[1].querySelector("p").textContent =
        t.projectDescription2;


    projectCards[2].querySelector(".project-meta span:nth-child(2)").textContent =
        t.projectMeta3;

    projectCards[2].querySelector("h3").innerHTML =
        t.projectTitle3;

    projectCards[2].querySelector("p").textContent =
        t.projectDescription3;


    projectCards[3].querySelector(".project-meta span:nth-child(2)").textContent =
        t.projectMeta4;

    projectCards[3].querySelector("h3").innerHTML =
        t.projectTitle4;

    projectCards[3].querySelector("p").textContent =
        t.projectDescription4;


    projectCards[4].querySelector(".project-meta span:nth-child(2)").textContent =
        t.projectMeta5;

    projectCards[4].querySelector("h3").innerHTML =
        t.projectTitle5;

    projectCards[4].querySelector("p").textContent =
        t.projectDescription5;


    /* BOUTONS PROJETS */

    projectCards.forEach(card => {

        const button = card.querySelector(".project-link span");

        if (button) {
            button.textContent = t.projectLink;
        }

    });


    const projectsBottom =
        projects.querySelector(".projects-bottom");

    projectsBottom.children[0].textContent =
        t.projectBottom;

    projectsBottom.children[2].textContent =
        t.projectsCount;


    /* =====================================
       COMPÉTENCES
    ===================================== */

    const skills = document.querySelector("#competences");

    skills.querySelector(".section-label span:nth-child(2)").textContent =
        t.skillsLabel;

    skills.querySelector(".skills-title").innerHTML =
        t.skillsTitle;

    skills.querySelector(".skills-intro").textContent =
        t.skillsIntro;


    const skillCategories =
        skills.querySelectorAll(".skill-category");


    skillCategories[0].querySelector(".skill-category-title").textContent =
        t.design;

    skillCategories[0].querySelector(".skill-category-description").textContent =
        t.designDescription;


    skillCategories[1].querySelector(".skill-category-title").textContent =
        t.development;

    skillCategories[1].querySelector(".skill-category-description").textContent =
        t.developmentDescription;


    skillCategories[2].querySelector(".skill-category-title").textContent =
        t.data;

    skillCategories[2].querySelector(".skill-category-description").textContent =
        t.dataDescription;


    skillCategories[3].querySelector(".skill-category-title").textContent =
        t.videoAI;

    skillCategories[3].querySelector(".skill-category-description").textContent =
        t.videoAIDescription;


    skills.querySelector(".skills-footer p").innerHTML =
        t.skillsFooter;


    /* =====================================
       CONTACT
    ===================================== */

    const contact = document.querySelector("#contact");

    contact.querySelector(".contact-label span:nth-child(2)").textContent =
        t.contactLabel;

    contact.querySelector(".contact-heading h2").innerHTML =
        t.contactTitle;

    contact.querySelector(".contact-heading p").textContent =
        t.contactDescription;

    contact.querySelector(".contact-block-title").textContent =
        t.findMe;


    const contactBlocks =
        contact.querySelectorAll(".contact-block");


    contactBlocks[1].querySelector(".contact-block-title").textContent =
        language === "fr" ? "DISPONIBILITÉ" : "AVAILABILITY";


    contact.querySelector(".availability-card strong").textContent =
        t.availabilityTitle;

    contact.querySelector(".availability-card p").textContent =
        t.availabilityText;


    /* FORMULAIRE */

    contact.querySelector('label[for="name"]').textContent =
        t.nameLabel;

    contact.querySelector('label[for="email"]').textContent =
        t.emailLabel;

    contact.querySelector('label[for="message"]').textContent =
        t.messageLabel;


    contact.querySelector("#name").placeholder =
        t.namePlaceholder;

    contact.querySelector("#email").placeholder =
        t.emailPlaceholder;

    contact.querySelector("#message").placeholder =
        t.messagePlaceholder;


    contact.querySelector(".contact-submit span").textContent =
        t.sendMessage;


    /* FOOTER */

    const footerSpans =
        contact.querySelectorAll(".contact-footer span");

    footerSpans[1].textContent =
        t.footerCreated;


    /* =====================================
       BOUTONS FR / EN
    ===================================== */

    if (language === "fr") {

        languageFR.classList.add("active");
        languageEN.classList.remove("active");

    } else {

        languageEN.classList.add("active");
        languageFR.classList.remove("active");

    }


    /* =====================================
       SAUVEGARDER LA LANGUE
    ===================================== */

    localStorage.setItem("language", language);
}


/* =========================================
   CLIC SUR FR 🇫🇷
========================================= */

if (languageFR) {

    languageFR.addEventListener("click", () => {
        setLanguage("fr");
    });

}


/* =========================================
   CLIC SUR EN 🇺🇸
========================================= */

if (languageEN) {

    languageEN.addEventListener("click", () => {
        setLanguage("en");
    });

}


/* =========================================
   LANGUE AU CHARGEMENT
========================================= */

const savedLanguage =
    localStorage.getItem("language") || "fr";

setLanguage(savedLanguage);