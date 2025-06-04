import { useState, useEffect } from 'react';
import { FiSearch, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import DelegateCard from '../../components/aafSubComponents/AlumniCard';
import delegatesData from '../../data/AlumniProfileData';

const alphabet = ['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

const AlumniPage = () => {
  const [delegates, setDelegates] = useState([]);
  const [filteredDelegates, setFilteredDelegates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ role: '', category: '', alphabet: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const delegatesPerPage = 12;

  useEffect(() => {
    try {
      const sortedData = [...delegatesData].sort((a, b) => a.name.localeCompare(b.name));
      setDelegates(sortedData);
      setFilteredDelegates(sortedData);
    } catch (error) {
      console.error("Error loading delegate data:", error);
    }
  }, []);

  useEffect(() => {
    let results = delegates;

    if (searchTerm) {
      results = results.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.role) {
      results = results.filter(d => d.role.toLowerCase() === filters.role.toLowerCase());
    }

    if (filters.category) {
      results = results.filter(d => d.category.toLowerCase() === filters.category.toLowerCase());
    }

    if (filters.alphabet && filters.alphabet !== 'All') {
      results = results.filter(d => d.name.toUpperCase().startsWith(filters.alphabet));
    }

    setFilteredDelegates(results);
    setCurrentPage(1);
  }, [searchTerm, filters, delegates]);

  const totalDelegates = filteredDelegates.length;
  const totalPages = Math.ceil(totalDelegates / delegatesPerPage);
  const indexOfLastDelegate = currentPage * delegatesPerPage;
  const indexOfFirstDelegate = indexOfLastDelegate - delegatesPerPage;
  const currentDelegates = filteredDelegates.slice(indexOfFirstDelegate, indexOfLastDelegate);

  const delegatesToShow = [...currentDelegates];
  while (delegatesToShow.length < delegatesPerPage && delegatesToShow.length > 0) {
    delegatesToShow.push({ id: `empty-${delegatesToShow.length}`, isEmpty: true });
  }

  const uniqueRoles = [...new Set(delegates.map(d => d.role))];
  const uniqueCategories = [...new Set(delegates.map(d => d.category))];

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({ role: '', category: '', alphabet: '' });
  };

  const hasFilters = searchTerm || filters.role || filters.category || filters.alphabet;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#8B0000] to-[#1E3A8A] text-white py-16 px-4 text-center shadow-md relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]"></div>
        <div className="max-w-6xl mx-auto relative">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Our Distinguished Alumni</h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Explore our network of accomplished alumni who are making a difference worldwide
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <div className="flex items-center bg-white/20 backdrop-blur-md rounded-full px-6 py-3 shadow-lg">
              <FiSearch className="text-white text-xl mr-3" />
              <input
                type="text"
                placeholder="Search by name or role..."
                className="flex-1 bg-transparent outline-none text-white placeholder-white/70"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="ml-2 text-white/70 hover:text-white"
                >
                  <FiX />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Active Filters */}
        {hasFilters && (
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-600">Filters:</span>
            {searchTerm && (
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                Search: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm('')}
                  className="ml-1.5 text-gray-500 hover:text-gray-700"
                >
                  <FiX size={14} />
                </button>
              </span>
            )}
            {filters.role && (
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                Role: {filters.role}
                <button
                  onClick={() => setFilters({ ...filters, role: '' })}
                  className="ml-1.5 text-gray-500 hover:text-gray-700"
                >
                  <FiX size={14} />
                </button>
              </span>
            )}
            {filters.category && (
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                Category: {filters.category}
                <button
                  onClick={() => setFilters({ ...filters, category: '' })}
                  className="ml-1.5 text-gray-500 hover:text-gray-700"
                >
                  <FiX size={14} />
                </button>
              </span>
            )}
            {filters.alphabet && (
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                Letter: {filters.alphabet}
                <button
                  onClick={() => setFilters({ ...filters, alphabet: '' })}
                  className="ml-1.5 text-gray-500 hover:text-gray-700"
                >
                  <FiX size={14} />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-sm text-[#8B0000] hover:underline ml-2"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <select
            className="select select-bordered bg-white shadow-sm border-gray-300 focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/30 transition-all"
            value={filters.role}
            onChange={(e) => setFilters({ ...filters, role: e.target.value })}
          >
            <option value="">All Roles</option>
            {uniqueRoles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>

          <select
            className="select select-bordered bg-white shadow-sm border-gray-300 focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/30 transition-all"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="">All Categories</option>
            {uniqueCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* A-Z Filter */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
          <h3 className="text-sm font-medium text-gray-600 mb-3">Browse by last name:</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {alphabet.map(letter => (
              <button
                key={letter}
                className={`w-10 h-10 flex items-center justify-center rounded-full font-medium transition-all ${filters.alphabet === letter
                  ? 'bg-[#8B0000] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                onClick={() =>
                  setFilters({ ...filters, alphabet: filters.alphabet === letter ? '' : letter })
                }
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Result Count */}
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{indexOfFirstDelegate + 1}-{Math.min(indexOfLastDelegate, totalDelegates)}</span> of{' '}
            <span className="font-semibold">{totalDelegates}</span> alumni
          </p>
          {totalDelegates === 0 && (
            <div className="mt-8 text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-lg">No alumni found matching your criteria</p>
              <button
                onClick={clearFilters}
                className="mt-4 px-4 py-2 bg-[#8B0000] text-white rounded-md hover:bg-[#6D0000] transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Cards */}
        {totalDelegates > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 min-h-[800px]">
              {delegatesToShow.map(delegate =>
                delegate.isEmpty ? (
                  <div key={delegate.id} className="opacity-0" aria-hidden="true">
                    <DelegateCard delegate={{}} isEmpty />
                  </div>
                ) : (
                  <DelegateCard key={delegate.id} delegate={delegate} />
                )
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center mt-12 space-y-4">
                <div className="text-sm text-gray-500">
                  Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-md border bg-white text-gray-700 disabled:opacity-50 hover:bg-gray-100 transition-colors"
                  >
                    First
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-md border bg-white text-gray-700 disabled:opacity-50 hover:bg-gray-100 transition-colors"
                  >
                    <FiChevronLeft />
                  </button>
                  {getPageNumbers().map((page, idx) =>
                    page === '...' ? (
                      <span key={`ellipsis-${idx}`} className="px-3 py-1">...</span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-md flex items-center justify-center text-sm font-medium transition-colors ${currentPage === page
                          ? 'bg-[#8B0000] text-white shadow-md'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border'
                          }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-md border bg-white text-gray-700 disabled:opacity-50 hover:bg-gray-100 transition-colors"
                  >
                    <FiChevronRight />
                  </button>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-md border bg-white text-gray-700 disabled:opacity-50 hover:bg-gray-100 transition-colors"
                  >
                    Last
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default AlumniPage;      