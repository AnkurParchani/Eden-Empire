import { FadeLoader } from "react-spinners";

function FullPageFadeSpinner() {
  return (
    <div className="blur-background fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
        <FadeLoader color="#ec4899" size={100} aria-label="Loading Spinner" />
      </div>
    </div>
  );
}

export default function Spinner({ type }) {
  let spinner;

  if (type === "fade")
    spinner = (
      <FadeLoader color="#ec4899" size={100} aria-label="Loading Spinner" />
    );

  if (type === "fullPageFade") spinner = <FullPageFadeSpinner />;

  return spinner;
}
