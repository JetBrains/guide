// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { Tutorial } from "./TutorialModels";
import { TutorialStep } from "./TutorialStepModels";

export type TopNavProps = {
  parent: Tutorial;
  currentStep: TutorialStep;
};

type Paging = {
  previous?: TutorialStep | null;
  next?: TutorialStep | null;
  current: TutorialStep;
  currentIndex: number;
};

function getPagingElements(
  parent: Tutorial,
  currentStep: TutorialStep
): Paging {
  const siblings = parent.tutorialSteps;
  const currentSlugIndex = siblings.findIndex((s) => s == currentStep);
  const previous = currentSlugIndex > 0 ? siblings[currentSlugIndex - 1] : null;
  const next =
    currentSlugIndex < siblings.length ? siblings[currentSlugIndex + 1] : null;

  return {
    previous,
    next,
    current: currentStep,
    currentIndex: currentSlugIndex,
  };
}

export const TopNav = ({ parent, currentStep }: TopNavProps): JSX.Element => {
  const { previous, next, currentIndex } = getPagingElements(
    parent,
    currentStep
  );
  return (
    <div style={`marginBottom: '1em'`}>
      <div className={`mb-4`}>
        <a
          href={`${parent.url}`}
          className="topnav-previous is-size-7"
          style={`border: "none" `}
          title={parent.title}
        >
          <span className="icon">
            <i className="fas fa-arrow-up" />
          </span>
        </a>

        <a
          aria-label="Parent Tutorial"
          href={parent.url}
          className="topnav-previous is-size-7"
          style={`border: "none" `}
          title={parent.title}
        >
          <span>Up to {parent.title}</span>
        </a>
      </div>
      <div className="columns">
        <div className="column has-text-left is-one-quarter-desktop is-hidden-mobile">
          {previous && (
            <a
              href={previous.url}
              className="topnav-previous button"
              style={`border: 0`}
              title={previous.title}
              aria-label="Top Previous Step"
            >
              <span className="icon">
                <i className="fas fa-arrow-left" />
              </span>
              <span style={`paddingLeft: '1em' `}>Previous</span>
            </a>
          )}
        </div>
        <div className="column has-text-centered is-one-half is-full-mobile">
          <div className="dropdown is-hoverable">
            <div className="dropdown-trigger" style={`width: '20rem' `}>
              <button className="button" aria-controls="dropdown-menu2">
                <span>
                  {currentIndex + 1} of {parent.tutorialSteps.length}
                </span>
                <span className="icon is-small">
                  <i className="fas fa-angle-down" />
                </span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu2" role="menu">
              <div className="dropdown-content">
                <div className="dropdown-item">
                  <strong className="is-size-5">{parent.title}</strong>
                </div>
                <hr className="dropdown-divider" />
                {parent.tutorialSteps.map((entry) => (
                  <a
                    href={entry.url}
                    aria-label="Step Menu Item"
                    className={`dropdown-item${
                      entry == currentStep ? " is-active" : ""
                    }`}
                  >
                    {entry.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="column has-text-right is-one-quarter-desktop is-hidden-mobile">
          {next && (
            <a
              href={next.url}
              className="topnav-previous button"
              style={`border: 0`}
              title={next.title}
              aria-label="Top Next Step"
            >
              <span style={`paddingLeft: '1em' `}>Next</span>
              <span className="icon">
                <i className="fas fa-arrow-right" />
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
export const BottomNav = ({
  parent,
  currentStep,
}: TopNavProps): JSX.Element => {
  const { previous, next } = getPagingElements(parent, currentStep);
  return (
    <div className="columns is-size-10 is-size-6">
      <div className="column has-text-left">
        {previous && (
          <a
            href={previous.url}
            className="bottomnav-previous is-small"
            aria-label="Bottom Previous Step"
          >
            <span className="icon" title={previous.title}>
              <i className="fas fa-arrow-left" />
            </span>
            <span style="padding-left: 1em">{previous.title}</span>
          </a>
        )}
      </div>
      <div className="column has-text-right">
        {next && (
          <a
            href={next.url}
            className="bottomnav-next is-small"
            aria-label="Bottom Next Step"
          >
            <span style="padding-right: 1em">{next.title}</span>
            <span className="icon" title={next.title}>
              <i className="fas fa-arrow-right" />
            </span>
          </a>
        )}
      </div>
    </div>
  );
};
