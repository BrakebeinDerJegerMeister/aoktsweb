// src/errors/headerVersionError.ts
import i18next from 'i18next';
import '@root/i18n';

const t = i18next.t.bind(i18next);

export class HeaderVersionError extends Error {
  constructor(message: string = t('errors:headerVersion')) {
    super(message);
    this.name = "headerVersionError";
  }
}
