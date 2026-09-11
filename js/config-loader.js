// Configuration loader and router utility
import themeManager from './theme-manager.js';

class ConfigLoader {
    constructor() {
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '') || 'index';
        this.currentPage = page;
        this.config = null;
    }

    async loadConfig() {
        try {
            const timestamp = new Date().getTime();
            console.log(`Loading config for page: ${this.currentPage}`);
            const configUrl = new URL(`config/${this.currentPage}.config.json?t=${timestamp}`, document.baseURI);
            const response = await fetch(configUrl);
            if (!response.ok) throw new Error('Config not found');
            this.config = await response.json();
            console.log('Config loaded successfully:', this.config);
            return this.config;
        } catch (error) {
            console.error('Error loading configuration:', error);
            return null;
        }
    }

    applyConfig() {
        if (!this.config) {
            console.error('No config loaded, cannot apply');
            return;
        }

        document.title = this.config.page.title;
        const favicon = document.querySelector('link[rel="icon"]');
        if (favicon) favicon.href = this.config.page.favicon;

        const headerName = document.querySelector('header a.text-2xl');
        if (headerName) {
            headerName.innerHTML = `<span class="text-accent-color">&#9679;</span> ${this.config.header.name}`;
            if (this.config.header.subtitle) {
                headerName.innerHTML += `&nbsp;&nbsp;<span class="font-light text-subtext-color text-lg hidden sm:inline">${this.config.header.subtitle}</span>`;
            }
        }

        const nav = document.querySelector('header nav div');
        if (nav && this.config.navigation.links) {
            nav.innerHTML = this.config.navigation.links
                .map(link => `<a href="${link.url}" class="nav-link${link.active ? ' text-accent-color font-semibold' : ''}">${link.text}</a>`)
                .join('');
        }

        const socialLinks = document.querySelector('.fixed.left-2');
        if (socialLinks && this.config.socialLinks) {
            const links = [];
            if (this.config.socialLinks.github) links.push(`<a href="${this.config.socialLinks.github}" target="_blank" rel="noopener noreferrer" title="GitHub" class="floating-icon-link"><i class="fab fa-github"></i></a>`);
            if (this.config.socialLinks.linkedin) links.push(`<a href="${this.config.socialLinks.linkedin}" target="_blank" rel="noopener noreferrer" title="LinkedIn" class="floating-icon-link"><i class="fab fa-linkedin-in"></i></a>`);
            if (this.config.socialLinks.email) links.push(`<a href="mailto:${this.config.socialLinks.email}" title="Email" class="floating-icon-link"><i class="fas fa-envelope"></i></a>`);
            if (this.config.socialLinks.googleScholar) links.push(`<a href="${this.config.socialLinks.googleScholar}" target="_blank" rel="noopener noreferrer" title="Google Scholar" class="floating-icon-link"><i class="fas fa-graduation-cap"></i></a>`);
            links.push(`<button id="theme-toggle-float" title="Toggle Theme" class="floating-icon-link"><i id="theme-toggle-float-icon" class="fas fa-sun"></i></button>`);
            socialLinks.innerHTML = links.join('');
            themeManager.reinitializeToggles();
        }

        const lastUpdate = document.getElementById('lastUpdate');
        if (lastUpdate && this.config.footer) lastUpdate.textContent = this.config.footer.lastUpdated;
        this.applyPageContent();
    }

    applyPageContent() {
        switch (this.currentPage) {
            case 'index': this.applyIndexContent(); break;
            case 'projects': this.applyProjectsContent(); break;
            case 'publications': this.applyPublicationsContent(); break;
            case 'resume': this.applyResumeContent(); break;
            case 'cv': this.applyCvContent(); break;
            default: console.error('Unknown page type:', this.currentPage);
        }
    }

    applyIndexContent() {
        if (!this.config.main) return;
        const profileImg = document.getElementById('profile-image');
        if (profileImg) {
            profileImg.src = this.config.main.profile.image;
            profileImg.alt = this.config.main.profile.altText;
            profileImg.onerror = () => { profileImg.src = this.config.main.profile.fallbackImage; };
        }
        const greeting = document.getElementById('greeting');
        if (greeting) greeting.textContent = this.config.main.greeting;
        const subheading = document.getElementById('subheading');
        if (subheading) subheading.textContent = this.config.main.subheading;
        const description = document.getElementById('description');
        if (description) description.textContent = this.config.main.description;
        const circlesContainer = document.getElementById('main-circles');
        if (circlesContainer && this.config.main.circles) {
            circlesContainer.innerHTML = this.config.main.circles.map(circle => `
                <a href="${circle.link}" class="action-button ${circle.class}"${circle.external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${circle.label}</a>
            `).join('');
        }
    }

    applyCvContent() {
        const main = this.config.main;
        if (!main) return;
        const title = document.getElementById('main-title');
        if (title) title.textContent = main.title;
        this.updateResumeDownloadSection(main.downloadSection);
        const setTitle = (id, value) => { const element = document.getElementById(id); if (element) element.textContent = value; };
        const setCards = (id, cards) => { const element = document.getElementById(id); if (element) element.innerHTML = cards.join(''); };
        const card = content => `<div class="bg-card p-6 rounded-lg card-shadow">${content}</div>`;

        setTitle('summary-title', main.professionalSummary.title);
        setCards('summary-content', main.professionalSummary.paragraphs.map(paragraph => `<p class="text-text-color">${paragraph}</p>`));
        setTitle('education-title', main.education.title);
        setCards('education-list', main.education.degrees.map(degree => card(`<h3 class="text-xl font-semibold text-header-text">${degree.degree}</h3><p class="text-accent-color">${degree.school} | ${degree.location} | ${degree.period}</p><ul class="mt-4 space-y-2 text-text-color">${degree.details.map(detail => `<li>• ${detail}</li>`).join('')}</ul>`)));
        setTitle('publications-title', main.publications.title);
        setCards('publications-list', main.publications.items.map(item => card(`<p class="text-text-color">• ${item}</p>`)));
        setTitle('academic-projects-title', main.academicProjects.title);
        setCards('academic-projects-list', main.academicProjects.items.map(item => card(`<h3 class="text-xl font-semibold text-header-text">${item.title}</h3><p class="mt-4 text-text-color">${item.description}</p>`)));
        setTitle('experience-title', main.experience.title);
        setCards('experience-list', main.experience.jobs.map(job => card(`<h3 class="text-xl font-semibold text-header-text">${job.title}</h3><p class="text-accent-color">${job.company}${job.location ? ` | ${job.location}` : ''} | ${job.period}</p><ul class="mt-4 space-y-2 text-text-color">${job.responsibilities.map(item => `<li>• ${item}</li>`).join('')}</ul>`)));
        setTitle('technical-skills-title', main.technicalSkills.title);
        setCards('technical-skills-list', main.technicalSkills.items.map(item => `<p class="text-text-color mb-3 last:mb-0">• ${item}</p>`));
        setTitle('languages-title', main.languages.title);
        setCards('languages-list', main.languages.items.map(item => `<p class="text-text-color">• ${item}</p>`));
        setTitle('references-title', main.references.title);
        setCards('references-list', main.references.items.map(reference => card(`<h3 class="text-xl font-semibold text-header-text">${reference.name}</h3><p class="text-accent-color">${reference.role}</p><p class="mt-2 text-text-color">${reference.position}</p>`)));
    }

    applyProjectsContent() {
        if (!this.config.main) return;
        const title = document.querySelector('h1.page-title');
        if (title) title.textContent = this.config.main.title;
        const subtitle = document.querySelector('p.page-subtitle');
        if (subtitle) subtitle.textContent = this.config.main.subtitle;
        const projectsContainer = document.querySelector('.grid');
        if (projectsContainer && this.config.main.projects) projectsContainer.innerHTML = this.config.main.projects.map(project => this.createProjectCard(project)).join('');
    }

    applyPublicationsContent() {
        if (!this.config.main) return;
        const title = document.querySelector('h1.page-title');
        if (title) title.textContent = this.config.main.title;
        const subtitle = document.querySelector('p.page-subtitle');
        if (subtitle) subtitle.textContent = this.config.main.subtitle;
        this.updatePublicationSection('academic', this.config.main.sections.academic);
        this.updatePublicationSection('technical', this.config.main.sections.technical);
    }

    applyResumeContent() {
        if (!this.config.main) return;
        const title = document.querySelector('h1.page-title');
        if (title) title.textContent = this.config.main.title;
        this.updateResumeDownloadSection(this.config.main.downloadSection);
        const experienceSection = document.getElementById('experience-list');
        if (experienceSection) experienceSection.innerHTML = this.config.main.experience.jobs.map(job => `<div class="bg-card p-6 rounded-lg card-shadow"><h3 class="text-xl font-semibold text-header-text">${job.title}</h3><p class="text-accent-color">${job.company} | ${job.period}</p><ul class="mt-4 space-y-2 text-text-color">${job.responsibilities.map(resp => `<li>• ${resp}</li>`).join('')}</ul></div>`).join('');
        const education = this.config.main.education.degrees[0];
        const educationCard = document.getElementById('education-card');
        if (educationCard) educationCard.innerHTML = `<h3 class="text-xl font-semibold text-header-text">${education.degree}</h3><p class="text-accent-color">${education.school} | ${education.period}</p><p class="mt-2 text-text-color">${education.focus}</p>`;
        const skillsGrid = document.getElementById('skills-grid');
        if (skillsGrid) {
            const { technical, soft } = this.config.main.skills.categories;
            skillsGrid.innerHTML = `<div><h3 class="text-lg font-semibold text-header-text mb-3">${technical.title}</h3><ul class="space-y-2 text-text-color">${technical.items.map(item => `<li>• ${item}</li>`).join('')}</ul></div><div><h3 class="text-lg font-semibold text-header-text mb-3">${soft.title}</h3><ul class="space-y-2 text-text-color">${soft.items.map(item => `<li>• ${item}</li>`).join('')}</ul></div>`;
        }
    }

    createProjectCard(project) {
        return `<div class="project-card" id="${project.id}"><img src="${project.image.src}" alt="${project.image.alt}" onerror="this.src='${project.image.fallback}';"><div class="project-card-content"><h3 class="project-card-title">${project.title}</h3><p class="project-card-description">${project.description}</p><p class="project-card-tech">${project.technologies.join(', ')}</p><div class="project-card-links mt-4">${project.links.github ? `<a href="${project.links.github}" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i> View Code</a>` : ''}${project.links.demo ? `<a href="${project.links.demo}" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}</div></div></div>`;
    }

    updatePublicationSection(type, section) {
        const container = document.getElementById(type === 'academic' ? 'academic-publications' : 'technical-articles');
        if (!container || !section) return;
        const items = type === 'academic' ? section.publications : section.articles;
        container.innerHTML = items.map(item => type === 'academic' ? this.createAcademicPublicationCard(item) : this.createTechnicalArticleCard(item)).join('');
    }

    createAcademicPublicationCard(pub) {
        return `<div class="bg-card p-6 rounded-lg card-shadow"><h3 class="text-xl font-semibold text-header-text">${pub.title}</h3><p class="text-accent-color mt-2">${pub.venue}</p><p class="mt-4 text-text-color">${pub.description}</p><div class="mt-4 flex gap-4">${pub.links.paper ? `<a href="${pub.links.paper}" class="text-accent-color hover:underline flex items-center"><i class="fas fa-file-pdf mr-2"></i> Read Paper</a>` : ''}${pub.links.cite ? `<a href="${pub.links.cite}" class="text-accent-color hover:underline flex items-center"><i class="fas fa-quote-right mr-2"></i> Cite</a>` : ''}</div></div>`;
    }

    createTechnicalArticleCard(article) {
        return `<div class="bg-card p-6 rounded-lg card-shadow"><h3 class="text-xl font-semibold text-header-text">${article.title}</h3><p class="text-accent-color mt-2">${article.publisher}</p><p class="mt-4 text-text-color">${article.description}</p>${article.link ? `<a href="${article.link}" class="inline-block mt-4 text-accent-color hover:underline">Read Article</a>` : ''}</div>`;
    }

    updateResumeDownloadSection(downloadSection) {
        if (!downloadSection) return;
        const { title, description, button } = downloadSection;
        const target = document.getElementById('download-section');
        if (!target) return;
        target.innerHTML = `<div class="text-center sm:text-left mb-4 sm:mb-0"><h2 class="text-xl font-semibold text-header-text mb-2">${title}</h2><p class="text-subtext-color">${description}</p></div><a href="${button.link}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-6 py-3 bg-accent-color text-header-text font-semibold rounded-lg hover:bg-resume-btn-hover transition-colors duration-200"><i class="fab fa-google-drive mr-2"></i>${button.text}</a>`;
    }
}

const configLoader = new ConfigLoader();
configLoader.loadConfig().then(config => { if (config) configLoader.applyConfig(); });
export default configLoader;
