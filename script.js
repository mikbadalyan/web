// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // For a single page, we'll scroll to the section
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active class
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Update active link on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add animation to elements when they come into view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Language data for translation
const languageData = {
    en: {
        home: "Home",
        certificates: "Certificates",
        awards: "Awards",
        projects: "Projects",
        volunteering: "Volunteering",
        name: "Mikayel Badalyan",
        bio: "Computer Science Student | AI & Machine Learning Developer | Back-End Developer",
        telegram: "Telegram",
        facebook: "Facebook",
        instagram: "Instagram",
        github: "GitHub",
        linkedin: "LinkedIn",
        twitter: "X",
        email: "contact@mikayelbadalyan.com",
        certificateSection: "Certificates",
        awardSection: "Awards",
        volunteeringSection: "Volunteering",
        delfTitle: "DELF B2",
        delfDesc: "Diplôme d'Études en Langue Française - French Language Proficiency",
        cambridgeTitle: "Cambridge B2 First",
        cambridgeDesc: "English Language Proficiency Certification",
        synergyTitle: "Synergy Summer School",
        synergyDesc: "Advanced Technology and Innovation Program",
        droneTitle: "Drone Edulab",
        droneDesc: "Drone Technology and Applications Certification",
        aiHackathonTitle: "AI Hackathon",
        aiHackathonDesc: "First Place in Artificial Intelligence Innovation Challenge",
        greenTechTitle: "GreenTech Innovation",
        greenTechDesc: "Outstanding Contribution to Sustainable Technology",
        sss23Title: "SSS23 Program",
        sss23Desc: "Summer Science School Volunteer - Mentoring and Organizing",
        viewCertificate: "View Certificate",
        viewAward: "View Award"
    },
    fr: {
        home: "Accueil",
        certificates: "Certificats",
        awards: "Prix",
        projects: "Projets",
        volunteering: "Bénévolat",
        name: "Mikayel Badalyan",
        nameFrench: "Mikayel BADALYAN",
        bio: "Étudiant en Informatique | Développeur IA et Machine Learning | Développeur Back-End",
        telegram: "Telegram",
        facebook: "Facebook",
        instagram: "Instagram",
        github: "GitHub",
        linkedin: "LinkedIn",
        twitter: "X",
        email: "contact@mikayelbadalyan.com",
        certificateSection: "Certificats",
        awardSection: "Prix",
        volunteeringSection: "Bénévolat",
        delfTitle: "DELF B2",
        delfDesc: "Diplôme d'Études en Langue Française - Maîtrise du Français",
        cambridgeTitle: "Cambridge B2 First",
        cambridgeDesc: "Certification de Maîtrise de l'Anglais",
        synergyTitle: "École d'Été Synergy",
        synergyDesc: "Programme de Technologie et d'Innovation Avancée",
        droneTitle: "Drone Edulab",
        droneDesc: "Certification en Technologie et Applications de Drones",
        aiHackathonTitle: "Hackathon IA",
        aiHackathonDesc: "Première Place au Défi d'Innovation en Intelligence Artificielle",
        greenTechTitle: "Innovation GreenTech",
        greenTechDesc: "Contribution Exceptionnelle à la Technologie Durable",
        sss23Title: "Programme SSS23",
        sss23Desc: "Bénévole à l'École de Sciences d'Été - Encadrement et Organisation",
        viewCertificate: "Voir le Certificat",
        viewAward: "Voir le Prix"
    }
};

// Enhanced animations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add delay classes for staggered animations
    const elements = document.querySelectorAll('.profile-section, .text-section');
    elements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.2}s`;
    });
    
    // Add click event for social media icons
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add a bounce effect
            this.style.transform = 'translateY(-8px) scale(1.1)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
            
            // Allow the default behavior (following the link)
            // The link will open in a new tab due to target="_blank" in HTML
        });
    });
    
    // Add hover effect to contact
    const contact = document.querySelector('.contact');
    if (contact) {
        contact.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        contact.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    }
    
    // Language selector functionality
    const languageLinks = document.querySelectorAll('.language-link');
    languageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all language links
            languageLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the selected language
            const selectedLang = this.getAttribute('data-lang');
            
            // Change the language
            changeLanguage(selectedLang);
            
            // Add a visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Modal functionality for certificates, awards, and volunteering
    const modal = document.getElementById('modal');
    const modalIframe = document.getElementById('modal-iframe');
    const closeBtn = document.querySelector('.close');
    
    // View certificate buttons
    const viewCertificateButtons = document.querySelectorAll('.view-certificate-btn, .view-award-btn, .view-volunteering-btn');
    viewCertificateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parentCard = this.closest('.certificate-card, .award-card, .volunteering-card');
            const documentPath = parentCard.getAttribute('data-certificate') || 
                                parentCard.getAttribute('data-award') || 
                                parentCard.getAttribute('data-volunteering');
            
            if (documentPath) {
                modalIframe.src = documentPath;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        modalIframe.src = '';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            modalIframe.src = '';
            document.body.style.overflow = 'auto';
        }
    });
});

// Function to change language
function changeLanguage(lang) {
    // Update navigation links based on current page
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'index.html' || currentPage === '') {
        // Update name (special handling for French to make surname uppercase)
        if (lang === 'fr') {
            document.querySelector('.name').textContent = languageData[lang].nameFrench;
        } else {
            document.querySelector('.name').textContent = languageData[lang].name;
        }
        
        // Update bio
        document.querySelector('.bio').textContent = languageData[lang].bio;
        
        // Update social media labels
        document.querySelector('.social-link.telegram span').textContent = languageData[lang].telegram;
        document.querySelector('.social-link.facebook span').textContent = languageData[lang].facebook;
        document.querySelector('.social-link.instagram span').textContent = languageData[lang].instagram;
        document.querySelector('.social-link.github span').textContent = languageData[lang].github;
        document.querySelector('.social-link.linkedin span').textContent = languageData[lang].linkedin;
        document.querySelector('.social-link.twitter span').textContent = languageData[lang].twitter;
        
        // Update email (remains the same in both languages)
        document.querySelector('.email').textContent = languageData[lang].email;
    } else if (currentPage === 'certificates.html') {
        // Update section title
        document.querySelector('.section-title').textContent = languageData[lang].certificateSection;
        
        // Update certificate content
        const certificates = document.querySelectorAll('.certificate-card');
        if (certificates.length >= 4) {
            certificates[0].querySelector('.certificate-title').textContent = languageData[lang].delfTitle;
            certificates[0].querySelector('.view-certificate-btn').textContent = languageData[lang].viewCertificate;
            
            certificates[1].querySelector('.certificate-title').textContent = languageData[lang].cambridgeTitle;
            certificates[1].querySelector('.view-certificate-btn').textContent = languageData[lang].viewCertificate;
            
            certificates[2].querySelector('.certificate-title').textContent = languageData[lang].synergyTitle;
            certificates[2].querySelector('.view-certificate-btn').textContent = languageData[lang].viewCertificate;
            
            certificates[3].querySelector('.certificate-title').textContent = languageData[lang].droneTitle;
            certificates[3].querySelector('.view-certificate-btn').textContent = languageData[lang].viewCertificate;
        }
    } else if (currentPage === 'awards.html') {
        // Update section title
        document.querySelector('.section-title').textContent = languageData[lang].awardSection;
        
        // Update award content
        const awards = document.querySelectorAll('.award-card');
        if (awards.length >= 2) {
            awards[0].querySelector('.award-title').textContent = languageData[lang].aiHackathonTitle;
            awards[0].querySelector('.view-award-btn').textContent = languageData[lang].viewAward;
            
            awards[1].querySelector('.award-title').textContent = languageData[lang].greenTechTitle;
            awards[1].querySelector('.view-award-btn').textContent = languageData[lang].viewAward;
        }
    } else if (currentPage === 'volunteering.html') {
        // Update section title
        document.querySelector('.section-title').textContent = languageData[lang].volunteeringSection;
        
        // Update volunteering content
        const volunteering = document.querySelector('.volunteering-card');
        if (volunteering) {
            volunteering.querySelector('.volunteering-title').textContent = languageData[lang].sss23Title;
            volunteering.querySelector('.view-volunteering-btn').textContent = languageData[lang].viewCertificate;
        }
    } else if (currentPage === 'projects.html') {
        // Update section title
        document.querySelector('.section-title').textContent = languageData[lang].projects;
    }
    
    // Update navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    if (navLinks.length >= 5) {
        navLinks[0].textContent = languageData[lang].home;
        navLinks[1].textContent = languageData[lang].certificates;
        navLinks[2].textContent = languageData[lang].awards;
        navLinks[3].textContent = languageData[lang].projects;
        navLinks[4].textContent = languageData[lang].volunteering;
    }
    
    // Store the selected language in localStorage
    localStorage.setItem('selectedLanguage', lang);
}

// Add a subtle parallax effect to background shapes
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = (window.innerWidth - e.pageX) / 50;
    const y = (window.innerHeight - e.pageY) / 50;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        shape.style.transform = `translate(${x * speed}px, ${y * speed}px) ${shape.style.transform || ''}`;
    });
});

// Load saved language preference on page load
window.addEventListener('load', function() {
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    const activeLangLink = document.querySelector(`.language-link[data-lang="${savedLang}"]`);
    
    if (activeLangLink) {
        // Remove active class from all language links
        document.querySelectorAll('.language-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to saved language
        activeLangLink.classList.add('active');
        
        // Apply the language
        changeLanguage(savedLang);
    }
});

// Scroll to Top Button Functionality
window.addEventListener('scroll', function() {
    const scrollToTopButton = document.getElementById('scrollToTop');
    if (window.pageYOffset > 300) {
        scrollToTopButton.classList.add('show');
    } else {
        scrollToTopButton.classList.remove('show');
    }
});

document.getElementById('scrollToTop').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
