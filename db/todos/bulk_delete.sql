DELETE FROM todos
WHERE id = ANY(Array ${deletedTodos});