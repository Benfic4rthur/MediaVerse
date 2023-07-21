export function processSelectedFile(event) {
  const file = event.target.files[0];
  return { url: URL?.createObjectURL(file), file };
}
