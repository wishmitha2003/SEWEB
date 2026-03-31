export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8082').replace(/\/+$/, '');

function buildUrl(path) {
  if (!path) {
    throw new Error('API path is required');
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
}

async function parseJsonResponse(response) {
  const text = await response.text();
  if (!text) {
    return null;
  }
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error(`Invalid JSON response from ${response.url}: ${err.message}`);
  }
}

async function request(method, path, data, customOptions = {}) {
  const url = buildUrl(path);
  const token = localStorage.getItem('ezy_token');
  const isFormData = data instanceof FormData;
  
  const { headers: customHeaders, ...restOptions } = customOptions;
  
  const options = {
    method,
    headers: {
      ...(!isFormData && { 'Content-Type': 'application/json' }),
      Accept: 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...customHeaders,
    },
    credentials: 'include', // only if backend supports cookies/sessions
    ...restOptions,
  };

  if (options.headers['Content-Type'] === undefined) {
    delete options.headers['Content-Type'];
  }

  if (data != null) {
    options.body = isFormData ? data : JSON.stringify(data);
  }

  const response = await fetch(url, options);
  const payload = await parseJsonResponse(response);

  if (!response.ok) {
    const message = payload?.message || payload?.error || response.statusText || 'Request failed';
    const err = new Error(message);
    err.status = response.status;
    err.payload = payload;
    throw err;
  }

  return payload;
}

export const api = {
  get: (path, customOptions) => request('GET', path, undefined, customOptions),
  post: (path, data, customOptions) => request('POST', path, data, customOptions),
  put: (path, data, customOptions) => request('PUT', path, data, customOptions),
  patch: (path, data, customOptions) => request('PATCH', path, data, customOptions),
  del: (path, customOptions) => request('DELETE', path, undefined, customOptions),
};
