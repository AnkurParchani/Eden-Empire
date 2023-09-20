export default function Warning({ children }) {
  return (
    <div className="mb-5 rounded-sm bg-red-200 px-1 py-2 text-center text-xs font-medium leading-snug tracking-wide text-red-600">
      {children}
    </div>
  );
}
