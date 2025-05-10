export function getFakeFilePath(fileMap: Map<File, any>) {
  if (!(fileMap instanceof Map)) return undefined;

  const firstEntry = fileMap.keys().next();
  if (firstEntry.done || !(firstEntry.value instanceof File)) {
    return '';
  }

  const file = firstEntry.value;
  return `C:\\fakepath\\${file.name}`;
}
