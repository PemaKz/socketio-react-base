export default function  PublicLayout({ children, ...props }) {
  return <div {...props}>{children}</div>;
}