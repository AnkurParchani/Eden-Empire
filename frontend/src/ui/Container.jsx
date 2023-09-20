export default function Container({ children }) {
  return (
    <div className="mx-auto max-w-6xl px-2 py-4 sm:px-5 md:px-7 lg:px-8">
      {children}
    </div>
  );
}
