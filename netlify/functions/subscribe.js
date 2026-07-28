exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed." }) };
  }

  let email;
  try {
    ({ email } = JSON.parse(event.body || "{}"));
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid request body." }) };
  }

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return { statusCode: 400, body: JSON.stringify({ error: "A valid email address is required." }) };
  }

  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "Newsletter is not configured." }) };
  }

  try {
    const response = await fetch("https://api.buttondown.email/v1/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      return { statusCode: 200, body: JSON.stringify({ success: true }) };
    }

    const data = await response.json().catch(() => ({}));
    return {
      statusCode: response.status,
      body: JSON.stringify({ error: data.detail || "Something went wrong. Please try again." }),
    };
  } catch (err) {
    return { statusCode: 502, body: JSON.stringify({ error: "Could not reach the newsletter service." }) };
  }
};
