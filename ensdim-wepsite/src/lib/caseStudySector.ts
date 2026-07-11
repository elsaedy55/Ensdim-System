/**
 * sector_en / sector_ar store three "|"-delimited segments authored together:
 * "<breadcrumb tags>|<case type badge>|<challenge filter category>".
 * This avoids a schema change while still supporting two distinct badges
 * per card and a challenge-type filter independent from the breadcrumb tags.
 */
export function parseSector(raw: string) {
  const [tags, caseType, filterCategory] = raw.split('|');
  return { tags: tags ?? raw, caseType: caseType ?? '', filterCategory: filterCategory ?? tags ?? raw };
}
