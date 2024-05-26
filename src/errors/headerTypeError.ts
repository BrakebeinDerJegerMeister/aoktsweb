// src/errors/headerTypeError.ts
import i18next from 'i18next';
import '@root/i18n';

const t = i18next.t.bind(i18next);

export class HeaderTypeError extends Error {
  constructor(message: string = t('errors:headerType')) {
    super(message);
    this.name = "headerTypeError";
  }
}
