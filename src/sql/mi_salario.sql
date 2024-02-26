select 
	count(*) as Encuestados,
    avg (trabajo_salario_bruto)::numeric(10,2)  as Bruto, 
    avg (trabajo_salario_neto)::numeric(10,2)  as Neto,
    avg (trabajo_salario_bruto * 2.4927)::numeric(10,2)  as Bruto_inflacion,
    avg (trabajo_salario_neto * 2.4927)::numeric(10,2)  as Neto_inflacion,
    min(trabajo_salario_bruto) as Bruto_minimo,
    max(trabajo_salario_bruto) as Bruto_maximo,
    min(trabajo_salario_neto) as Neto_minimo,
    max(trabajo_salario_neto) as Neto_maximo,
    min(trabajo_salario_bruto) * 2.4927 as Bruto_minimo_inflacion,
    max(trabajo_salario_bruto) * 2.4927 as Bruto_maximo_inflacion,
    min(trabajo_salario_neto) * 2.4927 as Neto_minimo_inflacion,
    max(trabajo_salario_neto) * 2.4927 as Neto_maximo_inflacion
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