import { DishCardSkeleton } from "@/components/loaders/restaurant/LoadingDishCard";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import { DishCard } from "@/components/ui/restaurantdishcard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { RestaurantDetails, RestaurantReview } from "@/lib/types/restaurant";
import { cn } from "@/lib/utils";
import {
  Clock,
  FishFoodIcon,
  Location,
  Phone,
  Plus,
  Star,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { formatDate } from "date-fns";
import { useState } from "react";

const TestimonialCard = ({ review }: { review: RestaurantReview }) => {
  return (
    <div className="w-full flex flex-col gap-4 pb-4 border-b border-border mb-3">
      <div className="w-full flex justify-between items-start">
        <div className="flex gap-2 items-center">
          <div className="w-13 h-13 rounded-full flex items-center justify-center bg-secondary-foreground text-white font-bold text-2xl">
            {review.authorName.split(" ").map((n) => (
              <span>{n[0]}</span>
            ))}
          </div>
          <div className="flex flex-col gap-0.5">
            <span>{review.authorName}</span>
            <span className="text-muted-foreground">
              {formatDate(review.createdAt, "EEE, MMM yyyy")}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <HugeiconsIcon
              icon={Star}
              size={18}
              className={cn(
                "text-primary",
                i + 1 <= review.rating && "fill-primary",
              )}
              key={i}
            />
          ))}
        </div>
      </div>
      <p className="italic mt-3 text-muted-foreground">"{review.comment}"</p>
    </div>
  );
};

const ReviewsBlock = ({ restau }: { restau: RestaurantDetails }) => {
  const totalRatingCount = restau.ratingStats.distribution.reduce(
    (r, b) => r + b.count,
    0,
  );

  const ratings = restau.ratingStats.distribution.map((rat) => ({
    rate: rat.stars,
    percentage: (rat.count / totalRatingCount) * 100,
  }));
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
      <div className="col-span-3 flex flex-col gap-4">
        <div className="w-full gap-6 grid pb-4 border-b border-border grid-cols-3">
          <div className="flex items-center justify-center flex-col gap-2 p-6">
            <span className="text-6xl font-bold text-secondary-foreground">
              {restau.rating.toFixed(1)}
            </span>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <HugeiconsIcon
                  icon={Star}
                  size={18}
                  className={cn(
                    " text-primary",
                    i + 1 <= Number(restau.rating.toFixed(0)) && "fill-primary",
                  )}
                  key={i}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground w-[80%] text-center">
              Based on {restau.reviewCount} reviews
            </p>
          </div>
          <div className="border-l border-border pl-12 col-span-2 flex items-center justify-center flex-col gap-1.5">
            {ratings.map((rating, i) => (
              <div
                className="text-[12px] w-full flex items-center gap-2"
                key={i}
              >
                <span>{rating.rate}</span>
                <div className="flex-1 h-2 rounded-full overflow-hidden bg-bg-mute">
                  <div
                    style={{ width: `${rating.percentage}%` }}
                    className="h-full bg-primary"
                  />
                </div>
                <span className="text-muted-foreground">
                  {rating.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col mt-12 gap-6">
          {restau.reviewsPreview.map((review, i) => (
            <TestimonialCard review={review} key={i} />
          ))}
        </div>
      </div>
      <div className="flex gap-8 flex-col">
        <span className="font-bold text-primary text-xl">Restaurant Info</span>
        <div className="flex flex-col gap-6">
          <div className="flex gap-2 items-start">
            <HugeiconsIcon
              icon={Location}
              className="text-secondary-foreground"
              size={17}
            />
            <div className="flex flex-col text-xs gap-0.5">
              <span className="text-secondary-foreground font-bold">
                {restau.city}
              </span>
              <span className="text-muted-foreground">{restau.address}</span>
              <span className="text-primary">VIEW ON MAP</span>
            </div>
          </div>

          <div className="flex gap-2 items-start">
            <HugeiconsIcon
              icon={Clock}
              className="text-secondary-foreground"
              size={17}
            />
            <div className="flex flex-col text-xs gap-1 w-full">
              <span className="text-secondary-foreground font-bold">
                Opening Hours
              </span>
              {restau.weeklyHours.map((day, i) => (
                <div className="w-full flex justify-between items-center">
                  <span className="text-muted-foreground">{day.day}</span>
                  <span className="text-muted-foreground">
                    {day.openTime} - {day.closeTime}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 items-start">
            <HugeiconsIcon
              icon={Phone}
              className="text-secondary-foreground"
              size={17}
            />
            <div className="flex flex-col text-xs gap-0.5">
              <span className="text-secondary-foreground font-bold">
                Contact Details
              </span>
              <span className="text-muted-foreground">{restau.phone}</span>
              <span className="text-muted-foreground">{restau.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface Category {
  value: string;
  label: string;
}

export const DetailsContent = ({
  restaurant,
  loading,
}: {
  restaurant?: RestaurantDetails;
  loading: boolean;
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  if (loading || !restaurant) {
    return (
      <div className="grid grid-cols-1 container-x md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <DishCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const dishes = restaurant.menu.flatMap((menu) => menu.items);
  const Meals =
    categoryFilter !== "All"
      ? dishes.filter((dish) => dish.categoryId === categoryFilter)
      : dishes;
  const categories: Category[] = [
    { value: "All", label: "All" },
    ...restaurant.categories.map((cat) => ({
      value: cat.id,
      label: cat.name,
    })),
  ];

  const selectedCategory =
    categories.find((cat) => cat.value === categoryFilter) ?? categories[0];

  return (
    <Tabs defaultValue="menu" className="flex flex-col container-x gap-4">
      <div className="w-full border-b border-border pb-4">
        <TabsList className={""} variant={"line"}>
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="review">Review</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="menu">
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex md:items-center flex-col md:flex-row items-start gap-2 justify-between">
            <h2 className="text-3xl font-bold">Signature Starters</h2>
            <div className="flex flex-col gap-2 md:flex-row md:items-end">
              <span className="text-muted-foreground flex text-xs gap-1">
                <span className="font-bold text-primary">{Meals.length} </span>
                Dishes Available
              </span>
              <Combobox
                items={categories}
                value={selectedCategory}
                onValueChange={(val) => setCategoryFilter(val?.value ?? "")}
              >
                <ComboboxInput
                  className={"h-9"}
                  placeholder="Select a meal type"
                />
                <ComboboxContent>
                  <ComboboxEmpty>No items found.</ComboboxEmpty>
                  <ComboboxList>
                    {(framework) => (
                      <ComboboxItem key={framework.value} value={framework}>
                        {framework.label}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </div>
          </div>
          {Meals.length !== 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
              {Meals.map((dish, i) => (
                <DishCard Dish={dish} key={i} />
              ))}
            </div>
          ) : (
            <div className="mt-[20px]">
              <Empty className="">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <HugeiconsIcon icon={FishFoodIcon} size={40} />
                  </EmptyMedia>
                  <EmptyTitle>Dish isn't available</EmptyTitle>
                  <EmptyDescription>
                    There are no meal currently available in this category. Try
                    something else please.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            </div>
          )}
        </div>
      </TabsContent>
      <TabsContent value="review">
        <ReviewsBlock restau={restaurant} />
      </TabsContent>
      {/* <div className="w-full flex gap-6">
                <span>Menu</span>
                <span>Reviews</span>
            </div>
             */}
    </Tabs>
  );
};
