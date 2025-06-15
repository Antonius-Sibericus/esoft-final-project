-- Create database "bookshelf"

CREATE DATABASE bookshelf;

-- Create extension "uuid"

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create table "roles"

CREATE TABLE roles (
    role_id INTEGER PRIMARY KEY,
    role_tag VARCHAR(63) NOT NULL,
    role_title VARCHAR(63) NOT NULL
);

-- Create table "users"

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_surname VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_paternal VARCHAR(255),
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_role INTEGER,
    FOREIGN KEY (user_role) REFERENCES roles (role_id)
);

-- Create table "categories"

CREATE TABLE categories (
    cat_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    cat_title VARCHAR(127) NOT NULL,
    cat_tag VARCHAR(127) NOT NULL UNIQUE
);

-- Create table "themes"

CREATE TABLE themes (
    theme_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    theme_title VARCHAR(127) NOT NULL,
    theme_tag VARCHAR(127) NOT NULL UNIQUE,
    theme_cat VARCHAR(127),
    FOREIGN KEY (theme_cat) REFERENCES categories (cat_tag)
);

-- Create table "books"

CREATE TABLE books (
    book_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    book_heading VARCHAR(127) NOT NULL,
    book_tag VARCHAR(127) NOT NULL UNIQUE,
    book_author VARCHAR(255) NOT NULL,
    book_publisher uuid,
    book_category VARCHAR(127),
    book_theme VARCHAR(127),
    book_description VARCHAR(1023) NOT NULL,
    book_pages INTEGER NOT NULL,
    book_rating FLOAT NOT NULL,
    book_isinstock BOOLEAN,
    book_year INTEGER NOT NULL,
    book_isbn INTEGER NOT NULL,
    book_type BOOLEAN,
    FOREIGN KEY (book_publisher) REFERENCES users (user_id),
    FOREIGN KEY (book_category) REFERENCES categories (cat_tag),
    FOREIGN KEY (book_theme) REFERENCES themes (theme_tag)
);

-- Create table "users-books"

CREATE TABLE favorites (
    ub_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    ub_user_email VARCHAR(255),
    ub_book_tag VARCHAR(127),
    FOREIGN KEY (ub_user_email) REFERENCES users (user_email),
    FOREIGN KEY (ub_book_tag) REFERENCES books (book_tag)
);

-- Create table "authors-books"

CREATE TABLE published (
    ab_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    ab_user_email VARCHAR(255),
    ab_book_tag VARCHAR(255),
    FOREIGN KEY (ab_user_email) REFERENCES users (user_email),
    FOREIGN KEY (ab_book_tag) REFERENCES books (book_tag)
);