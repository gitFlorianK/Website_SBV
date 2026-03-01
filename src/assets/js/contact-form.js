document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("contact-form");
  var status = document.getElementById("contact-status");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Honeypot check
    if (form.querySelector('[name="fax"]').value) return;

    // Validate
    var valid = true;
    var required = form.querySelectorAll("[required]");
    required.forEach(function (field) {
      var error = field.parentElement.querySelector(".form-error");
      if (!field.value.trim()) {
        field.style.borderColor = "#e74c3c";
        if (error) error.textContent = "Dieses Feld ist erforderlich.";
        valid = false;
      } else if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        field.style.borderColor = "#e74c3c";
        if (error) error.textContent = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
        valid = false;
      } else {
        field.style.borderColor = "";
        if (error) error.textContent = "";
      }
    });

    if (!valid) return;

    var data = new FormData(form);
    var body = {};
    data.forEach(function (value, key) {
      body[key] = value;
    });

    status.textContent = "Wird gesendet…";
    status.style.color = "";

    fetch(form.action, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(function (response) {
        if (response.ok) {
          status.textContent = "Vielen Dank! Ihre Nachricht wurde gesendet.";
          status.style.color = "var(--color-primary)";
          form.reset();
        } else {
          throw new Error("Fehler");
        }
      })
      .catch(function () {
        status.textContent =
          "Leider ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.";
        status.style.color = "#e74c3c";
      });
  });
});
