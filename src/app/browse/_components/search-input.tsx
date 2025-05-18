"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { getIssues } from "@/lib/firebase/firestore";
import { EditIssuePayload } from "@/lib/types/issues.types";
import Image from "next/image";

/*
 * SearchInput Component
 *
 * Implements a client-side search feature with the following functionality:
 * 1. Caching Strategy:
 *    - Uses localStorage to cache issue data with 1-hour expiration
 *    - Automatically refreshes cache in background when expired
 *    - Falls back to cached data when API requests fail
 *
 * 2. Search Features:
 *    - Debounced (300ms) search input to prevent excessive filtering
 *    - Multi-field search (title, publisher, category, volume, year, issue number)
 *    - Real-time results display with scrollable container
 *
 * 3. UI/UX Features:
 *    - Loading states with spinner animation
 *    - Clear search button
 *    - Responsive result cards with thumbnail placeholders
 *    - Date formatting for last modified dates
 *
 * 4. Transition Ready:
 *    - Mock data implementation for development
 *    - Commented-out API fetch example for easy production transition
 *    - Data processing pipeline for API response normalization
 *
 * Note: Currently uses mock data with simulated API delay (300ms).
 *       Replace mockData with actual API call when backend is ready.
 *       Code is congested for now, I am looking for ways to structure this better once backend is ready.
 *       I am also looking on SWR library for data caching to be stored on browser memory rather than localStorage.
 */

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allIssues, setAllIssues] = useState<
    (EditIssuePayload & { year: number })[]
  >([]);
  const [filteredIssues, setFilteredIssues] = useState<
    (EditIssuePayload & { year: number })[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cache duration in milliseconds (1 hour)
  const CACHE_DURATION = 60 * 60 * 1000;
  const CACHE_KEY = "issuesCache";
  const CACHE_TIMESTAMP_KEY = "issuesCacheTimestamp";

  // Function to fetch data from API - replace mockData with actual API call later
  const fetchIssues = useCallback(async () => {
    setIsLoading(true);

    try {
      // When ready to switch to API, uncomment this block:

      const data = await getIssues();
      const flattenedIssues = processApiData(data);

      // Cache the flattened data
      cacheData(flattenedIssues);
      setAllIssues(flattenedIssues);
    } catch (error) {
      console.error("Error loading issues:", error);
      // Fallback to cached data if available when fetch fails
      const cachedData = getCachedData();
      if (cachedData) {
        setAllIssues(cachedData);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Process API data when you switch to real API
  const processApiData = (data: EditIssuePayload[]) => {
    // Adapt this based on the actual API response structure
    return data.map((issue) => ({
      ...issue,
      year: new Date(issue.lastModified).getFullYear(), // Extract year from date if not provided
    })) as (EditIssuePayload & { year: number })[];
  };

  // Cache management functions
  const cacheData = (data: (EditIssuePayload & { year: number })[]) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    } catch (error) {
      console.error("Error caching data:", error);
    }
  };

  const getCachedData = () => {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

      if (cachedData && cachedTimestamp) {
        const isRecent =
          Date.now() - parseInt(cachedTimestamp) < CACHE_DURATION;
        if (isRecent) {
          return JSON.parse(cachedData) as (EditIssuePayload & {
            year: number;
          })[];
        }
      }
      return null;
    } catch (error) {
      console.error("Error retrieving cached data:", error);
      return null;
    }
  };

  // Load data on initial render
  useEffect(() => {
    const loadData = async () => {
      // Try to get data from cache first
      const cachedData = getCachedData();

      if (cachedData) {
        setAllIssues(cachedData);
        setIsLoading(false);
      } else {
        // If no valid cache, fetch fresh data
        await fetchIssues();
      }
    };

    loadData();

    // Set up periodic cache refresh if needed
    // This will refetch data in the background after cache expires
    const refreshInterval = setInterval(() => {
      const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
      if (
        cachedTimestamp &&
        Date.now() - parseInt(cachedTimestamp) >= CACHE_DURATION
      ) {
        fetchIssues();
      }
    }, CACHE_DURATION / 2); // Check halfway through cache duration

    return () => clearInterval(refreshInterval);
  }, [fetchIssues]);

  // Debounced search implementation
  useEffect(() => {
    const debouncedSearch = setTimeout(() => {
      if (searchQuery.trim() === "") {
        setFilteredIssues([]);
        setShowResults(false);
        return;
      }

      const lowercaseQuery = searchQuery.toLowerCase();
      const filtered = allIssues.filter(
        (issue) =>
          issue.title.toLowerCase().includes(lowercaseQuery) ||
          issue.publisher.toLowerCase().includes(lowercaseQuery) ||
          issue.category.toLowerCase().includes(lowercaseQuery) ||
          issue.volume.toString().includes(lowercaseQuery) ||
          issue.issueNumber.toString().includes(lowercaseQuery) ||
          issue.year.toString().includes(lowercaseQuery)
      );

      setFilteredIssues(filtered);
      setShowResults(true);
    }, 300);

    return () => clearTimeout(debouncedSearch);
  }, [searchQuery, allIssues]);

  const clearSearch = () => {
    setSearchQuery("");
    setShowResults(false);
    inputRef.current?.focus();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 relative">
      <div className="w-full mb-2">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            ref={inputRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search issues..."
            className="pl-10 pr-10 py-2 w-full"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
      </div>
      {showResults && (
        <div className="absolute top-full left-0 w-full border rounded-md overflow-hidden bg-white shadow-lg z-50">
          {isLoading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500 mx-auto"></div>
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {filteredIssues.length === 0 ? (
                <div className="p-4 text-gray-500 text-center">
                  No results found
                </div>
              ) : (
                filteredIssues.map((issue, index) => (
                  <div
                    key={`${issue.year}-${issue.volume}-${issue.issueNumber}-${index}`}
                    className="p-4 flex border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
                  >
                    {/* Thumbnail placeholder */}
                    <div className="max-w-16 max-h-16 bg-gray-200 rounded-md flex-shrink-0 mr-4 overflow-hidden">
                      <Image
                        src={issue.thumbnailLink || "/placeholder-image.png"}
                        alt="Thumbnail"
                        className="w-full h-full object-cover"
                        width={100}
                        height={100}
                      />
                    </div>
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-medium text-base text-gray-900">
                        {issue.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {formatDate(issue.lastModified)}
                      </p>
                      <p className="text-xs text-gray-600">
                        Published by{" "}
                        <span className="font-semibold">{issue.publisher}</span>
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
