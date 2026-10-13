
import { useSearchParams } from "react-router-dom";

const categories = [
  "All",
  "Main dish",
  "Side dish",
  "Beverages",
  "Vegan",
];

function CategoryBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";

  function selectCategory(category) {
    const nextParams = new URLSearchParams(searchParams);

    if (category === "All") {
      nextParams.delete("category");
    } else {
      nextParams.set("category", category);
    }

    setSearchParams(nextParams);
  }

  return (
    <div className="category-bar" aria-label="Filter menu by category">
      {categories.map((category) => (
        <button
          type="button"
          key={category}
          className={
            selectedCategory === category
              ? "category-button selected"
              : "category-button"
          }
          aria-pressed={selectedCategory === category}
          onClick={() => selectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;
