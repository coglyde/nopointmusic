// Runs in <head> before paint. Default: OS preference. Saved choice wins.
export const THEME_INIT_SCRIPT = `(function(){try{var k='theme',t=localStorage.getItem(k);if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;
