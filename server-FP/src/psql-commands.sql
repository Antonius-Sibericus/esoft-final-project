-- Create database "bookshelf"

CREATE DATABASE bookshelf;

-- Create extension "uuid"

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create table "users"

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_surname VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_paternal VARCHAR(255),
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_role INTEGER,
    FOREIGN KEY (user_role) REFERENCES roles (role_id)
);

-- Create table "roles"

CREATE TABLE roles (
    role_id INTEGER PRIMARY KEY DEFAULT,
    role_tag VARCHAR(63) NOT NULL,
    role_title VARCHAR(63) NOT NULL
);

-- Create table "books"

CREATE TABLE books (
    book_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    book_heading VARCHAR(127) NOT NULL,
    book_author VARCHAR(255) NOT NULL,
    book_publisher uuid,
    book_category uuid,
    book_theme uuid,
    book_description VARCHAR(1023) NOT NULL,
    book_pages INTEGER NOT NULL,
    book_rating FLOAT NOT NULL,
    book_isinstock BOOLEAN,
    book_year INTEGER NOT NULL,
    book_isbn INTEGER NOT NULL,
    book_type BOOLEAN,
    FOREIGN KEY (book_publisher) REFERENCES users (user_id),
    FOREIGN KEY (book_category) REFERENCES categories (category_title),
    FOREIGN KEY (book_theme) REFERENCES themes (theme_title)
);

-- Create table "users-books"

-- Create table "authors-books"

-- Create table "categories"

-- Create table "themes"