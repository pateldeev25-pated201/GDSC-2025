import "../../styles/Button.css"; 

export function Button({ children, ...props }) {
  console.log("Button component is rendering:", children); // ✅ Debugging line

  return (
    <button className="custom-button" {...props}>
      {children}
    </button>
  );
}
