export default function PulsingDot() {
  return (
    <div className="relative flex items-center justify-center w-3 h-3">
      <div className="absolute w-3 h-3 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
      <div className="relative w-2 h-2 bg-emerald-500 rounded-full"></div>
    </div>
  );
}