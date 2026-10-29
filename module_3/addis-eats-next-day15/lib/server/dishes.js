import dishes from "../../app/menu/dishes";

export function listDishes() {
  return dishes.map((dish) => ({ ...dish }));
}

export function findDish(id) {
  return dishes.find((dish) => dish.id === String(id)) ?? null;
}
