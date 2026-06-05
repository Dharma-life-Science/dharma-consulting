/* ============================================================
   DHARMA CONSULTING — LAYOUT COMPONENTS
   Injects Nav + Footer + WhatsApp Float + Page Loader into every page
   ============================================================ */

(function () {
  'use strict';

  /* Resolve the correct root path based on where the page is */
  function getRootPath() {
    const path = window.location.pathname;
    // Count depth from /dharma-consulting/
    const parts = path.replace(/^\/dharma-consulting\//, '').split('/').filter(Boolean);
    // pages/ = 1 level, pages/apply/ = 2 levels, pages/services/ = 2 levels
    if (parts.length === 0) return '/dharma-consulting/';
    const depth = parts.length;
    let prefix = '';
    for (let i = 0; i < depth; i++) prefix += '../';
    return prefix;
  }

  const ROOT = '/dharma-consulting/';

  /* ── PAGE LOADER HTML (Task 1 + Task 4) ── */
  const LOADER_HTML = `
<div id="page-loader">
  <img src="${ROOT}logo.png" alt="Dharma Consulting" class="loader-logo" fetchpriority="high" />
</div>`;

  /* ── NAV HTML (Task 4 — Logo Image) ── */
  const NAV_HTML = `
<nav class="nav" id="main-nav" role="navigation" aria-label="Main navigation">
  <a href="${ROOT}index.html" class="nav-logo" aria-label="Dharma Consulting Home">
    <img src="${ROOT}logo.png" alt="Dharma Consulting" class="nav-logo-img" fetchpriority="high" />
  </a>
  <ul class="nav-links" role="list">
    <li><a href="${ROOT}index.html" class="nav-link" id="nav-home">Home</a></li>
    <li><a href="${ROOT}pages/services.html" class="nav-link" id="nav-services">Services</a></li>
    <li><a href="${ROOT}pages/industries.html" class="nav-link" id="nav-industries">Industries</a></li>
    <li><a href="${ROOT}pages/about.html" class="nav-link" id="nav-about">About</a></li>
    <li><a href="${ROOT}pages/careers.html" class="nav-link" id="nav-careers">Careers</a></li>
    <li><a href="${ROOT}pages/insights.html" class="nav-link" id="nav-insights">Insights</a></li>
  </ul>
  <a href="${ROOT}pages/contact.html" class="btn-primary sm nav-cta">Book Consultation</a>
  <button class="hamburger" id="hamburger-btn" aria-label="Open menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</nav>
<div class="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation">
  <button class="mobile-close" id="mobile-close" aria-label="Close menu">&#x2715;</button>
  <img src="${ROOT}logo.png" alt="Dharma Consulting" class="mobile-menu-logo" />
  <a href="${ROOT}index.html" class="mobile-link">Home</a>
  <a href="${ROOT}pages/services.html" class="mobile-link">Services</a>
  <a href="${ROOT}pages/industries.html" class="mobile-link">Industries</a>
  <a href="${ROOT}pages/about.html" class="mobile-link">About</a>
  <a href="${ROOT}pages/careers.html" class="mobile-link">Careers</a>
  <a href="${ROOT}pages/insights.html" class="mobile-link">Insights</a>
  <a href="${ROOT}pages/contact.html" class="btn-primary" style="margin-top:1rem;">Book Consultation</a>
</div>`;

  /* ── FOOTER HTML (Task 4 — Logo Image) ── */
  const FOOTER_HTML = `
<hr class="section-divider" />
<footer class="footer" role="contentinfo">
  <div class="footer-grid">
    <!-- Col 1: Brand -->
    <div class="footer-brand">
      <img src="${ROOT}logo.png" alt="Dharma Consulting" class="footer-logo-img" loading="lazy" />
      <div class="footer-tagline">Precision Regulatory &amp; Quality Consulting</div>
      <div class="footer-socials">
        <a href="https://www.linkedin.com/in/marmik-vaghani-310445411/" class="footer-social-link" target="_blank" rel="noopener" aria-label="LinkedIn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
        <a href="https://wa.me/918487067141" class="footer-social-link" target="_blank" rel="noopener" aria-label="WhatsApp">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.842L.057 23.625a.75.75 0 00.918.918l5.783-1.453A11.936 11.936 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.734 9.734 0 01-4.97-1.364l-.357-.212-3.696.929.942-3.582-.234-.371A9.75 9.75 0 0112 2.25c5.385 0 9.75 4.365 9.75 9.75S17.385 21.75 12 21.75z"/></svg>
        </a>
      </div>
    </div>

    <!-- Col 2: Services -->
    <div>
      <div class="footer-col-title">Services</div>
      <ul class="footer-links">
        <li><a href="${ROOT}pages/services/regulatory-affairs-consulting.html" class="footer-link">Regulatory Affairs Consulting</a></li>
        <li><a href="${ROOT}pages/services/quality-consulting.html" class="footer-link">Quality Consulting</a></li>
        <li><a href="${ROOT}pages/services/mes-ebr-implementation.html" class="footer-link">MES / eBR Implementation</a></li>
        <li><a href="${ROOT}pages/services/eu-mdr-compliance.html" class="footer-link">EU MDR Compliance</a></li>
        <li><a href="${ROOT}pages/services/iso-13485-consulting.html" class="footer-link">ISO 13485 Consulting</a></li>
        <li><a href="${ROOT}pages/services/qms-consulting.html" class="footer-link">QMS Consulting</a></li>
        <li><a href="${ROOT}pages/services.html" class="footer-link" style="color:var(--accent-primary);">→ View All Services</a></li>
      </ul>
    </div>

    <!-- Col 3: Company -->
    <div>
      <div class="footer-col-title">Company</div>
      <ul class="footer-links">
        <li><a href="${ROOT}pages/about.html" class="footer-link">About Us</a></li>
        <li><a href="${ROOT}pages/industries.html" class="footer-link">Industries</a></li>
        <li><a href="${ROOT}pages/case-studies.html" class="footer-link">Case Studies</a></li>
        <li><a href="${ROOT}pages/careers.html" class="footer-link">Careers <span class="openings-badge">2 Open</span></a></li>
        <li><a href="${ROOT}pages/insights.html" class="footer-link">Insights</a></li>
        <li><a href="${ROOT}pages/faq.html" class="footer-link">FAQ</a></li>
      </ul>
    </div>

    <!-- Col 4: Contact -->
    <div>
      <div class="footer-col-title">Get In Touch</div>
      <div class="footer-contact-item">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        <div><a href="mailto:dharmaconsulting8@gmail.com">dharmaconsulting8@gmail.com</a></div>
      </div>
      <div class="footer-contact-item">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.09 6.09l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
        <div><a href="tel:+918487067141">+91 8487067141</a></div>
      </div>
      <div class="footer-contact-item">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
        <div>Surat, Gujarat 395004, India</div>
      </div>
      <a href="${ROOT}pages/contact.html" class="btn-primary sm" style="margin-top:1rem;">Book Free Consultation →</a>
    </div>
  </div>

  <div class="footer-bottom">
    <p class="footer-copy">© 2025 Dharma Consulting. All Rights Reserved.</p>
    <nav class="footer-legal" aria-label="Legal links">
      <a href="${ROOT}pages/privacy-policy.html">Privacy Policy</a>
      <a href="${ROOT}pages/terms-and-conditions.html">Terms</a>
      <a href="${ROOT}pages/cookie-policy.html">Cookies</a>
    </nav>
  </div>
</footer>

<!-- WhatsApp Floating Button -->
<a href="https://wa.me/918487067141" class="whatsapp-float" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
  <span class="whatsapp-tooltip">Chat on WhatsApp</span>
  <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.842L.057 23.625a.75.75 0 00.918.918l5.783-1.453A11.936 11.936 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.734 9.734 0 01-4.97-1.364l-.357-.212-3.696.929.942-3.582-.234-.371A9.75 9.75 0 0112 2.25c5.385 0 9.75 4.365 9.75 9.75S17.385 21.75 12 21.75z"/></svg>
</a>`;

  document.addEventListener('DOMContentLoaded', function () {
    // Inject page loader as first element
    const loaderDiv = document.createElement('div');
    loaderDiv.innerHTML = LOADER_HTML;
    document.body.insertBefore(loaderDiv.firstElementChild, document.body.firstChild);

    // Inject nav
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) navPlaceholder.innerHTML = NAV_HTML;

    // Inject footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) footerPlaceholder.innerHTML = FOOTER_HTML;

    // Highlight active nav link based on path
    setTimeout(() => {
      const path = window.location.pathname;
      document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
        const href = link.getAttribute('href') || '';
        const linkPath = href.replace(/^\/dharma-consulting/, '').replace(/\/index\.html$/, '/').replace(/\.html$/, '');
        const currentPath = path.replace(/^\/dharma-consulting/, '').replace(/\/index\.html$/, '/').replace(/\.html$/, '');
        if (
          (linkPath === '/' && (currentPath === '/' || currentPath === '')) ||
          (linkPath !== '/' && linkPath !== '' && currentPath.startsWith(linkPath))
        ) {
          link.classList.add('active');
        }
      });
    }, 10);
  });

})();
