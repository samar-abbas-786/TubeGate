import { SiSharex } from "react-icons/si";

const Navbar = () => {
  return (
    <div>
      <div
        className="h-14 text-white bg-gradient-to-br from-sky-900 via-blue-900 to-indigo-950

"
      >
        <section className="logo flex gap-2 text-2xl font-bold font-mono p-2 items-center ">
          <SiSharex />
          TubeGate
        </section>
      </div>
    </div>
  );
};

export default Navbar;
