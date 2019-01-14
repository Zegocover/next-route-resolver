export default function normalizePage(page) {
  return page.replace(/(^|\/)index$/, "").replace(/^\/?/, "/");
}
