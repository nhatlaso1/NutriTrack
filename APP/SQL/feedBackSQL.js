export function getFoodFeedBacks() {
  const text = `
  SELECT * FROM food_feedback fb
   INNER JOIN feedback f ON f.feedback_id = fb.feedback_id
   INNER JOIN food ON fb.food_id = food.food_id;
  `;
  const values = [];
  const query = {
    text: text,
    values: values,
  };
  return query;
}
export function getMenuFeedBacks() {
  const text = `
  SELECT * FROM menu_feedback mb
    INNER JOIN feedback f ON f.feedback_id = mb.feedback_id
    INNER JOIN menu m ON m.menu_id = mb.menu_id;
  `;
  const values = [];
  const query = {
    text: text,
    values: values,
  };
  return query;
}
export function getFoodFeedBackByFoodId(foodId) {
  const text = `
  SELECT * FROM food_feedback fb
   INNER JOIN feedback f ON f.feedback_id = fb.feedback_id
   INNER JOIN food ON fb.food_id = food.food_id
   WHERE food.food_id =$1`;
  const values = [foodId];
  const query = {
    text: text,
    values: values,
  };
  return query;
}
export function getMenuFeedBackByMenuId(menuId) {
  const text = `
  SELECT * FROM menu_feedback mb
    INNER JOIN feedback f ON f.feedback_id = mb.feedback_id
    INNER JOIN menu m ON m.menu_id = mb.menu_id
    WHERE menu.menu_id = $1`;
  const values = [menuId];
  const query = {
    text: text,
    values: values,
  };
  return query;
}
