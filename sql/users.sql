create table public.users (
  id serial not null
  , name character varying(20) not null
  , password character varying(255) not null
  , user_name character varying(20)
  , admin_user integer default 0 not null
  , account_status integer default 0 not null
  , primary key (id)
);