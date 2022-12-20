import { colors } from 'constants/colors';

export default function Border({ size }: { size: number }) {
  return (
    <div
      style={{
        flex: 'none',
        height: size,
        backgroundColor: colors.grey100,
      }}
    />
  );
}
