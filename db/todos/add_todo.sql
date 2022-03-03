INSERT INTO todos(title, description, category_id)
VALUES (${title}, ${description}, ${category_id})
RETURNING *;