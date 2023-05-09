const allLangs = {
  en: require('./en.json'),
  es: require('./es.json')
}

export default function lang(text) {
  const lang = localStorage.getItem('lang') || 'en';
  return allLangs[lang][text] || text;
}