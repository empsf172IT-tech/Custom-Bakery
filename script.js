document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Theme Toggle (Donut)
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const donutIcon = document.getElementById('donutIcon');
    const donutIconMobile = document.getElementById('donutIconMobile');

    // Check saved theme
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
        updateDonutIcon('dark');
    } else {
        htmlElement.classList.remove('dark');
        updateDonutIcon('light');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');
            const isDark = htmlElement.classList.contains('dark');
            
            // Animation for donut
            if (donutIcon) donutIcon.style.transform = 'rotate(180deg) scale(0.8)';
            if (donutIconMobile) donutIconMobile.style.transform = 'rotate(180deg) scale(0.8)';
            setTimeout(() => {
                updateDonutIcon(isDark ? 'dark' : 'light');
                if (donutIcon) donutIcon.style.transform = 'rotate(360deg) scale(1)';
                if (donutIconMobile) donutIconMobile.style.transform = 'rotate(360deg) scale(1)';
                setTimeout(() => {
                    if (donutIcon) {
                        donutIcon.style.transition = 'none';
                        donutIcon.style.transform = 'rotate(0deg) scale(1)';
                        donutIcon.offsetHeight; 
                        donutIcon.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.26, 1.55)';
                    }
                    if (donutIconMobile) {
                        donutIconMobile.style.transition = 'none';
                        donutIconMobile.style.transform = 'rotate(0deg) scale(1)';
                        donutIconMobile.offsetHeight; 
                        donutIconMobile.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.26, 1.55)';
                    }
                }, 500);
            }, 250);

            if (isDark) {
                localStorage.theme = 'dark';
            } else {
                localStorage.theme = 'light';
            }
        });
    }

    function updateDonutIcon(theme) {
        let svgContent = '';
        if (theme === 'dark') {
            // Chocolate Donut SVG for Dark Mode
            svgContent = `<svg viewBox="0 0 100 100" class="w-8 h-8 drop-shadow-md">
    <!-- Base Cake (Apricot) -->
    <path d="M 50 8 A 42 42 0 1 1 49.9 8 Z M 50 34 A 16 16 0 1 0 49.9 34 Z" fill-rule="evenodd" fill="#F4A261" stroke="#FFF4D6" stroke-width="4"/>
    <!-- Frosting (Chocolate) -->
    <path d="M 50 8 A 42 42 0 0 1 91 55 Q 85 65 75 60 Q 65 75 50 70 Q 35 75 25 60 Q 15 65 9 55 A 42 42 0 0 1 50 8 Z M 50 34 A 16 16 0 1 0 49.9 34 Z" fill-rule="evenodd" fill="#4A2924" stroke="#FFF4D6" stroke-width="3"/>
    <!-- Sprinkles -->
    <rect x="35" y="20" width="8" height="4" rx="2" transform="rotate(30 39 22)" fill="#FFF4D6"/>
    <rect x="60" y="18" width="8" height="4" rx="2" transform="rotate(-45 64 20)" fill="#F4A261"/>
    <rect x="75" y="40" width="8" height="4" rx="2" transform="rotate(15 79 42)" fill="#FFF4D6"/>
    <rect x="20" y="40" width="8" height="4" rx="2" transform="rotate(-30 24 42)" fill="#F4A261"/>
    <rect x="50" y="55" width="8" height="4" rx="2" transform="rotate(10 54 57)" fill="#FFF4D6"/>
</svg>`;
        } else {
            // Vanilla Donut SVG for Light Mode
            svgContent = `<svg viewBox="0 0 100 100" class="w-8 h-8 drop-shadow-md">
    <!-- Base Cake (Apricot) -->
    <path d="M 50 8 A 42 42 0 1 1 49.9 8 Z M 50 34 A 16 16 0 1 0 49.9 34 Z" fill-rule="evenodd" fill="#F4A261" stroke="#4A2924" stroke-width="4"/>
    <!-- Frosting (Vanilla) -->
    <path d="M 50 8 A 42 42 0 0 1 91 55 Q 85 65 75 60 Q 65 75 50 70 Q 35 75 25 60 Q 15 65 9 55 A 42 42 0 0 1 50 8 Z M 50 34 A 16 16 0 1 0 49.9 34 Z" fill-rule="evenodd" fill="#FFF4D6" stroke="#4A2924" stroke-width="3"/>
    <!-- Sprinkles -->
    <rect x="35" y="20" width="8" height="4" rx="2" transform="rotate(30 39 22)" fill="#4A2924"/>
    <rect x="60" y="18" width="8" height="4" rx="2" transform="rotate(-45 64 20)" fill="#F4A261"/>
    <rect x="75" y="40" width="8" height="4" rx="2" transform="rotate(15 79 42)" fill="#4A2924"/>
    <rect x="20" y="40" width="8" height="4" rx="2" transform="rotate(-30 24 42)" fill="#F4A261"/>
    <rect x="50" y="55" width="8" height="4" rx="2" transform="rotate(10 54 57)" fill="#4A2924"/>
</svg>`;
        }
        
        if (donutIcon) donutIcon.innerHTML = svgContent;
        if (donutIconMobile) donutIconMobile.innerHTML = svgContent;
    }

    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Customizer Logic (Order & Customize Page)
    setupCustomizer();
    
    // Dashboard Logic (Dashboard Page)
    setupDashboard();
});

function setupCustomizer() {
    const customizerForm = document.getElementById('customizerForm');
    if (!customizerForm) return;

    const basePriceEl = document.getElementById('calcBasePrice');
    const flavorPriceEl = document.getElementById('calcFlavorPrice');
    const decorPriceEl = document.getElementById('calcDecorPrice');
    const petPriceEl = document.getElementById('calcPetPrice');
    const totalPriceEl = document.getElementById('calcTotalPrice');
    const cakePreviewImg = document.getElementById('cakePreviewImg');
    
    const petToggle = document.getElementById('petFriendlyToggle');
    const petOptions = document.getElementById('petOptions');
    const standardOptions = document.getElementById('standardOptions');

    function calculatePrice() {
        let total = 0;
        
        // Base Price (Size)
        const sizeSelected = document.querySelector('input[name="cakeSize"]:checked');
        const basePrice = sizeSelected ? parseFloat(sizeSelected.dataset.price) : 0;
        if(basePriceEl) basePriceEl.textContent = `$${basePrice.toFixed(2)}`;
        total += basePrice;

        // Flavor Price
        const flavorSelected = document.querySelector('input[name="cakeFlavor"]:checked');
        const flavorPrice = flavorSelected ? parseFloat(flavorSelected.dataset.price || 0) : 0;
        if(flavorPriceEl) flavorPriceEl.textContent = `+$${flavorPrice.toFixed(2)}`;
        total += flavorPrice;

        // Decoration Price
        const decorSelected = document.querySelector('input[name="cakeDecor"]:checked');
        const decorPrice = decorSelected ? parseFloat(decorSelected.dataset.price || 0) : 0;
        if(decorPriceEl) decorPriceEl.textContent = `+$${decorPrice.toFixed(2)}`;
        total += decorPrice;

        // Pet Option
        let petPrice = 0;
        if (petToggle && petToggle.checked) {
            petPrice = 10;
        }
        if(petPriceEl) petPriceEl.textContent = `+$${petPrice.toFixed(2)}`;
        total += petPrice;

        // Update Total with animation
        animateValue(totalPriceEl, parseFloat(totalPriceEl.textContent.replace('$', '')) || 0, total, 500);
        
        // Update Preview Image based on selection
        updatePreview(flavorSelected?.value, petToggle?.checked);
    }

    function updatePreview(flavor, isPet) {
        if (!cakePreviewImg) return;
        // Placeholder logic for changing preview image based on selections
        if (isPet) {
            cakePreviewImg.src = "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=600&h=600";
        } else if (flavor === 'chocolate') {
            cakePreviewImg.src = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600&h=600";
        } else {
            cakePreviewImg.src = "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80&w=600&h=600";
        }
    }

    customizerForm.addEventListener('change', calculatePrice);
    
    if (petToggle) {
        petToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                if(petOptions) petOptions.classList.remove('hidden');
                if(standardOptions) standardOptions.classList.add('hidden');
            } else {
                if(petOptions) petOptions.classList.add('hidden');
                if(standardOptions) standardOptions.classList.remove('hidden');
            }
            calculatePrice();
        });
    }

    // Initialize
    calculatePrice();
}

function animateValue(obj, start, end, duration) {
    if(!obj) return;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = `$${(progress * (end - start) + start).toFixed(2)}`;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function setupDashboard() {
    // Simple filter logic for dashboard table
    const petFilterToggle = document.getElementById('dashPetFilter');
    const orderRows = document.querySelectorAll('.order-row');

    if (petFilterToggle) {
        petFilterToggle.addEventListener('change', (e) => {
            const showOnlyPets = e.target.checked;
            orderRows.forEach(row => {
                const isPet = row.dataset.pet === 'true';
                if (showOnlyPets && !isPet) {
                    row.style.display = 'none';
                } else {
                    row.style.display = '';
                }
            });
        });
    }
}
