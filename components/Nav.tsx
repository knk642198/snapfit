export default function Nav({
  onLogoClick,
  absolute = true,
}: {
  onLogoClick?: () => void;
  absolute?: boolean;
}) {
  return (
    <nav
      className={`${
        absolute ? "absolute" : "relative"
      } top-0 inset-x-0 z-20 flex items-center justify-between px-6 sm:px-8 lg:px-10 py-5`}
    >
      <button
        type="button"
        onClick={onLogoClick}
        aria-label="SnapFit 홈으로"
        className="cursor-pointer"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="SnapFit" className="h-4 sm:h-[18px] w-auto" />
      </button>
    </nav>
  );
}
