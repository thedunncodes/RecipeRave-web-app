export default function indexRange(page, pageSize) {
  // returns start and end index
  return [((page - 1) * pageSize), (((page - 1) * pageSize) + pageSize)];
}
