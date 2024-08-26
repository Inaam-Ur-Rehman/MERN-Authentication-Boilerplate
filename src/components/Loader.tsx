import Logo from "../assets/logo.png";
export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <img
        src={Logo}
        alt="loader"
        width={100}
        height={100}
        className="duration-1000 animate-bounce"
      />
    </div>
  );
}
