create table public.report (
  id serial not null
  , content character varying(200) not null
  , created_date timestamp(6) without time zone default CURRENT_TIMESTAMP not null
  , updated_date timestamp(6) without time zone default CURRENT_TIMESTAMP not null
  , user_id serial not null
  , primary key (id)
);