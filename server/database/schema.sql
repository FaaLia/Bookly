CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE books (
  book_id SERIAL PRIMARY KEY,
  api_book_id VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  publisher VARCHAR(255),
  published_date VARCHAR(20),
  cover_image TEXT,
  google_average_rating DECIMAL(3,2),
  google_ratings_count INT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE authors (
  author_id SERIAL PRIMARY KEY,
  author_name VARCHAR(255) NOT NULL,
  biography TEXT
);

CREATE TABLE categories (
  category_id SERIAL PRIMARY KEY,
  category_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE book_authors (
  book_id INT NOT NULL REFERENCES books(book_id) ON DELETE CASCADE,
  author_id INT NOT NULL REFERENCES authors(author_id) ON DELETE CASCADE,
  PRIMARY KEY (book_id, author_id)
);

CREATE TABLE book_categories (
  book_id INT NOT NULL REFERENCES books(book_id) ON DELETE CASCADE,
  category_id INT NOT NULL REFERENCES categories(category_id) ON DELETE CASCADE,
  PRIMARY KEY (book_id, category_id)
);

CREATE TABLE reviews (
  review_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  book_id INT NOT NULL REFERENCES books(book_id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, book_id)
);

CREATE TABLE favorites (
  user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  book_id INT NOT NULL REFERENCES books(book_id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, book_id)
);

CREATE TABLE reading_list (
  user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  book_id INT NOT NULL REFERENCES books(book_id) ON DELETE CASCADE,
  reading_status VARCHAR(20) NOT NULL DEFAULT 'want_to_read'
    CHECK (reading_status IN ('want_to_read', 'reading', 'finished')),
  added_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, book_id)
);