import React, { useState } from 'react';
import { Star, X, Send } from 'lucide-react';
import '../styles/ReviewForm.css';

function ReviewForm({ station, onSubmit, onClose }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    if (reviewText.trim().length < 10) {
      alert('Please write at least 10 characters for your review');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newReview = {
        id: Date.now(),
        stationId: station.id,
        userId: 'currentUser',
        userName: 'Current User',
        userAvatar: 'CU',
        rating,
        reviewText: reviewText.trim(),
        timestamp: new Date().toISOString(),
        helpfulCount: 0,
        photos: [],
        keywords: extractKeywords(reviewText)
      };

      onSubmit(newReview);
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const extractKeywords = (text) => {
    const commonKeywords = [
      'fast charging', 'slow charging', 'reliable', 'unreliable', 'clean', 'dirty',
      'convenient', 'inconvenient', 'affordable', 'expensive', 'crowded', 'quiet',
      'well-maintained', 'broken', 'out of service', 'tesla', 'ccs', 'chademo',
      'type 1', 'type 2', 'staff', 'service', 'location', 'parking', 'safety'
    ];

    const lowerText = text.toLowerCase();
    return commonKeywords.filter(keyword => lowerText.includes(keyword));
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      const isFilled = starValue <= (hoverRating || rating);
      
      return (
        <Star
          key={i}
          size={32}
          fill={isFilled ? '#FFD700' : 'none'}
          color={isFilled ? '#FFD700' : '#D3D3D3'}
          className="star-icon"
          onMouseEnter={() => setHoverRating(starValue)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => setRating(starValue)}
          style={{ cursor: 'pointer' }}
        />
      );
    });
  };

  return (
    <div className="review-form-overlay">
      <div className="review-form-container">
        <div className="review-form-header">
          <h3>Write a Review</h3>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="station-info">
          <h4>{station.name}</h4>
        </div>

        <form onSubmit={handleSubmit} className="review-form">
          <div className="rating-section">
            <label>Your Rating</label>
            <div className="stars-container">
              {renderStars()}
            </div>
            <span className="rating-text">
              {rating === 0 ? 'Select a rating' : 
               rating === 1 ? 'Poor' :
               rating === 2 ? 'Fair' :
               rating === 3 ? 'Good' :
               rating === 4 ? 'Very Good' : 'Excellent'}
            </span>
          </div>

          <div className="review-text-section">
            <label htmlFor="review-text">Your Review</label>
            <textarea
              id="review-text"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience with this charging station..."
              rows={6}
              maxLength={500}
              required
            />
            <div className="character-count">
              {reviewText.length}/500 characters
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-button" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting || rating === 0 || reviewText.trim().length < 10}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Submit Review
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReviewForm;
