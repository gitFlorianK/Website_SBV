// Simple in-memory guestbook store.
// In production, replace with a database (e.g., Netlify Blobs, FaunaDB, or a JSON file in a repo).
let entries = [
  {
    name: "SBV Team",
    city: "Sachsen",
    message: "Willkommen im Gästebuch des Sächsischen Bogenschützenverbands!",
    date: "2026-03-01T12:00:00.000Z",
  },
];

exports.handler = async function (event) {
  // GET – return entries
  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entries),
    };
  }

  // POST – add entry
  if (event.httpMethod === "POST") {
    try {
      const data = JSON.parse(event.body);

      // Honeypot
      if (data.website) {
        return {
          statusCode: 200,
          body: JSON.stringify({ success: true }),
        };
      }

      if (!data.name || !data.message) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Name und Nachricht sind erforderlich." }),
        };
      }

      // Sanitize and limit
      const entry = {
        name: String(data.name).substring(0, 100),
        city: data.city ? String(data.city).substring(0, 100) : "",
        message: String(data.message).substring(0, 1000),
        date: new Date().toISOString(),
      };

      entries.unshift(entry);

      // Keep max 200 entries
      if (entries.length > 200) {
        entries = entries.slice(0, 200);
      }

      console.log("New guestbook entry:", entry);

      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ success: true }),
      };
    } catch (err) {
      console.error("Guestbook error:", err);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Interner Serverfehler." }),
      };
    }
  }

  return { statusCode: 405, body: "Method Not Allowed" };
};
