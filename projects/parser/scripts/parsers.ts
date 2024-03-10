import fs from 'fs';
import { format } from 'sql-formatter';

import { EXAMPLE_DATASET, MONTH_NUMBER } from './consts';
import {
  Actualizacion,
  Bono,
  Dolares,
  Empleados,
  GuardiaRelacion,
  GuardiaTiene,
  MesActualizacion,
  Modalidad,
} from './enums';
import { Dataset } from './interfaces';
import { keysExtractor, valuesExtractor } from './objects';

export function parseEmptyStrings(row: string[]): (string | null)[] {
  return row.map(field => {
    if (field === '') {
      return null;
    }

    return field;
  });
}

function parseIntNull(s: string | null): number | null {
  if (s === null) {
    return null;
  }

  const parsedInt = parseInt(s);

  if (isNaN(parsedInt)) {
    return null;
  }

  return parsedInt;
}

function parseMesActualizacion(
  monthUpdate: MesActualizacion,
  dateOfDataset: Date
) {
  if (monthUpdate === MesActualizacion.SIN_ACTUALIZACION) {
    return null;
  }

  const yearOfDataset = dateOfDataset.getFullYear();
  const monthOfDataset = dateOfDataset.getMonth();

  const monthUpdateIndex = MONTH_NUMBER.findIndex(item => {
    if (item === monthUpdate) return true;
    return false;
  });

  if (monthUpdateIndex === -1) {
    return null;
  }

  const yearModifier = monthUpdateIndex > monthOfDataset ? -1 : 0;

  const date = new Date();
  date.setFullYear(yearOfDataset + yearModifier, monthUpdateIndex, 1);
  date.setHours(1, 0, 0, 0);

  return new Date(date).getTime();
}

export function parseColumns(
  row: (string | null)[],
  dataset: Dataset[],
  dateOfDataset: Date
) {
  dataset.push({
    pais: row[0],
    provincia: row[1],
    ocupacion: row[2],
    edad: parseIntNull(row[41]),
    genero: row[42],
    trabajo: {
      tipo_contrato: row[3],
      especializacion: row[16],

      tiempo: {
        experiencia: parseIntNull(row[17]),
        antiguedad: parseIntNull(row[18]),
        puesto_actual: parseIntNull(row[19]),
        hibrido: parseIntNull(row[28]),
      },

      personas_a_cargo: parseIntNull(row[20]),
      plataformas: row[21],
      tecnologias: row[22],
      herramientas: row[23],
      database: row[24],
      testing: row[25],
      modalidad: row[27] as Modalidad,
      herramientas_IA: row[30],

      salario: {
        bruto: parseIntNull(row[4]),
        neto: parseIntNull(row[5]),
        dolares: row[6] as Dolares,
        valor_dolar: parseIntNull(row[7]),
        conformidad: parseIntNull(row[15]),
        beneficios_adicionales: row[14],
      },

      bono: {
        bonoCantidad: row[8] as Bono,
      },

      actualizacion: {
        cantidad: row[10] as Actualizacion,
        porcentaje: parseIntNull(row[11]),
        mes_ultimo_ajuste: parseMesActualizacion(
          row[12] as MesActualizacion,
          dateOfDataset
        ),
        comparacion_mes_anterior: row[13],
      },
    },

    empresa: {
      empleados: row[26] as Empleados,
      recomendado: parseIntNull(row[29]),
    },

    estudios: {
      maximo: row[32],
      estado: row[33],
      carrera: row[34],
      institutcion: row[35],
    },

    guardia: {
      tiene: row[37] as GuardiaTiene,
      cobro: parseIntNull(row[38]),
      relacion: row[39] as GuardiaRelacion, //Requiere parser especial
    },
  });
}

export function objectToSql(dataset: Dataset[]) {
  const keys = keysExtractor(dataset[0]);
  const values = valuesExtractor(EXAMPLE_DATASET);

  let query = `
      -- Table: public.salaries
  
      DROP TABLE IF EXISTS salaries;
  
      CREATE TABLE IF NOT EXISTS salaries ( id SERIAL PRIMARY KEY,`;

  values!.forEach((value, i) => {
    let type = 'numeric';

    if (typeof value === 'string') {
      type = 'text';
    }

    if (i === values!.length - 1) {
      query += `${keys![i]} ${type}`;
    } else {
      query += `${keys![i]} ${type},`;
    }
  });

  query += `); `;

  dataset.forEach((row, i) => {
    let values = '';
    const extractedValues = valuesExtractor(row);

    extractedValues!.forEach((value, ii) => {
      if (ii === extractedValues!.length - 1) {
        if (typeof value === 'string') {
          values += `'${value}'`;
        } else {
          values += `${value}`;
        }
      } else {
        if (typeof value === 'string') {
          values += `'${value}',`;
        } else {
          values += `${value},`;
        }
      }
    });

    query += `INSERT INTO salaries VALUES (${i}, ${values});`;
  });

  // Minified file
  fs.writeFile('dist/parser/queries/2023.07_query.min.sql', query, error => {
    if (error) console.log(error);
  });

  // Beautified file
  fs.writeFile(
    'dist/parser/queries/2023.07_query.sql',
    format(query, { language: 'postgresql' }),
    error => {
      if (error) console.log(error);
    }
  );

  return query;
}
