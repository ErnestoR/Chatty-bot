type LabelProps = {
  label: string;
  className?: string;
  children?: React.ReactNode;
};

const Label = ({ label, children, ...props }: LabelProps) => {
  return (
    <label {...props}>
      <span className="block text-sm font-medium text-gray-700">{label}</span>
      {children}
    </label>
  );
};

export default Label;
