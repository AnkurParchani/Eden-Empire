export default function ConfirmationModalTemplate({ children, marginLeft }) {
  const modalClass = `fixed inset-x-0 z-50 bottom-0 rounded-md bg-white sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-w-sm sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-lg sm:px-4 sm:py-6`;

  return <div className={modalClass}>{children}</div>;
}
