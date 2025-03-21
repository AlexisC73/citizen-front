import { Link } from "react-router-dom";
import { MenuIcon } from "../../assets/icons/icons";
import { User } from "../../context/auth/auth_context";

export default function Header({ user }: { user: User | null }) {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <MenuIcon className="text-2xl" />
          </div>
          {user ? (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Organization</a>
              </li>
            </ul>
          ) : null}
        </div>
        <a className="btn btn-ghost text-xl">Star Citizen</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        {user ? (
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Organization</a>
            </li>
          </ul>
        ) : null}
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={user.avatarUrl} />
            </div>
          </div>
        ) : (
          <Link className="link link-primary" to="/auth/signin">
            Se connecter / S'inscrire
          </Link>
        )}
      </div>
    </div>
  );
}
