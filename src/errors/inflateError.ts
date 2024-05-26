// src/errors/inflateError.ts
import i18next from 'i18next';
import '@root/i18n';

const t = i18next.t.bind(i18next);

export class InflateError extends Error {
  constructor(message: string = t('errors:inflateError')) {
    super(message);
    this.name = "inflateError";
  }
}