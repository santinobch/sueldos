import { MES_NUMBER } from './consts';
import { Actualizacion, Bono, MesActualizacion } from './enums';
import { Dataset } from './interfaces';

const { zonedTimeToUtc } = require('date-fns-tz');

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
  return parseInt(s);
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

  const monthUpdateIndex = MES_NUMBER.findIndex(item => {
    if (item === monthUpdate) return true;
  });

  const yearModifier = monthUpdateIndex > monthOfDataset ? -1 : 0;

  return zonedTimeToUtc(
    `${monthUpdate} 1, ${yearOfDataset + yearModifier} 01:00:00`,
    'Etc/UTC'
  ).getTime();
}

function parseColumns(
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
      modalidad: row[27],
      herramientas_IA: row[30],

      salario: {
        bruto: parseIntNull(row[4]),
        neto: parseIntNull(row[5]),
        dolares: row[6],
        valor_dolar: parseIntNull(row[7]),
        conformidad: parseIntNull(row[15]),
        beneficios_adicionales: row[14],
      },

      bono: {
        cantidad: row[8] as Bono,
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
      empleados: row[26], //Requiere parser especial
      recomendado: parseIntNull(row[29]),
    },

    estudios: {
      maximo: row[32],
      estado: row[33],
      carrera: row[34],
      institutcion: row[35],
    },

    guardia: {
      tiene: row[37], // Requiere parser especial
      cobro: parseIntNull(row[38]),
      numero: row[39], //Requiere parser especial
    },
  });
}
