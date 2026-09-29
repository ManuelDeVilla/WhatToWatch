import { useState, useRef } from 'react';
import useCarouselLogic from './useCarouselLogic.jsx';
import SectionHeader from './SectionHeader.jsx';
import CarouselButtons from './CarouselButtons.jsx';
import styles from './css/ReviewSection.module.css';
import StarIcon from './assets/icons/star.svg?react';
import AvatarIcon from './assets/images/user.png'
import { getFeaturedReviews, getReviewScore } from './utils/tmdb.js';
import { Link } from 'react-router-dom';
import { BASE_POSTER_PATH } from './config/api.js';

export default function ReviewSection({adapter_data}) {

  // shortcuts
  const all_data = adapter_data?.all_data || {};
  const show_data = all_data?.data?.show_data || {};

  // data
  const reviews = all_data?.data?.reviews.results || [];
  const featured_reviews = getFeaturedReviews(reviews);
  const review_ratings = getReviewScore(reviews);
  const name = show_data?.name || show_data?.title || ''; 

  // Custom hook to check if the container's 
  const { trackElement, moveCarousel, isOverflowing } = useCarouselLogic();

  return (
    <div className='container'>
      <div className='sectionHeader'>
        <SectionHeader title={"Reviews"} />
        <button className={ styles.btnReview }>Add Review</button>
      </div>
      
      {
        reviews.length === 0 ?
        (
          <span className={ styles.addReview }>
            {`${name} has no reviews yet.`}
            <button className={ styles.btnReview }>Would you like to add one?</button>  
          </span>
        ) : (
          <>
            <div className={ styles.ratingsContainer}>
              <div className={ styles.overallRatings }>
                <span>User Ratings</span>
                <div className={ styles.ratingTexts }>
                  <StarIcon />
                  <span className={ styles.rating }>{adapter_data.vote_average}</span>
                </div>
                <span className={ styles.ratingNumber }>{adapter_data.vote_count}</span>
              </div>
              
              <div className={ styles.userReviewContainer }>
                <span className={ styles.userReviewHeader }>User Review Ratings</span>
                <div className={ styles.histogramContainer }>
                  {
                    review_ratings.ratings_per_rating.map((val) => {
                      const value_per_score = val.total || 0;
                      const total_review_ratings = review_ratings.total_ratings || 1;

                      const barHeight = (value_per_score / total_review_ratings) * 100;
                      return(
                        <div className={ styles.barContainer }>
                          <div className={ styles.bar } style={{height: `${Math.round(barHeight)}%`}}></div>
                          <span className={ styles.barLabel }>{val.rating}</span>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
            <div className={ styles.reviewsContainer }>
              <p className={ styles.reviewContainerHeader }>Featured Reviews</p>
              <div className={ styles.reviewCarousel }>

                {/* Checks if the carousel is overflowing, if so then inject the buttons */}
                <CarouselButtons isOverflowing={isOverflowing} moveCarousel={moveCarousel} />

                <div ref={trackElement} className={ styles.track }>
                  {
                    featured_reviews.map(review => {
                      const avatar_path = review?.author_details?.avatar_path
                      ? `${BASE_POSTER_PATH}${review.author_details.avatar_path}`
                      : AvatarIcon;

                      return (
                        <Link to='/' className={ styles.review }>
                          <div className={ styles.reviewHeader}>
                            <div className={ styles.user }>
                              <img src={ avatar_path } alt="Avatar icon" />
                              <span>{ review.author}</span>
                            </div>
                            {
                              review.author_details.rating && (
                                <div className={ styles.userRating}>
                                  <StarIcon />
                                  <span>5</span>
                                </div>
                              )
                            }
                          </div>
                          <p className={ styles.reviewBody}>{ review.content }</p>
                        </Link>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}
