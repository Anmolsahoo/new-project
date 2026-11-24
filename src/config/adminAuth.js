// ============================================================
// ADMIN AUTHENTICATION SERVICE
// Srinivas Nayak and Construction Pvt. Ltd. (SNC)
// ============================================================

const AUTH_KEY = 'snc_admin_auth_session';
const PASS_KEY = 'snc_admin_custom_credentials';

const DEFAULT_USERNAME = 'admin';
const DEFAULT_PASSWORD = 'snc@1234';

export function getAdminCredentials() {
  try {
    const custom = localStorage.getItem(PASS_KEY);
    if (custom) return JSON.parse(custom);
  } catch {}
  return { username: DEFAULT_USERNAME, password: DEFAULT_PASSWORD };
}

export function isAuthenticated() {
  try {
    const session = localStorage.getItem(AUTH_KEY);
    if (!session) return false;
    const data = JSON.parse(session);
    return Boolean(data && data.authenticated);
  } catch {
    return false;
  }
}

export function adminLogin(username, password) {
  const creds = getAdminCredentials();
  const trimmedUser = (username || '').trim().toLowerCase();
  const trimmedPass = (password || '').trim();

  if (trimmedUser === creds.username.toLowerCase() && trimmedPass === creds.password) {
    const sessionData = {
      authenticated: true,
      user: creds.username,
      loginTime: new Date().toISOString(),
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(sessionData));
    return { success: true };
  }
  return { success: false, message: 'Invalid Admin username or password.' };
}

export function adminLogout() {
  localStorage.removeItem(AUTH_KEY);
}

export function updateAdminPassword(oldPassword, newPassword) {
  const creds = getAdminCredentials();
  if (oldPassword !== creds.password) {
    return { success: false, message: 'Existing password does not match.' };
  }
  if (!newPassword || newPassword.length < 6) {
    return { success: false, message: 'New password must be at least 6 characters long.' };
  }
  const updated = { username: creds.username, password: newPassword };
  localStorage.setItem(PASS_KEY, JSON.stringify(updated));
  return { success: true, message: 'Admin password updated successfully.' };
}
