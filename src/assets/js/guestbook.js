document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("guestbook-form");
  var status = document.getElementById("guestbook-status");
  var entriesContainer = document.getElementById("guestbook-entries");

  // Load entries
  function loadEntries() {
    fetch("/.netlify/functions/guestbook")
      .then(function (r) {
        return r.json();
      })
      .then(function (entries) {
        if (!entries || entries.length === 0) {
          entriesContainer.innerHTML =
            "<p>Noch keine Einträge vorhanden. Seien Sie der Erste!</p>";
          return;
        }
        var html = entries
          .map(function (entry) {
            var date = new Date(entry.date).toLocaleDateString("de-DE", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });
            var city = entry.city ? " aus " + escapeHtml(entry.city) : "";
            return (
              '<div class="card" style="margin-bottom: var(--space-md);">' +
              '<div class="card__body">' +
              '<p class="card__meta">' +
              escapeHtml(entry.name) +
              city +
              " · " +
              date +
              "</p>" +
              "<p>" +
              escapeHtml(entry.message) +
              "</p>" +
              "</div></div>"
            );
          })
          .join("");
        entriesContainer.innerHTML = html;
      })
      .catch(function () {
        entriesContainer.innerHTML =
          "<p>Einträge konnten nicht geladen werden.</p>";
      });
  }

  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  loadEntries();

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Honeypot
    if (form.querySelector('[name="website"]').value) return;

    var name = form.querySelector('[name="name"]').value.trim();
    var message = form.querySelector('[name="message"]').value.trim();

    if (!name || !message) {
      status.textContent = "Bitte füllen Sie Name und Nachricht aus.";
      status.style.color = "#e74c3c";
      return;
    }

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
          status.textContent = "Vielen Dank für Ihren Eintrag!";
          status.style.color = "var(--color-primary)";
          form.reset();
          loadEntries();
        } else {
          throw new Error("Fehler");
        }
      })
      .catch(function () {
        status.textContent = "Fehler beim Senden. Bitte versuchen Sie es erneut.";
        status.style.color = "#e74c3c";
      });
  });
});
