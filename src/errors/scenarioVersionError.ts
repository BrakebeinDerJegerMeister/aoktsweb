// src/errors/scenarioVersionError.ts
import i18next from 'i18next';
import '@root/i18n';

const t = i18next.t.bind(i18next);

export class ScenarioVersionError extends Error {
  constructor(message: string = t('errors:scenarioVersionError')) {
    super(message);
    this.name = "scenarioVersionError";
  }
}