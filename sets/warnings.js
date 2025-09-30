/**
 * @overview Console warnings
 */
const INITIAL = "extended-click-outside:";

export const ALREADY_HAS_LISTENER = `${INITIAL} element already has extended click outside listener`;
export const INVALID_ELEMENT = `${INITIAL} element must be a valid HTMLElement`;
export const INVALID_LISTENER = `${INITIAL} listener must be a function`;
export const MISSING_ELEMENT = `${INITIAL} element has no click outside listener`;
export const OUTSIDE_OF_DOCUMENT = `${INITIAL} can not run outside a document`;
