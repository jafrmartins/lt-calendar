const env = {};

/*
const style = getComputedStyle(document.body);
if(style.getPropertyValue('--theme')) {

  // SEO
  setEnv('VITE_SEO_TITLE', JSON.parse(style.getPropertyValue('--seo-title')));
  setEnv('VITE_SEO_DESCRIPTION', JSON.parse(style.getPropertyValue('--seo-description')));

  // LOGOS
  setEnv('VITE_NAVBAR_LOGO', atob(JSON.parse(style.getPropertyValue('--logo-navbar'))));
  setEnv('VITE_MOBILE_NAVBAR_LOGO', atob(JSON.parse(style.getPropertyValue('--logo-mobile-navbar'))));
  setEnv('VITE_SIDEBAR_LOGO', atob(JSON.parse(style.getPropertyValue('--logo-sidebar'))));
  setEnv('VITE_WELCOME_PAGE_LOGO', atob(JSON.parse(style.getPropertyValue('--logo-welcome-page'))));
  
  // COLORS
  setEnv('VITE_THEME_PRIMARY_COLOR', JSON.parse(style.getPropertyValue('--color-primary')));
  setEnv('VITE_THEME_SECONDARY_COLOR', JSON.parse(style.getPropertyValue('--color-secondary')));
  setEnv('VITE_THEME_ACCENT_COLOR', JSON.parse(style.getPropertyValue('--color-accent')));
  setEnv('VITE_THEME_ALT_ACCENT_COLOR', JSON.parse(style.getPropertyValue('--color-alt-accent')));
  setEnv('VITE_THEME_SUCCESS_COLOR', JSON.parse(style.getPropertyValue('--color-success')));
  setEnv('VITE_THEME_WARNING_COLOR', JSON.parse(style.getPropertyValue('--color-warning')));
  setEnv('VITE_THEME_DANGER_COLOR', JSON.parse(style.getPropertyValue('--color-danger')));
  setEnv('VITE_THEME_MAIN_BACKGROUND_COLOR', JSON.parse(style.getPropertyValue('--color-background')));
  setEnv('VITE_THEME_SECONDARY_BACKGROUND_COLOR', JSON.parse(style.getPropertyValue('--color-well')));
  
  // TYPOGRAPHY
  setEnv('VITE_THEME_BRANDING_FONT_FAMILY', JSON.parse(style.getPropertyValue('--font-branding')));
  setEnv('VITE_THEME_ALT_FONT_FAMILY', JSON.parse(style.getPropertyValue('--font-typography-alt')));
  setEnv('VITE_THEME_FONT_FAMILY', JSON.parse(style.getPropertyValue('--font-typography')));

  // TYPOGRAPHY TEXT
  setEnv('VITE_THEME_PRIMARY_TEXT_COLOR', JSON.parse(style.getPropertyValue('--color-primary-text')));
  setEnv('VITE_THEME_ALT_TEXT_COLOR', JSON.parse(style.getPropertyValue('--color-alt-text')));
  setEnv('VITE_THEME_SECONDARY_TEXT_COLOR', JSON.parse(style.getPropertyValue('--color-secondary-text')));
  setEnv('VITE_THEME_CHAT_TEXT_COLOR', JSON.parse(style.getPropertyValue('--color-chat-text')));

}
*/


export function getEnv(key) {

  if(env[key]) {
    return env[key]
  }
  
  if (key in import.meta.env) {
    if (typeof import.meta.env !== "undefined") {
      let ret = null;

      try {
        ret = JSON.parse(import.meta.env[key]);
        return ret;
      } catch {
          return import.meta.env[key];
      }
    }
  }

  return null;
  
}
  
export function setEnv(key, value) {

  if(value) { env[key] = value; import.meta.env[key] = value; }

}
