import { useTranslation } from 'react-i18next';
import React from 'react'; // Importez React, nécessaire pour TSX si vous utilisez des versions de React avant la 17.

interface FormattedDateProps {
  timestamp: number; // Définissez le type de props ici
}

export const FormattedDate: React.FC<FormattedDateProps> = ({ timestamp }) => {
  const { i18n } = useTranslation();

  // Création d'une date à partir du timestamp
  const date = new Date(timestamp);

  // Formatage de la date selon la locale active
  const formatter = new Intl.DateTimeFormat(i18n.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });

  return <span>{formatter.format(date)}</span>;
};


