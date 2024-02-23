import { Actualizacion, Bono } from './enums';

export interface Dataset {
  pais: string | null;
  provincia: string | null;
  ocupacion: string | null;
  edad: number | null;
  genero: string | null;

  trabajo: {
    tipo_contrato: string | null;
    especializacion: string | null;

    tiempo: {
      experiencia: number | null;
      antiguedad: number | null;
      puesto_actual: number | null;
      hibrido: number | null;
    };

    personas_a_cargo: number | null;
    plataformas: string | null;
    tecnologias: string | null;
    herramientas: string | null;
    database: string | null;
    testing: string | null;
    modalidad: string | null;
    herramientas_IA: string | null;

    salario: {
      bruto: number | null;
      neto: number | null;
      dolares: string | null;
      valor_dolar: number | null;
      conformidad: number | null;
      beneficios_adicionales: string | null;
    };

    bono: {
      cantidad: Bono | null;
      // Ignorando este campo, demasiado complejo,
      // parsear requeriria alguna IA de texto o filtro manual de todos los datos
      // atado: string;
    };

    actualizacion: {
      cantidad: Actualizacion | null;
      porcentaje: number | null;
      mes_ultimo_ajuste: number | null; // Timestamp
      comparacion_mes_anterior: string | null;
    };
  };

  empresa: {
    empleados: string | null;
    recomendado: number | null;
  };

  estudios: {
    maximo: string | null;
    estado: string | null;
    carrera: string | null;
    institutcion: string | null;
  };

  guardia: {
    tiene: string | null;
    cobro: number | null;
    numero: string | null;
  };
}
