CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "category_id" int NOT NULL,
  "user_id" int,
  "name" text NOT NULL,
  "description" text NOT NULL,
  "old_price" int,
  "price" int NOT NULL,
  "quantity" int DEFAULT 0,
  "status" int DEFAULT 1,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL
);

INSERT INTO categories(name) VALUES ('Comida');
INSERT INTO categories(name) VALUES ('Eletrônicos');
INSERT INTO categories(name) VALUES ('Automóveis');

CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text NOT NULL,
  "product_id" int
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "email" text UNIQUE NOT NULL,
  "password" text NOT NULL,
  "cpf_cnpj" text UNIQUE NOT NULL,
  "cep" text,
  "adress" text,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

-- FOREING KEY

ALTER TABLE "products" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "files" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

-- -- CREATE PROCEDURE

-- CREATE FUNCTION trigger_set_timestamp()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   NEW.updated_at = NOW();
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- -- AUTO UPDATE OF PRODUCTS

-- CREATE TRIGGER set_timestamp
-- BEFORE UPDATE ON products
-- FOR EACH ROW
-- EXECUTE PROCEDURE trigger_set_timestamp()

-- -- AUTO UPDATE OF USERS

-- CREATE TRIGGER set_timestamp
-- BEFORE UPDATE ON users
-- FOR EACH ROW
-- EXECUTE PROCEDURE trigger_set_timestamp()