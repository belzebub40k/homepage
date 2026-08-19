// *arr APIs report timeleft as "HH:MM:SS" or "D.HH:MM:SS.fffffff"
function parseTimeLeft(timeLeft) {
  const match = /^(?:(\d+)\.)?(\d+):(\d+):(\d+)/.exec(timeLeft);
  if (!match) {
    return null;
  }
  const [, d = 0, h, m, s] = match;
  return ((Number(d) * 24 + Number(h)) * 60 + Number(m)) * 60 + Number(s);
}

// humanize renders "1h32m" via the common.duration formatter, otherwise just drop the fractional seconds
export function formatTimeLeft(timeLeft, humanize, t) {
  if (typeof timeLeft !== "string") {
    return timeLeft;
  }
  const seconds = parseTimeLeft(timeLeft);
  return humanize && seconds !== null ? t("common.duration", { value: seconds }) : timeLeft.replace(/\.\d+$/, "");
}

export default function QueueEntry({ title, activity, timeLeft, progress, size }) {
  const time = formatTimeLeft(timeLeft);

  return (
    <div className="text-theme-700 dark:text-theme-200 relative h-5 rounded-md bg-theme-200/50 dark:bg-theme-900/20 m-1 px-1 flex">
      <div
        className="absolute h-5 rounded-md bg-theme-200 dark:bg-theme-900/40 z-0 -ml-1"
        style={{
          width: `${progress}%`,
        }}
      />
      <div className="text-xs z-10 self-center ml-2 relative h-4 grow mr-2">
        <div className="absolute w-full whitespace-nowrap text-ellipsis overflow-hidden text-left">{title}</div>
      </div>
      <div className="self-center text-xs flex justify-end mr-1.5 pl-1 z-10 text-ellipsis overflow-hidden whitespace-nowrap">
        {size && `${size} - `}
        {time ? `${activity} - ${time}` : activity}
      </div>
    </div>
  );
}
