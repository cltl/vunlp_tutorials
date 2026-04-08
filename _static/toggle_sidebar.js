document.addEventListener('DOMContentLoaded', function () {
    // Inject "Home" link at the top of the left sidebar TOC
    const sidenav = document.querySelector('.bd-sidenav');
    if (sidenav) {
        const homeLi = document.createElement('li');
        homeLi.className = 'toctree-l1';
        const homeLink = document.createElement('a');
        homeLink.className = 'reference internal';
        homeLink.textContent = 'Home';
        // Build path to intro.html relative to current page
        const logoLink = document.querySelector('.navbar-brand.logo');
        homeLink.href = logoLink ? logoLink.getAttribute('href') : '#';
        // Mark active when on the intro/home page (no other toctree item is active)
        const hasActivePage = sidenav.querySelector('.toctree-l1.current');
        if (!hasActivePage) {
            homeLi.classList.add('current', 'active');
            homeLink.classList.add('current');
        }
        homeLi.appendChild(homeLink);
        sidenav.insertBefore(homeLi, sidenav.firstChild);
    }
    const secondarySidebar = document.querySelector('.bd-sidebar-secondary');

    if (secondarySidebar) {
        // Find or create the TOC header
        let tocHeader = secondarySidebar.querySelector('.sidebar-header-items__title');

        if (!tocHeader) {
            // If no header exists, create one at the top of sidebar
            tocHeader = document.createElement('div');
            tocHeader.className = 'toc-header-toggle';
            secondarySidebar.insertBefore(tocHeader, secondarySidebar.firstChild);
        }

        // Set initial content
        tocHeader.innerHTML = '<span class="toc-toggle-icon">▽</span> <span class="toc-title-text">Contents</span>';
        tocHeader.style.cursor = 'pointer';
        tocHeader.classList.add('toc-header-toggle');

        // Toggle functionality
        tocHeader.addEventListener('click', function () {
            secondarySidebar.classList.toggle('collapsed');

            // Update icon direction
            const icon = tocHeader.querySelector('.toc-toggle-icon');
            if (secondarySidebar.classList.contains('collapsed')) {
                icon.textContent = '▷';
                localStorage.setItem('secondary-sidebar-collapsed', 'true');
            } else {
                icon.textContent = '▽';
                localStorage.removeItem('secondary-sidebar-collapsed');
            }
        });

        // Restore state from localStorage (optional)
        if (localStorage.getItem('secondary-sidebar-collapsed') === 'true') {
            secondarySidebar.classList.add('collapsed');
            const icon = tocHeader.querySelector('.toc-toggle-icon');
            if (icon) icon.textContent = '▷';
        }
    }
});