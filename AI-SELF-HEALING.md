# AI Self-Healing for Playwright Locators

## INTENTIONALLY BROKEN — AI SELF-HEALING DEMONSTRATION

The following locator strings are intentionally wrong and remain broken on purpose to demonstrate how an AI repair workflow can detect and recover from locator failures. They must not be used as the primary working test path.

- `page.locator("div.dashboard > div:nth-child(2) button")`
- `page.getByRole('button', { name: 'Calculate EMI', exact: true }).nth(99)`
- `page.locator("#root > div div:nth-child(3) label + input")`
- `page.locator("text=Total Loan Amount >> nth=0")`
- `page.locator("div[data-testid='loan-chart'] > div > canvas")`

## 1. Detection

Locator failures are typically detected through a combination of the following signals:

- Playwright times out waiting for an element.
- The locator matches zero elements or multiple elements unexpectedly.
- A strict mode violation occurs when more than one element matches.
- The DOM has changed due to a refactor or routing change.
- A screenshot shows the element is visually missing or moved.
- The accessibility tree or page HTML confirms that a semantic element exists but the selector is stale.

The repair workflow should capture the failed locator, the error message, the page URL, a screenshot, and the DOM snapshot around the failure.

## 2. Candidate extraction

When a locator fails, the AI repair agent should gather the best candidate signals from the page:

- The failed locator string
- The element role, e.g. `button`, `textbox`, `heading`
- The accessible name, e.g. `Loan Amount`
- Nearby text and labels
- `data-testid` values if present
- DOM attributes such as `name`, `id`, `aria-label`, and `placeholder`
- A screenshot or page HTML snippet of the affected area

This information is then grouped into a structured prompt to rank the best replacement.

## 3. AI prompt approach

Example prompt:

You are a Playwright locator repair agent.

The following locator failed:

<failed locator>

The page contains the following candidate elements:

<DOM/accessibility information>

Find the most stable replacement locator.

Prefer:
- getByRole
- getByLabel
- getByText
- getByTestId

Do not use:
- nth-child
- deep CSS selectors
- absolute XPath

Return:
1. replacement locator
2. reasoning
3. confidence

The model should return a robust selector such as `page.getByLabel('Loan Amount')` instead of a brittle DOM path.

## 4. Validation

Never accept an AI-generated locator blindly. The repair workflow should validate it before replacing the production selector:

- Confirm the locator targets exactly one element.
- Check the element is visible and enabled.
- Validate the expected role and accessible name.
- Execute the intended action such as click or fill.
- Re-run the failing test.
- Ensure no ambiguity remains in the DOM.

## 5. Safe application

The rule should be: patch only when the evidence is strong.

Apply the fix only if:

- The candidate matches exactly one element.
- The target is stable across reruns.
- The relevant test passes.
- There are no unexpected side effects on adjacent UI.

This keeps the AI repair workflow controlled, auditable, and safe.

## Optional proof-of-concept flow

Here is a simple pseudo-workflow:

1. Broken locator is executed.
2. Playwright throws timeout or strict mode error.
3. The failure snapshot is captured.
4. The DOM and accessibility metadata are extracted.
5. The AI model suggests a better locator.
6. The candidate is validated against the page.
7. The test is rerun.
8. The change is accepted or rejected based on evidence.

This is a demonstration only and does not require external paid services.
