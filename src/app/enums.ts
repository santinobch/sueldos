//ror[6]
export enum Dolares {
  PESOS = '',
  DOLARIZADO = 'Mi sueldo está dolarizado (pero cobro en moneda local)',
  PARTE_DOLAR = 'Cobro parte del salario en dólares',
  FULL_DOLAR = 'Cobro todo el salario en dólares',
}

// row[8]
export enum Bono {
  CERO = 'No',
  MENOS_DE_UNO = 'Menos de un sueldo',
  UNO = 'Un sueldo',
  UNO_A_TRES = 'De uno a tres sueldos',
  MAS_DE_TRES = '3+ sueldos',
}

export enum Actualizacion {
  CERO = 'No',
  UNO = 'Uno',
  DOS = 'Dos',
  TRES = 'Tres',
  MAS_DE_TRES = 'Más de tres',
}

export enum MesActualizacion {
  SIN_ACTUALIZACION = 'No tuve',
  ENERO = 'Enero',
  FEBRERO = 'Febrero',
  MARZO = 'Marzo',
  ABRIL = 'Abril',
  MAYO = 'Mayo',
  JUNIO = 'Junio',
  JULIO = 'Julio',
  AGOSTO = 'Agosto',
  SEPTIEMBRE = 'Septiembre',
  OCTUBRE = 'Octubre',
  NOVIEMBRE = 'Noviembre',
  DICIEMBRE = 'Diciembre',
}

export enum Modalidad {
  REMOTO = '100% remoto',
  PRESCENCIAL = '100% presencial',
  HIBRIDO = 'Híbrido (presencial y remoto)',
}

export enum Empleados {
  _1 = '1 (solamente yo)',
  _2_A_10 = 'De 2 a 10 personas',
  _11_A_50 = 'De 11  a 50  personas',
  _51_A_100 = 'De 51 a 100 personas',
  _101_A_200 = 'De 101 a 200 personas',
  _201_A_500 = 'De 201 a 500 personas',
  _501_A_1000 = 'De 501 a 1000 personas',
  _1001_A_2000 = 'De 1001 a 2000 personas',
  _2001_A_5000 = 'De 2001a 5000 personas',
  _5001_A_10000 = 'De 5001 a 10000 personas',
  _MAS_DE_10000 = 'Más de 10000 personas',
}

export enum GuardiaTiene {
  NO = 'No',
  SI_PASIVA = 'Sí, pasiva',
  SI_ACTIVA = 'Sí, activa',
}

export enum GuardiaRelacion {
  PROCENTAJE_BRUTO = 'Porcentaje de mi sueldo bruto',
  NETO = 'Neto',
  BRUTO = 'Bruto',
}
