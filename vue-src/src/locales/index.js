import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const LKEY = 'localeLang'
const DEFAULT_LANG = 'en'
const locales = {
    en: require('./en.json'),
    zh: require('./zh.json')
}

const i18n = new VueI18n({
    locale: DEFAULT_LANG,
    messages: locales
})

export const setup = function(lang) {
    if(lang === undefined) {
        lang = window.localStorage.getItem(LKEY)
        if(locales[lang] === undefined){
            lang = DEFAULT_LANG
        }
    }
    window.localStorage.setItem(LKEY, lang)
    Object.keys(i18n.locale).forEach(lang=>{
        document.body.classList.remove(`lang-${lang}`)
    })
    document.body.classList.add(`lang-${lang}`)
    document.body.setAttribute('lang',lang)
    Vue.config.lang = lang
    i18n.locale = lang
}

setup()

export default i18n