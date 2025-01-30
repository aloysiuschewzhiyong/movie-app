"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getLanguageName } from "@/utils/helpers";
import { useState } from "react";
import { SortSelect } from "./sort-select";
import { RangeSlider } from "@/components/ui/range-slider";

const LANGUAGES = [
  "en",
  "es",
  "fr",
  "de",
  "it",
  "ja",
  "ko",
  "zh",
  "hi",
  "pt",
  "ru",
  "tr",
];

const CONTENT_RATINGS = ["G", "PG", "PG-13", "R", "NC-17", "NR"];

interface AdvancedFiltersProps {
  onRatingChange: (range: [number, number]) => void;
  onLanguageChange: (language: string) => void;
  onContentRatingChange: (rating: string) => void;
  onSortChange: (sort: string) => void;
}

export function AdvancedFilters({
  onRatingChange,
  onLanguageChange,
  onContentRatingChange,
  onSortChange,
}: AdvancedFiltersProps) {
  const [ratingRange, setRatingRange] = useState<[number, number]>([0, 10]);

  const handleRatingChange = (values: number[]) => {
    if (values.length === 2) {
      const range: [number, number] = [values[0], values[1]];
      setRatingRange(range);
      onRatingChange(range);
    }
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sort By */}
        <div>
          <Label className="text-sm text-muted-foreground mb-3 block">
            Sort By
          </Label>
          <div className="focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 rounded-md">
            <SortSelect />
          </div>
        </div>

        {/* Rating Range */}
        <div>
          <Label className="text-sm text-muted-foreground mb-3 block">
            Rating Range: {ratingRange[0].toFixed(1)} -{" "}
            {ratingRange[1].toFixed(1)}
          </Label>
          <div className="px-3 py-4">
            <RangeSlider
              defaultValue={[0, 10]}
              value={ratingRange}
              min={0}
              max={10}
              step={0.1}
              minStepsBetweenThumbs={0.1}
              onValueChange={handleRatingChange}
              className="w-full"
            />
          </div>
        </div>

        {/* Language */}
        <div>
          <Label className="text-sm text-muted-foreground mb-3 block">
            Language
          </Label>
          <div className="focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 rounded-md">
            <Select onValueChange={onLanguageChange}>
              <SelectTrigger className="w-full bg-background">
                <SelectValue placeholder="All Languages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {getLanguageName(lang)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Content Rating */}
        <div>
          <Label className="text-sm text-muted-foreground mb-3 block">
            Content Rating
          </Label>
          <div className="focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 rounded-md">
            <Select onValueChange={onContentRatingChange}>
              <SelectTrigger className="w-full bg-background">
                <SelectValue placeholder="All Ratings" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                {CONTENT_RATINGS.map((rating) => (
                  <SelectItem key={rating} value={rating}>
                    {rating}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
