export const REMOVE = "REMOVE";
export const INCREASE = "INCREASE";
export const DECREASE = "DECREASE";
export const ADD_TO_CART = "ADD_TO_CART";
export const CLEARCART = "CLEARCART";

export function remove(id) {
  return { type: REMOVE, payload: id };
}
export function incAmount(id) {
  return { type: INCREASE, payload: id };
}
export function decAmount(id) {
  return { type: DECREASE, payload: id };
}
