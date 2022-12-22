import { colors } from 'constants/colors';

export default function ProgressBar({
  now,
  total,
}: {
  now: number;
  total: number;
}) {
  const progressPercent = `${(now / total) * 100}%`;
  return (
    <div style={{ backgroundColor: colors.white }}>
      <div
        style={{
          width: progressPercent,
          backgroundColor: colors.teal200,
          height: '10px',
        }}
      />
    </div>
  );
}
