document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");

  if (!toggle || !nav) return;

  // Mobile menu toggle
  toggle.addEventListener("click", function () {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", !expanded);
    nav.classList.toggle("main-nav--open");

    if (!expanded) {
      toggle.setAttribute("aria-label", "Menü schließen");
    } else {
      toggle.setAttribute("aria-label", "Menü öffnen");
    }
  });

  // Mobile dropdown toggles
  const parentLinks = nav.querySelectorAll(".main-nav__link--has-children");

  parentLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      // Only handle on mobile
      if (window.innerWidth >= 960) return;

      e.preventDefault();
      const dropdown = link.nextElementSibling;
      const expanded = link.getAttribute("aria-expanded") === "true";

      // Close other dropdowns
      parentLinks.forEach(function (other) {
        if (other !== link) {
          other.setAttribute("aria-expanded", "false");
          var otherDropdown = other.nextElementSibling;
          if (otherDropdown) otherDropdown.classList.remove("dropdown--open");
        }
      });

      link.setAttribute("aria-expanded", !expanded);
      if (dropdown) dropdown.classList.toggle("dropdown--open");
    });
  });

  // Close mobile nav on resize to desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 960) {
      nav.classList.remove("main-nav--open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Menü öffnen");

      parentLinks.forEach(function (link) {
        link.setAttribute("aria-expanded", "false");
        var dropdown = link.nextElementSibling;
        if (dropdown) dropdown.classList.remove("dropdown--open");
      });
    }
  });

  // Close menu on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("main-nav--open")) {
      nav.classList.remove("main-nav--open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Menü öffnen");
      toggle.focus();
    }
  });
});
