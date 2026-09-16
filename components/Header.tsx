export default function Header() {
  return (
    <header className="relative flex flex-col items-center gap-1 pt-16 sm:pt-20 pb-8 px-6 sm:px-8 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.svg" alt="SnapFit" className="h-6 sm:h-7 w-auto opacity-90" />
      <span className="font-script text-xl sm:text-2xl text-white/40 -mt-1">
        Capturing this moment
      </span>

      <h2 className="font-sans mt-8 sm:mt-10 text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.45] max-w-2xl text-balance">
        원하는 분위기로
        <br />
        찾는 스냅 작가
      </h2>
      <p className="text-sm sm:text-base text-white/40 mt-4">
        나에게 맞는 분위기를 파악해, 어울리는 작가를 찾아드려요.
      </p>
    </header>
  );
}
