// ---------------------------------------------------
// Common function to build analytic view pipeline
//
// DESCRIPTION:
// These functions are used to reuse common function between analytic views.
//
// In the See-sections all references to the project `AktivChem-Server`
// ---------------------------------------------------

/**
 * Calculates total parts count (considering the 3-level of parts (parts in parts))
 * @param parts {Object[]} array of parts
 * @returns {number} the count of parts
 */
export function calculatePartCount(parts) {
  if (parts === null) return 0;
  let totalCount = parts.length;
  for (const part of parts) totalCount += part.parts != null ? part.parts.length : 0;
  return totalCount;
}

/**
 * Get flat list of parts (considering the 3-level of parts (parts in parts))
 * @param parts {Object[]} the array of parts
 * @returns {Object[]} the flat array of parts
 */
export function getParts(parts) {
  const flatParts = [];
  if (parts === null) return null;
  for (const part of parts) {
    flatParts.push(part);
    if (part.hasOwnProperty('parts') && part.parts != null) {
      flatParts.push(part.parts);
    }
  }
  return flatParts;
}

/**
 * Calculates completion of problem parts based on completions of subparts.
 * Any part (and root) is completed only if all subparts are completed.
 * Answers of the root or a part are ignored if there are subparts.
 *
 * Result contains only 'root' and the first level of parts.
 *
 * @param parts {Array[Object]} array of parts
 * @param completedPartIds {Array[String]} array of completed part ids
 * @returns {Array[Object]} completed parts, Object is {id: partId, count: 0/1}
 *
 * Example:
 *
 * Structure of parts:
 *   part1: part11, part12
 *   part2: part21, part22
 *
 * completedPartIds: [part11, part12, part21]
 *
 * result: [
 *   {id: root, count: 0},    // part1 is completed, but part2 is not
 *   {id: part1, count: 1},   // both part11 and part12 are completed
 *   {id: part2, count: 0}    // part21 is completed, but part22 is not
 * ]
 */
export function calculateCompletedPartsHierarchically(parts, completedPartIds) {
  const completedPartSet = new Set(completedPartIds);

  const isCompleted = (parentId, subParts) => {
    if (!subParts) {
      return completedPartSet.has(parentId);
    }
    let allPartsCompleted = true;
    for (const part of subParts) {
      if (!isCompleted(part._id.str, part.parts)) {
        allPartsCompleted = false;
      }
    }
    if (allPartsCompleted) {
      completedPartSet.add(parentId);
    }
    return allPartsCompleted;
  };
  isCompleted('root', parts);

  // return only 'root' and the first level of parts
  const result = [];
  result.push({ id: 'root', count: completedPartSet.has('root') ? 1 : 0 });
  if (parts) {
    for (const part of parts) {
      const partId = part._id.str;
      result.push({ id: partId, count: completedPartSet.has(partId) ? 1 : 0 });
    }
  }
  return result;
}
