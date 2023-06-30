import type localeType from '~/assets/locales/en-US.json'

export class LiteralService {
  locale: typeof localeType | Record<string, never> = {}

  async init() {
    this.locale = (await (() => {
      switch (window.navigator.language) {
        case 'ko-KR':
        case 'ko-kr':
        case 'ko':
          return import('~/assets/locales/ko-KR.json')
        default:
          return import('~/assets/locales/en-US.json')
      }
    })()).default
  }

  text(key: keyof typeof localeType) {
    return this.locale[key]
  }
}

export default new LiteralService()
