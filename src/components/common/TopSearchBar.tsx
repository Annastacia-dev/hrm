import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Search } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface TopSearchBarProps {
  onSearch: (_query: string) => void;
  placeholder?: string;
}

export default function TopSearchBar({
  onSearch,
  placeholder = 'Search...',
}: TopSearchBarProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-sm">
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pr-20 lg:block hidden"
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="lg:hidden block">
            <Search />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </PopoverContent>
      </Popover>

      <div className="absolute inset-y-0 right-0 flex items-center">
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-full aspect-square"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
    </form>
  );
}
