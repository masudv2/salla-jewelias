import BasePage from "./base-page";

class Home extends BasePage {
    onReady() {
        this.initScrollReveal();
    }

    initScrollReveal() {
        const targets = document.querySelectorAll('.jw-rv');
        if (!targets.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('jw-vis');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        targets.forEach(el => observer.observe(el));
    }
}

Home.initiateWhenReady(['index']);
