export default function OverlayClick({ onClick }) {
  return (
    <div
      className="fixed left-0 top-0 z-40 h-full w-full bg-black bg-opacity-50"
      onClick={onClick}
    />
  );
}
