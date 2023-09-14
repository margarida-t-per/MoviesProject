import style from "./style.module.scss";

const MovieReviewSection = ({ reviews }) => {
  return (
    <div className={style.reviewSection}>
      <h3>Reviews</h3>
      <ul className={style.reviewList}>
        {reviews.map((review) => (
          <li key={review._id} className={style.reviewItem}>
            <p>
              <strong>Rating:</strong> {review.rating} stars
            </p>
            <p>
              <strong>Comment:</strong> {review.comment}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviewSection;
