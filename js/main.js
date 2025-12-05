document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const desktopNav = document.querySelector('.desktop-nav');
    const header = document.querySelector('.site-header');

    if (mobileMenuBtn && desktopNav) {
        mobileMenuBtn.addEventListener('click', () => {
            // Toggle active class on both button and nav
            mobileMenuBtn.classList.toggle('active');
            desktopNav.classList.toggle('active');

            // Prevent body scroll when menu is open
            document.body.style.overflow = desktopNav.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-list a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                desktopNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!desktopNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                if (desktopNav.classList.contains('active')) {
                    mobileMenuBtn.classList.remove('active');
                    desktopNav.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    }

    // ========================================
    // COMING SOON OVERLAY FOR SEARCH & CART
    // ========================================
    const searchIcon = document.querySelector('.search-icon');
    const cartIcon = document.querySelector('.cart-icon');

    function showComingSoonOverlay() {
        // Create overlay if it doesn't exist
        let overlay = document.querySelector('.coming-soon-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'coming-soon-overlay';
            overlay.innerHTML = `
                <div class="coming-soon-content">
                    <h2>Coming Soon</h2>
                    <p>This feature is currently under development</p>
                    <button class="close-overlay-btn">Close</button>
                </div>
            `;
            document.body.appendChild(overlay);

            // Close overlay when clicking the close button or outside
            overlay.addEventListener('click', (e) => {
                if (e.target.classList.contains('coming-soon-overlay') ||
                    e.target.classList.contains('close-overlay-btn')) {
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

        // Show overlay
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Add click listeners to search and cart icons
    if (searchIcon) {
        searchIcon.addEventListener('click', (e) => {
            e.preventDefault();
            showComingSoonOverlay();
        });
    }

    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            showComingSoonOverlay();
        });
    }

    // ========================================
    // HEADER SCROLL EFFECT
    // ========================================
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
                header.style.padding = '10px 0';
            } else {
                header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                header.style.padding = '0'; // Reset to default height defined in CSS
            }
        });
    }

    // ========================================
    // COLLECTIONS PAGE FILTER FUNCTIONALITY
    // ========================================
    const filterButtons = document.querySelectorAll('.pill-btn');
    const collectionCards = document.querySelectorAll('.collection-display-card');

    if (filterButtons.length > 0 && collectionCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterValue = button.getAttribute('data-filter');

                // Update active button state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter collection cards
                collectionCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (filterValue === 'all' || cardCategory === filterValue) {
                        // Show card with fade-in animation
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        // Hide card with fade-out animation
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Initialize card styles for smooth transitions
        collectionCards.forEach(card => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }
});
