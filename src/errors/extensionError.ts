// src/errors/ExtensionError.ts
import i18next from 'i18next';
import '@root/i18n';

const t = i18next.t.bind(i18next);

export class ExtensionError extends Error {
  constructor(message: string = t('errors:extension')) {
    super(message);
    this.name = "ExtensionError";
  }
}
