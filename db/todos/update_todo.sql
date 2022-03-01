UPDATE todos
SET title = (${title}), description = (${description}), category_id = (${category_id})
WHERE id = (${todo_id});
SELECT title, description from todos
WHERE id = (${todo_id});