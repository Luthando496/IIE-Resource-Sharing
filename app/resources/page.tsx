"use client";
import { useState } from 'react';
import { Search, Filter, Book, Download, Eye, Star, Calendar } from 'lucide-react';

// Mock data for resources
const mockResources = [
  {
    id: 1,
    title: 'Calculus 101 Study Notes',
    description: 'Comprehensive notes covering limits, derivatives, and integrals with practice problems.',
    category: 'Mathematics',
    type: 'Notes',
    uploadDate: '2023-10-15',
    downloads: 243,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 2,
    title: 'Python Programming Exercises',
    description: 'Collection of beginner to intermediate Python exercises with solutions.',
    category: 'Computer Science',
    type: 'Exercises',
    uploadDate: '2023-11-02',
    downloads: 187,
    rating: 4.5,
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 3,
    title: 'World History Timeline',
    description: 'Interactive timeline of major world events from ancient civilizations to modern times.',
    category: 'History',
    type: 'Infographic',
    uploadDate: '2023-09-28',
    downloads: 156,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/167682/pexels-photo-167682.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 4,
    title: 'Organic Chemistry Reactions',
    description: 'Detailed guide to common organic chemistry reactions with mechanisms.',
    category: 'Chemistry',
    type: 'Study Guide',
    uploadDate: '2023-10-22',
    downloads: 198,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 5,
    title: 'Literary Analysis Techniques',
    description: 'Guide to analyzing literature with examples from major works.',
    category: 'Literature',
    type: 'Guide',
    uploadDate: '2023-11-10',
    downloads: 132,
    rating: 4.3,
    image: 'https://images.pexels.com/photos/1370298/pexels-photo-1370298.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 6,
    title: 'Physics Formula Sheet',
    description: 'Comprehensive collection of physics formulas for mechanics, electricity, and magnetism.',
    category: 'Physics',
    type: 'Reference',
    uploadDate: '2023-10-05',
    downloads: 275,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/414860/pexels-photo-414860.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

const categories = ['All', 'Mathematics', 'Computer Science', 'History', 'Chemistry', 'Literature', 'Physics'];
const resourceTypes = ['All', 'Notes', 'Exercises', 'Study Guide', 'Infographic', 'Reference', 'Guide'];

// ... (previous imports and mock data)

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  // Filter resources based on search and filters
  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesType = selectedType === 'All' || resource.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  // Sort resources - FIXED: Use getTime() for date comparison
  const sortedResources = [...filteredResources].sort((a, b) => {
    if (sortBy === 'popular') return b.downloads - a.downloads;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'newest') return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
    return 0;
  });

  // ... (rest of the component remains the same)
  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold primary-text mb-4">Browse Resources</h1>
          <p className="text-lg secondary-text max-w-2xl mx-auto">
            Discover study materials, notes, and resources shared by students worldwide
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="w-full md:w-auto">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Filter Options */}
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-600" />
              <span className="font-medium">Category:</span>
            </div>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full ${selectedCategory === category ? 'bg-btn text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-600" />
              <span className="font-medium">Type:</span>
            </div>
            {resourceTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full ${selectedType === type ? 'bg-btn text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold primary-text">
              {sortedResources.length} Resources Found
            </h2>
            <a 
              href="/upload-resources" 
              className="bg-btn hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg duration-500 cursor-pointer flex items-center gap-2"
            >
              <Book size={18} />
              Upload Resource
            </a>
          </div>

          {sortedResources.length === 0 ? (
            <div className="text-center py-12">
              <Book size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium primary-text mb-2">No resources found</h3>
              <p className="secondary-text">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedResources.map(resource => (
                <div key={resource.id} className="card-bg rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={resource.image} 
                      alt={resource.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {resource.category}
                      </span>
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                        {resource.type}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold primary-text mb-2">{resource.title}</h3>
                    <p className="secondary-text text-sm mb-4">{resource.description}</p>
                    
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <Star size={16} className="text-amber-500 fill-current" />
                        <span className="ml-1 text-sm font-medium">{resource.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Download size={16} className="text-gray-500" />
                        <span className="ml-1 text-sm secondary-text">{resource.downloads}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar size={16} className="text-gray-500" />
                        <span className="ml-1 text-sm secondary-text">{resource.uploadDate}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button className="flex-1 bg-btn hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg text-sm duration-500 cursor-pointer flex items-center justify-center gap-1">
                        <Download size={16} />
                        Download
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 duration-500 cursor-pointer flex items-center justify-center gap-1">
                        <Eye size={16} />
                        Preview
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      
    </div>
  );
}