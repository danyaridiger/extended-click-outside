/**
 * @overview Console warnings
 */
const initial = "extended-click-outside:";
export const alreadyHasListener = `${initial} element already has extended click outside listener`;
export const invalidElement = `${initial} element must be a valid HTMLElement`;
export const invalidListener = `${initial} listener must be a function`;
export const missingElement = `${initial} element has no click outside listener`;
export const outsideDocument = `${initial} can not run outside a document`;