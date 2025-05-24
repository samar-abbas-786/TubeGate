import { SiSharex } from "react-icons/si";
import Link from "next/link";
const Navbar = () => {
  return (
    <div>
      <div className="h-14 flex items-center justify-between px-5 bg-transparent drop-shadow-2xl shadow-sm shadow-black  ">
        <section className="logo flex gap-2 text-2xl font-bold font-mono p-2 items-center ">
          <SiSharex />
          TubeGate
        </section>
        <section>
          <ul>
            <Link href="/register">Register</Link>
            <Link href="/register">Login</Link>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Navbar;
