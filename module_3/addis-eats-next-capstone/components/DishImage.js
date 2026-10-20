import Image from "next/image";

const images = {
  "1": "photo-1547592180-85f173990554",
  "2": "photo-1512621776951-a57141f2eefd",
  "3": "photo-1604908176997-125f25cc6f3d",
  "4": "photo-1512621776951-a57141f2eefd",
  "5": "photo-1544025162-d76694265947",
  "6": "photo-1544025162-d76694265947",
};

export default function DishImage({ dish, priority = false }) {
  const photo = images[dish.id] || images["1"];
  return (
    <Image
      src={`https://images.unsplash.com/${photo}?auto=format&fit=crop&w=900&q=75`}
      alt={`${dish.name}, an Ethiopian ${dish.category.toLowerCase()} dish`}
      width={900}
      height={600}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      priority={priority}
      className="dish-image"
    />
  );
}
