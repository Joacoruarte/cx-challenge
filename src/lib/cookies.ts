export const getCookie = (cookieName: string, customCookies?: string) => {
  if (!cookieName || (typeof window === 'undefined' && !customCookies)) {
    return '';
  }
  const nombre = cookieName + '=';
  const cookies = customCookies
    ? customCookies.split(';')
    : document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    if (cookie.indexOf(nombre) === 0) {
      return cookie.substring(nombre.length, cookie.length);
    }
  }

  return null; // Si la cookie no se encuentra
};

export const setCookie = (
  cookieName: string,
  cookieValue: string,
  expirationDays: number | null = null
) => {
  if (!cookieName || typeof window === 'undefined') {
    return '';
  }

  if (expirationDays === null) {
    // Obtén la fecha actual
    const currentDate = new Date();

    // Configura la fecha de expiración a un valor lejano en el futuro (por ejemplo, 1 año)
    const expirationDate = new Date(
      currentDate.getFullYear() + 1,
      currentDate.getMonth(),
      currentDate.getDate()
    );

    // Convierte la fecha de expiración a una cadena en el formato adecuado
    const expirationDateString = expirationDate.toUTCString();
    return (document.cookie = `${cookieName}=${cookieValue}; expires="${expirationDateString}"; path=/`);
  }

  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + expirationDays);
  const expirationDateString = expirationDate.toUTCString();
  document.cookie = `${cookieName}=${cookieValue}; expires="${expirationDateString}"; path=/`;
};