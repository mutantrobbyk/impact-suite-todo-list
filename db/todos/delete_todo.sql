DELETE FROM todos
WHERE id = $1
RETURNING *;