export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 py-8 px-6 sm:px-8 lg:px-10 text-center">
      <p className="text-xs text-white/30 max-w-xl mx-auto leading-relaxed">
        SnapFit은 작가 정보 큐레이션 및 링크만을 제공하며, 원본 이미지의 저작권은
        작가에게 있습니다.
      </p>
      <p className="text-xs text-white/20 mt-2">
        © {new Date().getFullYear()} SnapFit
      </p>
    </footer>
  );
}
