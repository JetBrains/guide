// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";

export type SidebarStepProps = {
  label: string;
  target: string;
  isActive: boolean;
};
const SidebarStep = ({
  label,
  target,
  isActive,
}: SidebarStepProps): JSX.Element => {
  const listClass = isActive ? "is-active" : "";
  return (
    <li className={`steps-segment ${listClass}`} style="flex-grow: 0">
      <a
        href={target}
        style="width: auto"
        className="has-text-dark"
        aria-label="Tutorial Step"
      >
        <div className="steps-content">
          <p>{label}</p>
        </div>
      </a>
    </li>
  );
};

export default SidebarStep;
