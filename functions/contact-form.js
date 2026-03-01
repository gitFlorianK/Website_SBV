exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body);

    // Honeypot check
    if (data.fax) {
      return { statusCode: 200, body: JSON.stringify({ success: true }) };
    }

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Name, E-Mail und Nachricht sind erforderlich." }),
      };
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Ungültige E-Mail-Adresse." }),
      };
    }

    // In production, this would send an email via a service like SendGrid, Mailgun, etc.
    // For now, log the contact form submission
    console.log("Contact form submission:", {
      name: data.name,
      email: data.email,
      subject: data.subject || "(kein Betreff)",
      message: data.message.substring(0, 500),
      timestamp: new Date().toISOString(),
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("Contact form error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Interner Serverfehler." }),
    };
  }
};
