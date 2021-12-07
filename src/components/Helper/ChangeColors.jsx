export default function changeColors(rating) {
  let colorRating = '';

  if (rating < 3) {
    colorRating = '#E90000';
  }
  if (rating >= 3 && rating < 5) {
    colorRating = '#E97E00';
  }
  if (rating >= 5 && rating < 7) {
    colorRating = '#E9D100';
  }
  if (rating >= 7) {
    colorRating = '#66E900';
  }
  return colorRating;
}
