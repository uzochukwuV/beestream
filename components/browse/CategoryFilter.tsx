"use client"
import { Button } from "@/components/ui/button"

const categories = ["All", "Afrobeats", "Hip Hop", "R&B", "Pop", "Electronic", "Rock", "Jazz", "Gospel", "Reggae"]

interface CategoryFilterProps {
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
}

export default function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="mb-8 overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 pb-2">
        {categories.map((category) => {
          const isSelected = category === "All" ? !selectedCategory : selectedCategory === category
          return (
            <Button
              key={category}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => onSelectCategory(category === "All" ? null : category)}
              className={`whitespace-nowrap ${
                isSelected ? "bg-primary text-primary-foreground" : "bg-card border-border/50 hover:border-primary/50"
              }`}
            >
              {category}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
