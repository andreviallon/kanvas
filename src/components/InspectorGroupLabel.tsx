interface Props {
  label: string;
}

export const InspectorGroupLabel: React.FC<Props> = ({ label }) => {
  return <p className="text-xs font-medium w-full mb-1">{label}</p>;
};
