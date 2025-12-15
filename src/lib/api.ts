const API_URL = import.meta.env.VITE_API_URL || 'https://api.teosegypt.com';

export async function callAPI(path: string, method = 'GET', body?: any) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return await res.json();
}

// Example: install module
export async function installModule(moduleId: string) {
  return callAPI('/modules/install', 'POST', { id: moduleId });
}
