select 
	count(*) as Encuestados,
    avg (trabajo_salario_bruto)::numeric(10,2)  as "Bruto promedio 07/2023", 
    avg (trabajo_salario_neto)::numeric(10,2)  as "Neto promedio 07/2023",
    avg (trabajo_salario_bruto * 2.4927)::numeric(10,2)  as "Bruto promedio 02/2024",
    avg (trabajo_salario_neto * 2.4927)::numeric(10,2)  as "Neto promedio 02/2024",
	PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY trabajo_salario_bruto)::numeric(10,2)  as "Bruto mediana 07/2023", 
    PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY trabajo_salario_neto)::numeric(10,2)  as "Neto mediana 07/2023",
    PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY trabajo_salario_bruto * 2.4927)::numeric(10,2)  as "Bruto mediana 02/2024",
    PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY trabajo_salario_neto * 2.4927)::numeric(10,2)  as "Neto mediana 02/2024"
from salaries 
where 
	trabajo_salario_bruto > 200000 and
	trabajo_especializacion = 'Developer' and 
    trabajo_tiempo_experiencia <= 3 and
    trabajo_tiempo_experiencia >= 2 and
    provincia = 'Ciudad Autónoma de Buenos Aires' and
    Edad <= 28 and 
    Edad >= 22 and
	(
		trabajo_tecnologias ILIKE '%javascript%' or
        trabajo_tecnologias ILIKE '%css%' or
        trabajo_tecnologias ILIKE '%html%' or
        trabajo_tecnologias ILIKE '%sql%'
	)