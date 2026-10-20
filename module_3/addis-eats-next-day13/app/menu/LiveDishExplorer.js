"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";
import AddToCartButton from "./AddToCartButton";

const PAGE_SIZE = 3;

export default function LiveDishExplorer({ initialPageData }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = Math.max(1, Number.parseInt(searchParams.get("page") || "1", 10) || 1);
  const [input, setInput] = useState("");
  const [term, setTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setTerm(input.trim()), 300);
    return () => clearTimeout(timer);
  }, [input]);

  const pageKey = `/api/dishes?page=${page}&pageSize=${PAGE_SIZE}`;
  const { data: pageResult, error: pageError, isLoading: pageLoading } = useSWR(pageKey, fetcher, {
    fallbackData: page === 1 ? initialPageData : undefined,
    keepPreviousData: true,
  });

  // A null key disables the search request for an empty debounced term.
  // Previous results remain visible while a new search is in flight.
  const searchKey = term ? `/api/dishes?q=${encodeURIComponent(term)}&page=1&pageSize=100` : null;
  const { data: searchResult, error: searchError, isLoading: searchLoading } = useSWR(searchKey, fetcher, {
    keepPreviousData: true,
  });

  const searching = term.length > 0;
  const result = searching ? searchResult : pageResult;
  const error = searching ? searchError : pageError;
  const dishes = result?.data ?? [];
  const pagination = pageResult?.pagination;
  const isUpdating = searching ? searchLoading : pageLoading;

  function goToPage(nextPage) {
    const params = new URLSearchParams(searchParams.toString());
    if (nextPage <= 1) params.delete("page"); else params.set("page", String(nextPage));
    router.push(params.size ? `${pathname}?${params.toString()}` : pathname, { scroll: false });
  }

  return (
    <section aria-label="Search and browse dishes">
      <label className="search-label" htmlFor="dish-search">Search dishes</label>
      <input id="dish-search" className="dish-search" type="search" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Try shiro or vegan" />
      <p className="muted" aria-live="polite">{searching ? `Search results for “${term}”` : `Page ${page}`} {isUpdating ? "· Updating…" : ""}</p>
      {error ? <p className="form-error" role="alert">Could not load dishes: {error.message}</p> : null}
      {!error && dishes.length === 0 && !isUpdating ? <p>No dishes match your search.</p> : null}
      <div className="dish-grid" aria-busy={isUpdating}>
        {dishes.map((dish) => (
          <article className="dish-card" key={dish.id}>
            <div><p className="eyebrow">{dish.category}</p><h2>{dish.name}</h2><p>{dish.description}</p>{dish.isSpicy && <span className="spicy-label">Spicy</span>}<p className="dish-price">{dish.price} ETB</p></div>
            <div className="dish-actions"><Link href={`/menu/${dish.id}`} className="secondary-link">View details</Link><AddToCartButton dish={dish} /></div>
          </article>
        ))}
      </div>
      {!searching && pagination && pagination.pages > 1 ? (
        <nav className="pagination" aria-label="Menu pages">
          <button type="button" className="secondary-link" onClick={() => goToPage(page - 1)} disabled={page <= 1}>Previous</button>
          <span>Page {pagination.page} of {pagination.pages}</span>
          <button type="button" className="secondary-link" onClick={() => goToPage(page + 1)} disabled={page >= pagination.pages}>Next</button>
        </nav>
      ) : null}
    </section>
  );
}
