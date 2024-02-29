import {
  Actualizacion,
  Bono,
  Dolares,
  Empleados,
  GuardiaRelacion,
  GuardiaTiene,
  Modalidad,
} from './enums';
import { Dataset } from './interfaces';

export const MONTH_NUMBER: string[] = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export const EXAMPLE_DATASET: Dataset = {
  pais: 'Argentina',
  provincia: 'Ciudad Autónoma de Buenos Aires',
  ocupacion: 'Full-Time',
  edad: 36,
  genero: 'Varón Cis',
  trabajo: {
    tipo_contrato: 'Contractor',
    especializacion: 'Consultant',
    tiempo: { experiencia: 10, antiguedad: 1, puesto_actual: 1, hibrido: 0 },
    personas_a_cargo: 3,
    plataformas:
      'Amazon Web Services, Docker, Google Cloud Platform, Linux, Microcontroladores, VMWare, Windows Server',
    tecnologias: 'HTML, Javascript, PHP, Python, SQL',
    herramientas: 'Bootstrap, Flask',
    database: 'MariaDB, Microsoft SQL Server, MySQL, SQLite',
    testing: 'Ninguna de las anteriores',
    modalidad: 'Híbrido (presencial y remoto)' as Modalidad,
    herramientas_IA: '2',
    salario: {
      bruto: 680000,
      neto: 520000,
      dolares: 'Cobro parte del salario en dólares' as Dolares,
      valor_dolar: NaN,
      conformidad: 2,
      beneficios_adicionales:
        'Abono de Internet, Clases de idiomas, Crédito en billeteras virtuales (Mercado Pago, Naranja X, Ualá), Horarios flexibles, Vacaciones flexibles (adicionales a las reglamentarias)',
    },
    bono: { bonoCantidad: 'No' as Bono },
    actualizacion: {
      cantidad: 'Uno' as Actualizacion,
      porcentaje: 26,
      mes_ultimo_ajuste: 242323423423423,
      comparacion_mes_anterior: '2',
    },
  },
  empresa: { empleados: 'De 51 a 100 personas' as Empleados, recomendado: 0 },
  estudios: {
    maximo: 'asdas',
    estado: 'asdasd',
    carrera: 'asdasd',
    institutcion: 'asdad',
  },
  guardia: {
    tiene: 'No' as GuardiaTiene,
    cobro: 123,
    relacion: 'Porcentaje de mi sueldo bruto' as GuardiaRelacion,
  },
};
