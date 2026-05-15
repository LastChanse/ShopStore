export const loadState = <T>(key: string): T | undefined => {
  try {
    const serialized = localStorage.getItem(key);
    if (serialized === null) return undefined;
    return JSON.parse(serialized);
  } catch {
    return undefined;
  }
};

export const saveState = <T>(key: string, state: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (err) {
    console.error('Ошибка сохранения в localStorage', err);
  }
};

export const removeState = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error('Ошибка удаления из localStorage', err);
  }
};