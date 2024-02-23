with series as
(
	select 
		Ultimo_salario_mensual_BRUTO_moneda_local as series,
		(Ultimo_salario_mensual_BRUTO_moneda_local * 1.248) as series_inflacion
	from sueldos 
	where 
		Ultimo_salario_mensual_BRUTO_moneda_local > 10000 and
		Especializacion = 'Developer' and 
		Años_de_experiencia <= 2 and
		Años_de_experiencia >= 1 and
		Ubicacion = 'Ciudad Autónoma de Buenos Aires' and
		Edad <= 25 and 
		Edad >= 21 and
		(
			Lenguajes ILIKE '%javascript%' or
			Lenguajes ILIKE '%css%' or
			Lenguajes ILIKE '%html%' or
			Lenguajes ILIKE '%sql%'
		) 
	order by series desc
),

stats as
(
	select
		stddev(series) as stddev,
		avg(series) as avg,
		stddev(series_inflacion) as stddev_inflacion,
		avg(series_inflacion) as avg_inflacion
	from
		series
),

data_set as
(
 	select *
 	from series
 	cross join stats
)

select *
from 
(
	select
		series,
		exp((-.5*((@((series-avg)/stddev))^2)))/(SQRT(2*PI())) as "Normal",
		series_inflacion
	from data_set
) x