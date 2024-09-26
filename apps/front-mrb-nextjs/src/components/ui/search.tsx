'use client';

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: Readonly<{ placeholder: string }>) {

  const searchParams = useSearchParams()
  const pathname = usePathname();
  const router = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`);


    const params = new URLSearchParams(searchParams);
    term ? params.set('q', term) : params.delete('q');
    router.replace(`${pathname}?${params.toString()}`)
  }, 300);

  return (
    <div className="relative flex  flex-0 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('q')?.toString()}
      />
    </div>
  );
}