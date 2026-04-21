import Typography from "../ui/typography";

interface SummaryCardProps {
  label: string;
  value: string;
}
const SummaryCard = (props: SummaryCardProps) => {
  return (
    <div className="bg-neutral-800 border-neutral-600 border rounded-12 p-5 flex flex-col gap-y-6 max-w-45.5 w-full">
      <Typography variant="textPreset6">{props.label}</Typography>
      <Typography variant="textPreset3">{props.value}</Typography>
    </div>
  );
};

export default SummaryCard;
