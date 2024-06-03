export default function Letter({ value, isShown }) {
  let output = '';
  if (isShown) {
    output = value;
  }
  return <span>{output}</span>;
}
