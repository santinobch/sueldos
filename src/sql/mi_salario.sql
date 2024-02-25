select 
	count(*) as Encuestados,
    avg (Ultimo_salario_mensual_BRUTO_moneda_local)::numeric(10,2)  as Bruto, 
    avg (Ultimo_salario_mensual_NETO_moneda_local)::numeric(10,2)  as Neto,
    avg (Ultimo_salario_mensual_BRUTO_moneda_local * 1.248)::numeric(10,2)  as Bruto_inflacion,
    avg (Ultimo_salario_mensual_NETO_moneda_local * 1.248)::numeric(10,2)  as Neto_inflacion,
    min(Ultimo_salario_mensual_BRUTO_moneda_local) as Bruto_minimo,
    max(Ultimo_salario_mensual_BRUTO_moneda_local) as Bruto_maximo,
    min(Ultimo_salario_mensual_NETO_moneda_local) as Neto_minimo,
    max(Ultimo_salario_mensual_NETO_moneda_local) as Neto_maximo,
    min(Ultimo_salario_mensual_BRUTO_moneda_local) * 1.248 as Bruto_minimo_inflacion,
    max(Ultimo_salario_mensual_BRUTO_moneda_local) * 1.248 as Bruto_maximo_inflacion,
    min(Ultimo_salario_mensual_NETO_moneda_local) * 1.248 as Neto_minimo_inflacion,
    max(Ultimo_salario_mensual_NETO_moneda_local) * 1.248 as Neto_maximo_inflacion
from sueldos 
where 
	Ultimo_salario_mensual_BRUTO_moneda_local > 10000 and
	Especializacion = 'Developer' and 
    Años_de_experiencia <= 2 and
    Años_de_experiencia >= 1 and
    Ubicacion = 'Ciudad Autónoma de Buenos Aires' and
    Edad <= 25 and 
    Edad >= 21 
	and
	(
		Lenguajes ILIKE '%javascript%' or
        Lenguajes ILIKE '%css%' or
        Lenguajes ILIKE '%html%' or
        Lenguajes ILIKE '%sql%'
	)