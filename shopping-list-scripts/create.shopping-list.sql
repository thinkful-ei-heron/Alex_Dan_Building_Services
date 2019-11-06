CREATE TYPE grocery AS ENUM (
	'Main',
	'Snack',
	'Lunch',
	'Breakfast'
);

CREATE TABLE IF NOT EXISTS shopping_list_test (
	id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
	name TEXT NOT NULL,
	price DECIMAL(12,2) NOT NULL,
	date_added TIMESTAMP DEFAULT now() NOT NULL,
	checked BOOLEAN DEFAULT false,
	category grocery NOT NULL
);