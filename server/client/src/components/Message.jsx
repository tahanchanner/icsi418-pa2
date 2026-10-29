export default function Message({ status }) {
  if (!status) return null;
  return <p className={`message ${status.success ? "success" : "error"}`}>{status.message}</p>;
}