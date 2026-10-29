const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Sends a JSON POST to the backend and always resolves to { success, message }.
export async function postJSON(path, body) {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    return {
      success: res.ok && data.success === true,
      message: data.message || `Request failed (status ${res.status}).`,
    };
  } catch {
    return { success: false, message: "Cannot reach the server. Is the backend running?" };
  }
}
