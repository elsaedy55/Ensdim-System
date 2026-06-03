"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command";

export interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  maxDisplay?: number;
  className?: string;
  disabled?: boolean;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  maxDisplay = 2,
  className,
  disabled,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const toggle = (optVal: string) => {
    if (value.includes(optVal)) {
      onChange(value.filter((v) => v !== optVal));
    } else {
      onChange([...value, optVal]);
    }
  };

  const removeOne = (optVal: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== optVal));
  };

  const selectedLabels = value
    .map((v) => options.find((o) => o.value === v)?.label ?? v)
    .filter(Boolean);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "min-h-9 h-auto w-full justify-between px-3 py-1.5 font-normal",
            !value.length && "text-[var(--text-muted)]",
            className
          )}
        >
          {value.length === 0 ? (
            <span>{placeholder}</span>
          ) : (
            <div className="flex flex-wrap gap-1 flex-1 min-w-0">
              {selectedLabels.slice(0, maxDisplay).map((label, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-0.5 rounded-md bg-[var(--accent-subtle)] text-[var(--accent)] px-1.5 py-0.5 text-xs font-medium"
                >
                  {label}
                  <button
                    type="button"
                    onClick={(e) => removeOne(value[i], e)}
                    className="hover:text-(--accent-hover) ms-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {selectedLabels.length > maxDisplay && (
                <span className="inline-flex items-center rounded-md bg-[var(--bg-muted)] text-[var(--text-muted)] px-1.5 py-0.5 text-xs">
                  +{selectedLabels.length - maxDisplay} more
                </span>
              )}
            </div>
          )}
          <ChevronsUpDown className="ms-2 h-4 w-4 shrink-0 text-(--text-muted)" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => toggle(option.value)}
                  className="flex items-center gap-2"
                >
                  <div className={cn(
                    "flex h-4 w-4 items-center justify-center rounded border",
                    value.includes(option.value)
                      ? "bg-[var(--accent)] border-[var(--accent)]"
                      : "border-[var(--border)]"
                  )}>
                    {value.includes(option.value) && <Check className="h-3 w-3 text-white" />}
                  </div>
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
