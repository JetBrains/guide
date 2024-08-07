import { Tutorial } from "./TutorialModels";
import { TutorialStep } from "./TutorialStepModels";

export type TopNavProps = {
	parent: Tutorial;
	currentStep?: TutorialStep | null;
};

type Paging = {
	previous?: TutorialStep | null;
	next?: TutorialStep | null;
	current: TutorialStep | null;
	currentIndex: number;
};

function getPagingElements(
	parent: Tutorial,
	currentStep: TutorialStep | null
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

export const TopNav = ({ parent }: TopNavProps): JSX.Element => {
	return (
		<nav class="navbar navbar-secondary">
			<div class="container">
				<div class="navbar-brand">
					<div class="navbar-item is-size-5 has-text-weight-semibold pl-0">
						<a
							href={`${parent.url}`}
							aria-label="Parent Tutorial"
							class="is-hidden-touch"
						>
							{parent.title}
						</a>
						<a
							href={`${parent.url}`}
							aria-label="Parent Tutorial"
							class="is-hidden-desktop ml-5"
						>
							{parent.title}
						</a>
					</div>
				</div>
			</div>
		</nav>
	);
};
export const BottomNav = ({
	parent,
	currentStep = null,
}: TopNavProps): JSX.Element => {
	const { previous, next } = getPagingElements(parent, currentStep);
	return (
		<div class="columns is-size-10 is-size-6 is-marginless">
			<div class="column has-text-left p-0">
				{previous && (
					<a
						href={previous.url}
						class="is-small has-text-grey-darker"
						aria-label="Bottom Previous Step"
					>
						<span class="icon" title={previous.title}>
							<i class="fas fa-arrow-left" />
						</span>
						<span class="ml-2">{previous.title}</span>
					</a>
				)}
			</div>
			<div class="column has-text-right p-0">
				{next && (
					<a
						href={next.url}
						class="is-small has-text-grey-darker"
						aria-label="Bottom Next Step"
					>
						<span class="mr-2">{next.title}</span>
						<span class="icon" title={next.title}>
							<i class="fas fa-arrow-right" />
						</span>
					</a>
				)}
			</div>
		</div>
	);
};
