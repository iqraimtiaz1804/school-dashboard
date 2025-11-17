export const load = (key, defaultValue) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

export const save = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
