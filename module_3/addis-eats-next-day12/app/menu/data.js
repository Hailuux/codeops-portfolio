import dishes from "./dishes";

export async function getDishes() {
  // Replace this local data access with a database/API call when available.
  // The async interface keeps data fetching on the Server Component side.
  await new Promise((resolve) => setTimeout(resolve, 250));
  return dishes;
}

export async function getDishById(id) {
  const allDishes = await getDishes();
  return allDishes.find((dish) => dish.id === id) ?? null;
}
