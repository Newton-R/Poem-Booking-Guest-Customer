import { MealDetailsBlock } from "@/components/restaurants/dish/MealDetailsBlock";
import { restaurants } from "@/lib/data";

export default async function name({
  params,
}: {
  params: Promise<{ id: string; dish: string }>;
}) {
  const { id, dish } = await params;

  // if (!others) {
  //   return <></>;
  // }

  return <MealDetailsBlock dishId={dish} restaurantId={id} />;
}
