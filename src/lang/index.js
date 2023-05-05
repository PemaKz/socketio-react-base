const allLangs = {
  en: require('./en.json'),
  es: require('./es.json')
}

export default function lang(text) {
  const lang = localStorage.getItem('lang') || 'en';
  console.log('lang', allLangs[lang]);
  return allLangs[lang][text] || text;
}