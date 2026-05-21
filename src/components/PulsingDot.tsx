export default function PulsingDot() {
  return (
    <div className="relative flex items-center justify-center w-3 h-3">
      <div
        className="absolute w-3 h-3 rounded-full animate-ping opacity-75"
        style={{ backgroundColor: 'var(--meshtastic-green)' }}
      ></div>
      <div
        className="relative w-2 h-2 rounded-full"
        style={{ backgroundColor: 'var(--meshtastic-green)' }}
      ></div>
    </div>
  );
}
