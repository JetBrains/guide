import h, { JSX } from "vhtml";

export type SidebarStepProps = {
  label: string;
  target: string;
  marker: number;
  isActive: boolean;
};
const SidebarStep = ({
  label,
  target,
  marker,
  isActive,
}: SidebarStepProps): JSX.Element => {
  const markerClass = isActive ? "is-info" : "is-primary";
  return (
    <li class={`steps-segment is-active`} style="flex-grow: 0">
      <a
        href={target}
        style="width: auto"
        class="has-text-dark"
        aria-label="Tutorial Step"
      >
        <span class={`steps-marker ${markerClass}`}>{marker}</span>
        <div class="steps-content">
          <p>{label}</p>
        </div>
      </a>
    </li>
  );
};

export default SidebarStep;
