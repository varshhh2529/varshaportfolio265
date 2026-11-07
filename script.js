
// =====================================
// LOAD PORTFOLIO DATA USING FETCH API
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const loadingMessage = document.getElementById("loadingMessage");
    const errorMessage = document.getElementById("errorMessage");
    const portfolioContent = document.getElementById("portfolioContent");

    async function loadPortfolio() {

        try {

            const response = await fetch("data.json");

            if (!response.ok) {
                throw new Error("Unable to load JSON data");
            }

            const data = await response.json();

            // Display all portfolio sections
            displayPersonalDetails(data.personal);
            displayAbout(data.about);
            displaySkills(data.skills);
            displayProjects(data.projects);
            displayEducation(data.education);
            displayCertifications(data.certifications);
            displayContact(data.personal, data.social);
            displayFooter(data.personal, data.social);

            // Show portfolio after loading
            loadingMessage.classList.add("d-none");
            portfolioContent.classList.remove("d-none");

            // Enable navbar interactions
            setupNavbar();

        } catch (error) {

            console.error("Portfolio loading error:", error);

            loadingMessage.classList.add("d-none");
            errorMessage.classList.remove("d-none");

        }
    }


    // =====================================
    // PERSONAL DETAILS
    // =====================================

    function displayPersonalDetails(personal) {

        document.title = personal.name + " | Personal Portfolio";

        document.getElementById("navbarName").innerHTML =
            `${escapeHTML(personal.shortName)}<span>.</span>`;

        document.getElementById("heroName").textContent = personal.name;

        document.getElementById("heroRole").textContent = personal.role;

        document.getElementById("heroIntro").textContent =
            personal.introduction;

        document.getElementById("careerGoal").textContent =
            personal.careerGoal;

        const profileImage = document.getElementById("profileImage");

        profileImage.src = personal.profileImage;
        profileImage.alt = personal.name + " profile photo";

        document.getElementById("resumeLink").href =
            personal.resume;

        document.getElementById("footerName").textContent =
            personal.name;

        document.getElementById("copyright").textContent =
            `© ${new Date().getFullYear()} ${personal.name}. All Rights Reserved.`;

        // Hero social links
        renderSocialLinks(
            document.getElementById("heroSocials"),
            window.portfolioSocials || {}
        );
    }


    // =====================================
    // ABOUT SECTION
    // =====================================

    function displayAbout(about) {

        document.getElementById("aboutName").textContent =
            about.heading;

        document.getElementById("aboutRole").textContent =
            about.subtitle;

        document.getElementById("aboutDescription").textContent =
            about.description;

        document.getElementById("aboutObjective").textContent =
            about.objective;

        const aboutInfo = document.getElementById("aboutInfo");

        aboutInfo.innerHTML = `
            <p><i class="bi bi-mortarboard"></i>
            ${escapeHTML(about.course)}</p>

            <p><i class="bi bi-book"></i>
            ${escapeHTML(about.semester)}</p>

            <p><i class="bi bi-geo-alt"></i>
            ${escapeHTML(about.location)}</p>
        `;
    }


    // =====================================
    // SKILLS SECTION
    // =====================================

    function displaySkills(skills) {

        const container = document.getElementById("skillsContainer");

        container.innerHTML = "";

        skills.forEach(skill => {

            const card = document.createElement("div");

            card.className = "col-6 col-md-4 col-lg-4 col-xl-4";

            const percentage = Math.min(
                100,
                Math.max(0, Number(skill.level) || 0)
            );

            card.innerHTML = `
                <div class="skill-card">

                    <div class="skill-icon">
                        <i class="bi ${escapeHTML(skill.icon)}"></i>
                    </div>

                    <h5>${escapeHTML(skill.name)}</h5>

                    <div class="skill-level">
                        <div class="skill-progress"
                            style="width: ${percentage}%">
                        </div>
                    </div>

                    <p class="skill-percentage">
                        ${percentage}% - ${escapeHTML(skill.levelText)}
                    </p>

                </div>
            `;

            container.appendChild(card);
        });
    }


    // =====================================
    // PROJECTS SECTION
    // =====================================

    function displayProjects(projects) {

        const container = document.getElementById("projectsContainer");

        container.innerHTML = "";

        projects.forEach(project => {

            const card = document.createElement("div");

            card.className = "col-md-6 col-lg-6 col-xl-6";

            const technologies = project.technologies.map(tech => `
                <span class="tech-badge">
                    ${escapeHTML(tech)}
                </span>
            `).join("");

            card.innerHTML = `

                <div class="project-card">

                    <div class="project-image-wrapper">
                        <img
                            src="${safeUrl(project.image)}"
                            alt="${escapeHTML(project.name)}"
                            class="project-img"
                            loading="lazy">
                    </div>

                    <div class="project-content">

                        <h4>${escapeHTML(project.name)}</h4>

                        <p>${escapeHTML(project.description)}</p>

                        <div>${technologies}</div>

                        <a href="${safeUrl(project.link)}"
                           class="project-link"
                           target="_blank"
                           rel="noopener noreferrer">

                            View Project
                            <i class="bi bi-arrow-up-right"></i>

                        </a>

                    </div>

                </div>
            `;

            container.appendChild(card);
        });
    }


    // =====================================
    // EDUCATION SECTION
    // =====================================

    function displayEducation(education) {

        const container =
            document.getElementById("educationContainer");

        container.innerHTML = "";

        education.forEach(item => {

            const card = document.createElement("div");

            card.className = "education-card";

            card.innerHTML = `

                <span class="education-year">
                    ${escapeHTML(item.year)}
                </span>

                <h4 class="mt-2">
                    ${escapeHTML(item.course)}
                </h4>

                <p>
                    <i class="bi bi-building"></i>
                    ${escapeHTML(item.college)}
                </p>

                <p>
                    <i class="bi bi-bookmark-check"></i>
                    ${escapeHTML(item.details)}
                </p>

                <p>
                    <i class="bi bi-award"></i>
                    ${escapeHTML(item.result)}
                </p>

            `;

            container.appendChild(card);
        });
    }


    // =====================================
    // CERTIFICATIONS SECTION
    // =====================================

    function displayCertifications(certifications) {

        const container =
            document.getElementById("certificationsContainer");

        container.innerHTML = "";

        certifications.forEach(certificate => {

            const card = document.createElement("div");

            card.className = "col-md-6 col-lg-6";

            card.innerHTML = `

                <div class="certificate-card">

                    <div class="certificate-icon">
                        <i class="bi bi-patch-check-fill"></i>
                    </div>

                    <div>

                        <h5>
                            ${escapeHTML(certificate.name)}
                        </h5>

                        <p>
                            ${escapeHTML(certificate.issuer)}
                        </p>

                        <p>
                            ${escapeHTML(certificate.year)}
                        </p>

                        <p>
                            ${escapeHTML(certificate.description)}
                        </p>

                        ${
                            certificate.link
                            ? `<a class="project-link"
                                href="${safeUrl(certificate.link)}"
                                target="_blank"
                                rel="noopener noreferrer">
                                View Certificate
                                <i class="bi bi-arrow-up-right"></i>
                               </a>`
                            : ""
                        }

                    </div>

                </div>

            `;

            container.appendChild(card);
        });
    }


    // =====================================
    // CONTACT SECTION
    // =====================================

    function displayContact(personal, social) {

        document.getElementById("contactEmail").textContent =
            personal.email;

        document.getElementById("contactEmail").href =
            "mailto:" + personal.email;

        document.getElementById("contactPhone").textContent =
            personal.phone;

        document.getElementById("contactLocation").textContent =
            personal.location;

        renderSocialLinks(
            document.getElementById("contactSocials"),
            social
        );

        // Save social links for hero section
        window.portfolioSocials = social;

        renderSocialLinks(
            document.getElementById("heroSocials"),
            social
        );
    }


    // =====================================
    // SOCIAL MEDIA LINKS
    // =====================================

    function renderSocialLinks(container, social) {

        container.innerHTML = "";

        const icons = {
            github: "bi-github",
            linkedin: "bi-linkedin",
            instagram: "bi-instagram",
            facebook: "bi-facebook",
            twitter: "bi-twitter-x"
        };

        Object.keys(icons).forEach(platform => {

            const url = social[platform];

            if (url) {

                const link = document.createElement("a");

                link.href = safeUrl(url);

                link.target = "_blank";

                link.rel = "noopener noreferrer";

                link.setAttribute(
                    "aria-label",
                    platform
                );

                link.innerHTML = `
                    <i class="bi ${icons[platform]}"></i>
                `;

                container.appendChild(link);
            }
        });
    }


    // =====================================
    // FOOTER
    // =====================================

    function displayFooter(personal, social) {

        document.getElementById("footerName").textContent =
            personal.name;

        document.getElementById("copyright").textContent =
            `© ${new Date().getFullYear()} ${personal.name}. All Rights Reserved.`;

        renderSocialLinks(
            document.getElementById("footerSocials"),
            social
        );
    }


    // =====================================
    // NAVBAR ACTIVE LINK & AUTO CLOSE
    // =====================================

    function setupNavbar() {

        const navLinks = document.querySelectorAll(".nav-link");

        const navbarMenu = document.getElementById("navbarMenu");

        navLinks.forEach(link => {

            link.addEventListener("click", function () {

                navLinks.forEach(item =>
                    item.classList.remove("active")
                );

                this.classList.add("active");

                const collapse =
                    bootstrap.Collapse.getInstance(navbarMenu);

                if (collapse && window.innerWidth < 992) {
                    collapse.hide();
                }
            });
        });
    }


    // =====================================
    // CONTACT FORM VALIDATION
    // =====================================

    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim();

        const subject = document.getElementById("subject").value.trim();

        const message = document.getElementById("message").value.trim();

        let isValid = true;

        // Clear previous errors

        document.querySelectorAll(".validation-error").forEach(error => {
            error.textContent = "";
        });

        document.getElementById("formStatus").textContent = "";

        // Name validation

        if (name.length < 2) {

            document.getElementById("nameError").textContent =
                "Please enter at least 2 characters.";

            isValid = false;
        }

        // Email validation

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            document.getElementById("emailError").textContent =
                "Please enter a valid email address.";

            isValid = false;
        }

        // Subject validation

        if (subject.length < 3) {

            document.getElementById("subjectError").textContent =
                "Please enter a valid subject.";

            isValid = false;
        }

        // Message validation

        if (message.length < 10) {

            document.getElementById("messageError").textContent =
                "Message must contain at least 10 characters.";

            isValid = false;
        }

        if (!isValid) {
            return;
        }

        // Open default email application
        const recipient = window.portfolioEmail;

        const mailSubject = encodeURIComponent(subject);

        const mailBody = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );

        document.getElementById("formStatus").textContent =
            "Opening your email application...";

        window.location.href =
            `mailto:${recipient}?subject=${mailSubject}&body=${mailBody}`;

        contactForm.reset();

    });


    // =====================================
    // HELPER FUNCTIONS
    // =====================================

    // Prevent HTML injection from JSON text
    function escapeHTML(value) {

        return String(value ?? "").replace(/[&<>"']/g, function (char) {

            const entities = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            };

            return entities[char];
        });
    }


    // Allow only safe URLs
    function safeUrl(value) {

        try {

            const url = new URL(value, window.location.href);

            if (
                ["http:", "https:"].includes(url.protocol) ||
                (url.protocol === "mailto:" && !value.startsWith("//"))
            ) {
                return url.href;
            }

        } catch (error) {
            console.warn("Invalid URL:", value);
        }

        return "#";
    }


    // Store recipient email for contact form
    window.portfolioEmail = "";

    // Start loading portfolio
    loadPortfolio().then(() => {

        // Email will be set from JSON below after successful loading
    });

    // Update email when data is loaded
    const originalDisplayContact = displayContact;

});

