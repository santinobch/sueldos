import { MONTH_NUMBER } from './consts';
import {
  Actualizacion,
  Bono,
  Empleados,
  GuardiaRelacion,
  GuardiaTiene,
  MesActualizacion,
  Modalidad,
} from './enums';
import { Dataset } from './interfaces';

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

  const monthUpdateIndex = MONTH_NUMBER.findIndex(item => {
    if (item === monthUpdate) return true;
    return false;
  });

  const yearModifier = monthUpdateIndex > monthOfDataset ? -1 : 0;

  return new Date(
    `${monthUpdate} 1, ${yearOfDataset + yearModifier} 01:00:00`
  ).getTime();
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
