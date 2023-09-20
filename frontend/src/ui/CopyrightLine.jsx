export default function CopyrightLine() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="py-4 text-center text-xs font-medium tracking-wide text-[#555]">
      &copy; 2023{currentYear === 2023 ? null : `-${currentYear},`}{" "}
      EdenEmpire.com, Inc. or its affiliates
    </div>
  );
}
