import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { searchMedia } from '../api/tmdbApi';
import MediaGrid from '../components/Shared/MediaGrid';
import LoadingScreen from '../components/Shared/LoadingScreen';
import { Search, Film, Tv, X } from 'lucide-react';

const SearchPage = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Get search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    if (query) {
      setSearchTerm(query);
      // Add to search history if not already there
      setSearchHistory(prev => {
        if (!prev.includes(query)) {
          return [query, ...prev].slice(0, 5); // Keep only last 5 searches
        }
        return prev;
      });
    }
  }, [location.search]);
  
  // Load search history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Failed to parse search history:', error);
      }
    }
  }, []);
  
  // Save search history to localStorage
  useEffect(() => {
    if (searchHistory.length > 0) {
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
  }, [searchHistory]);
  
  // Search query
  const { data, isLoading, isError } = useQuery(
    ['search', searchTerm, currentPage],
    () => searchMedia(searchTerm, currentPage),
    {
      enabled: searchTerm.trim().length > 0,
      keepPreviousData: true,
    }
  );
  
  // Handle search submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Update URL with search query
      const params = new URLSearchParams();
      params.set('q', searchTerm.trim());
      window.history.pushState({}, '', `${location.pathname}?${params.toString()}`);
      
      // Add to search history
      setSearchHistory(prev => {
        if (!prev.includes(searchTerm)) {
          return [searchTerm, ...prev].slice(0, 5);
        }
        return prev;
      });
      
      // Reset to first page
      setCurrentPage(1);
    }
  };
  
  // Handle history item click
  const handleHistoryClick = (term: string) => {
    setSearchTerm(term);
    
    // Update URL with search query
    const params = new URLSearchParams();
    params.set('q', term);
    window.history.pushState({}, '', `${location.pathname}?${params.toString()}`);
    
    // Reset to first page
    setCurrentPage(1);
  };
  
  // Handle clear history
  const handleClearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };
  
  // Handle clear search
  const handleClearSearch = () => {
    setSearchTerm('');
    window.history.pushState({}, '', location.pathname);
  };
  
  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="container-custom py-10">
      <h1 className="text-3xl font-bold mb-6">Search</h1>
      
      {/* Search Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for movies, TV shows..."
            className="w-full bg-background-card border border-gray-700 rounded-lg py-3 px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="w-6 h-6 text-text-secondary" />
          </div>
          {searchTerm && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-secondary hover:text-error transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>
      
      {/* Search History */}
      {searchHistory.length > 0 && !searchTerm && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Recent Searches</h2>
            <button 
              onClick={handleClearHistory}
              className="text-sm text-text-secondary hover:text-error transition-colors"
            >
              Clear History
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((term, index) => (
              <button
                key={`${term}-${index}`}
                onClick={() => handleHistoryClick(term)}
                className="flex items-center bg-background-card hover:bg-background-hover px-3 py-1.5 rounded-full text-sm transition-colors"
              >
                <Search className="w-3 h-3 mr-1.5" />
                <span>{term}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Loading State */}
      {isLoading && <LoadingScreen />}
      
      {/* Error State */}
      {isError && (
        <div className="text-center py-10">
          <p className="text-error mb-4">An error occurred while searching. Please try again.</p>
          <button
            onClick={() => handleSubmit}
            className="btn-primary"
          >
            Retry
          </button>
        </div>
      )}
      
      {/* Results */}
      {data && data.results.length > 0 ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={searchTerm + currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-6">
              <p className="text-text-secondary">
                Found {data.total_results} results for "{searchTerm}"
              </p>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex mb-6 border-b border-gray-800">
              <button className="px-4 py-2 text-primary border-b-2 border-primary font-medium">
                All
              </button>
              <button className="px-4 py-2 text-text-secondary hover:text-text-primary">
                Movies
              </button>
              <button className="px-4 py-2 text-text-secondary hover:text-text-primary">
                TV Shows
              </button>
            </div>
            
            {/* Results Grid */}
            <MediaGrid items={data.results} />
            
            {/* Pagination */}
            {data.total_pages > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="inline-flex rounded-md shadow">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-l-md ${
                      currentPage === 1 
                        ? 'bg-background-card text-text-muted cursor-not-allowed' 
                        : 'bg-background-card text-text-primary hover:bg-background-hover'
                    }`}
                  >
                    Previous
                  </button>
                  
                  {/* Page Numbers */}
                  {Array.from({ length: Math.min(5, data.total_pages) }, (_, i) => {
                    // Show 2 pages before and after current page
                    let pageNum;
                    if (data.total_pages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= data.total_pages - 2) {
                      pageNum = data.total_pages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-4 py-2 ${
                          currentPage === pageNum 
                            ? 'bg-primary text-white' 
                            : 'bg-background-card text-text-primary hover:bg-background-hover'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === data.total_pages}
                    className={`px-4 py-2 rounded-r-md ${
                      currentPage === data.total_pages 
                        ? 'bg-background-card text-text-muted cursor-not-allowed' 
                        : 'bg-background-card text-text-primary hover:bg-background-hover'
                    }`}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        !isLoading && searchTerm && data && (
          <div className="text-center py-16">
            <Film className="w-16 h-16 mx-auto text-text-secondary mb-4" />
            <h2 className="text-xl font-semibold mb-2">No results found</h2>
            <p className="text-text-secondary mb-6">
              We couldn't find any matches for "{searchTerm}"
            </p>
            <p className="text-text-secondary text-sm">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )
      )}
      
      {/* Show trending if no search term */}
      {!searchTerm && !isLoading && (
        <div className="text-center py-16">
          <Search className="w-16 h-16 mx-auto text-text-secondary mb-4" />
          <h2 className="text-xl font-semibold mb-2">Find your next favorite</h2>
          <p className="text-text-secondary mb-6">
            Search for movies, TV shows, and more!
          </p>
          <div className="flex justify-center space-x-4">
            <div className="text-center">
              <Film className="w-12 h-12 mx-auto text-primary mb-2" />
              <p className="text-sm">Movies</p>
            </div>
            <div className="text-center">
              <Tv className="w-12 h-12 mx-auto text-primary mb-2" />
              <p className="text-sm">TV Shows</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
