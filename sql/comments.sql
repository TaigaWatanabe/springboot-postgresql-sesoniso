CREATE table comments (
    id SERIAL NOT NULL primary key,
    comment varchar(20) NOT NULL,
    user_id SERIAL NOT NULL,
    content_id SERIAL NOT NULL,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);