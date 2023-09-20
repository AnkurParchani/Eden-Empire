export default function ReviewStars({ star }) {
  const starElements = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= star) {
      starElements.push(<i key={i} className="fa-solid fa-star"></i>);
    } else {
      starElements.push(<i key={i} className="fa-regular fa-star"></i>);
    }
  }
  return <p className="text-xs text-yellow-400">{starElements}</p>;
}
