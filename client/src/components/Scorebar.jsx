export default function ScoreBar({ label, score, color = 'dark' }) {
  const colorMap = {
    dark:  'bg-[#111]',
    green: 'bg-emerald-500',
    amber: 'bg-amber-400',
  };
  const pct = (score / 10) * 100;

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-[#888] uppercase tracking-widest">{label}</span>
        <span className="text-sm font-medium text-[#111]">
          {score}
          <span className="text-[#ccc] font-normal text-xs">/10</span>
        </span>
      </div>
      <div className="h-1.5 bg-[#f0ede6] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${colorMap[color] || colorMap.dark}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}