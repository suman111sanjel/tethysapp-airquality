
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;


INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , pm1_i as value, 'pm1'  as type
FROM public.nepalgunj_20;

INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , pm10_i as value, 'pm10'  as type
FROM public.nepalgunj_20;

INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , pm2_5_i as value, 'pm2p5'  as type
FROM public.nepalgunj_20;

INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , tsp_i as value, 'tsp'  as type
FROM public.nepalgunj_20;



INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , pm1_i as value, 'pm1'  as type
FROM public.pollutant_12;

INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , pm10_i as value, 'pm10'  as type
FROM public.pollutant_12;

INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , pm2_5_i as value, 'pm2p5'  as type
FROM public.pollutant_12;

INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , tsp_i as value, 'tsp'  as type
FROM public.pollutant_12;


-- 15

INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , pm1_i as value, 'pm1'  as type
FROM public.pollutant_15;

INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , pm10_i as value, 'pm10'  as type
FROM public.pollutant_15;

INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , pm2_5_i as value, 'pm2p5'  as type
FROM public.pollutant_15;

INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , tsp_i as value, 'tsp'  as type
FROM public.pollutant_15;


-- 20

INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , pm1_i as value, 'pm1'  as type
FROM public.pollutant_20;

INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , pm10_i as value, 'pm10'  as type
FROM public.pollutant_20;

INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , pm2_5_i as value, 'pm2p5'  as type
FROM public.pollutant_20;

INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , tsp_i as value, 'tsp'  as type
FROM public.pollutant_20;


-- 22

INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , pm1_i as value, 'pm1'  as type
FROM public.pollutant_22;

INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , pm10_i as value, 'pm10'  as type
FROM public.pollutant_22;

INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , pm2_5_i as value, 'pm2p5'  as type
FROM public.pollutant_22;

INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , tsp_i as value, 'tsp'  as type
FROM public.pollutant_22;


-- 59

INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , pm1_i as value, 'pm1'  as type
FROM public.pollutant_59;

INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , pm10_i as value, 'pm10'  as type
FROM public.pollutant_59;

INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , pm2_5_i as value, 'pm2p5'  as type
FROM public.pollutant_59;

INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , tsp_i as value, 'tsp'  as type
FROM public.pollutant_59;

-- 70

INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , pm1_i as value, 'pm1'  as type
FROM public.pollutant_70;

INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , pm10_i as value, 'pm10'  as type
FROM public.pollutant_70;

INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , pm2_5_i as value, 'pm2p5'  as type
FROM public.pollutant_70;

INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , tsp_i as value, 'tsp'  as type
FROM public.pollutant_70;


-- 59


INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , pm1_i as value, 'pm1'  as type
FROM public.surkhet_59;

INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , pm10_i as value, 'pm10'  as type
FROM public.surkhet_59;

INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , pm2_5_i as value, 'pm2p5'  as type
FROM public.surkhet_59;

INSERT INTO public.observation_stations_nepal_data_list(
	st_id, date_time, value, type)
SELECT id as st_id, rundate as date_time , tsp_i as value, 'tsp'  as type
FROM public.surkhet_59;