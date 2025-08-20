import React, { useState, useMemo } from 'react';
import { Star, Search, Filter, ThumbsUp, MoreVertical, ChevronLeft } from 'lucide-react';
import reviews from '../data/reviews';
import ReviewForm from './ReviewForm';
import '../styles/StationReviews.css';

function StationReviews({ station, onClose }) {
  const [sortBy, setSortBy] = useState('recent');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [localReviews, setLocalReviews] = useState(reviews);

  // Get reviews for this specific station
  const stationReviews = useMemo(() => {
    // Match by station name or operator for demo purposes
    return localReviews.filter(review => {
      const stationName = station.operator || station.name || '';
      return stationName.toLowerCase().includes(review.stationId.toLowerCase()) ||
             review.stationId.toLowerCase().includes(stationName.toLowerCase());
    });
  }, [localReviews, station]);

  // Calculate rating statistics
  const ratingStats = useMemo(() => {
    const totalReviews = stationReviews.length;
    const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let totalRating = 0;

    stationReviews.forEach(review => {
      ratingCounts[review.rating]++;
      totalRating += review.rating;
    });

    const averageRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : 0;

    return {
      averageRating,
      totalReviews,
      ratingCounts,
      ratingPercentages: {
        1: totalReviews > 0 ? (ratingCounts[1] / totalReviews * 100).toFixed(0) : 0,
        2: totalReviews > 0 ? (ratingCounts[2] / totalReviews * 100).toFixed(0) : 0,
        3: totalReviews > 0 ? (ratingCounts[3] / totalReviews * 100).toFixed(0) : 0,
        4: totalReviews > 0 ? (ratingCounts[4] / totalReviews * 100).toFixed(0) : 0,
        5: totalReviews > 0 ? (ratingCounts[5] / totalReviews * 100).toFixed(0) : 0,
      }
    };
  }, [stationReviews]);

  // Get unique keywords for filtering
  const keywords = useMemo(() => {
    const allKeywords = stationReviews.flatMap(review => review.keywords);
    const keywordCounts = {};
    allKeywords.forEach(keyword => {
      keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
    });
    return Object.entries(keywordCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([keyword, count]) => ({ keyword, count }));
  }, [stationReviews]);

  const handleReviewSubmit = (newReview) => {
    setLocalReviews(prev => [newReview, ...prev]);
  };

  // Filter and sort reviews
  const filteredAndSortedReviews = useMemo(() => {
    let filtered = stationReviews;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(review =>
        review.reviewText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by keyword
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(review =>
        review.keywords.includes(selectedFilter)
      );
    }

    // Sort reviews
    switch (sortBy) {
      case 'recent':
        return filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'helpful':
        return filtered.sort((a, b) => b.helpfulCount - a.helpfulCount);
      default:
        return filtered;
    }
  }, [stationReviews, searchTerm, selectedFilter, sortBy]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < rating ? '#FFD700' : 'none'}
        color={i < rating ? '#FFD700' : '#D3D3D3'}
      />
    ));
  };

  return (
    <div className="reviews-container">
      {/* Header */}
      <div className="reviews-header">
        <button className="back-button" onClick={onClose}>
          <ChevronLeft size={20} />
        </button>
        <h2 className="station-name">{station.name}</h2>
        <button className="close-button" onClick={onClose}>×</button>
      </div>

      {/* Navigation Tabs */}
      <div className="reviews-tabs">
        <button className="tab-button active">Reviews</button>
        <button className="tab-button">Overview</button>
        <button className="tab-button">About</button>
      </div>

      {/* Rating Summary */}
      <div className="rating-summary">
        <div className="rating-left">
          <div className="average-rating">
            <span className="rating-number">{ratingStats.averageRating}</span>
            <div className="rating-stars">
              {renderStars(Math.round(parseFloat(ratingStats.averageRating)))}
            </div>
            <span className="total-reviews">{ratingStats.totalReviews} reviews</span>
          </div>
        </div>
        
        <div className="rating-distribution">
          {[5, 4, 3, 2, 1].map(rating => (
            <div key={rating} className="rating-bar-row">
              <span className="rating-label">{rating}</span>
              <div className="rating-bar-container">
                <div 
                  className="rating-bar" 
                  style={{ width: `${ratingStats.ratingPercentages[rating]}%` }}
                ></div>
              </div>
              <span className="rating-count">{ratingStats.ratingCounts[rating]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review Button */}
      <button 
        className="write-review-button"
        onClick={() => setShowReviewForm(true)}
      >
        <span>✏️</span>
        Write a review
      </button>

      {/* Search and Sort */}
      <div className="search-sort-container">
        <div className="search-container">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search reviews"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="sort-container">
          <Filter size={16} />
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="recent">Most recent</option>
            <option value="rating">Highest rated</option>
            <option value="helpful">Most helpful</option>
          </select>
        </div>
      </div>

      {/* Keyword Filters */}
      <div className="keyword-filters">
        <button 
          className={`keyword-filter ${selectedFilter === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedFilter('all')}
        >
          ✓ All
        </button>
        {keywords.map(({ keyword, count }) => (
          <button
            key={keyword}
            className={`keyword-filter ${selectedFilter === keyword ? 'active' : ''}`}
            onClick={() => setSelectedFilter(keyword)}
          >
            {keyword} {count}
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="reviews-list">
        {filteredAndSortedReviews.map(review => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <div className="reviewer-info">
                <div className="user-avatar">
                  {review.userAvatar}
                </div>
                <div className="reviewer-details">
                  <div className="reviewer-name">{review.userName}</div>
                  <div className="reviewer-stats">
                    {Math.floor(Math.random() * 20) + 1} reviews • {Math.floor(Math.random() * 10) + 1} photos
                  </div>
                </div>
              </div>
              <button className="review-menu">
                <MoreVertical size={16} />
              </button>
            </div>
            
            <div className="review-rating">
              {renderStars(review.rating)}
              <span className="review-date">{formatDate(review.timestamp)}</span>
            </div>
            
            <div className="review-text">
              {review.reviewText}
            </div>
            
            <div className="review-actions">
              <button className="helpful-button">
                <ThumbsUp size={14} />
                Helpful ({review.helpfulCount})
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedReviews.length === 0 && (
        <div className="no-reviews">
          <p>No reviews found matching your criteria.</p>
        </div>
      )}

      {showReviewForm && (
        <ReviewForm
          station={station}
          onSubmit={handleReviewSubmit}
          onClose={() => setShowReviewForm(false)}
        />
      )}
    </div>
  );
}

export default StationReviews;
