const API_BASE = 'http://localhost:8082/api/auth';

async function request(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch (e) {
    json = null;
  }
  if (!res.ok) {
    const message = (json && (json.message || json.error)) || text || res.statusText || 'Request failed';
    const err = new Error(message);
    err.status = res.status;
    err.body = json || text;
    throw err;
  }
  return json || {};
}

export async function signup(data) {
  return request('/signup', data);
}

export async function signin(data) {
  return request('/signin', data);
}

export default { signup, signin };
