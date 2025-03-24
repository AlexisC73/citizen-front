import { Link } from "react-router-dom";
import { MenuIcon } from "../../assets/icons/icons";
import { AuthUser } from "../../store/auth/auth-slice";
import { SignoutButton } from "../../application/auth/signout/signout";

const NAVIGATIONS: { label: string; href: string }[] = [
  {
    label: "My Organizations",
    href: "/",
  },
];

export interface HeaderProps {
  authenticatedUser: AuthUser;
}

export default function Header({ authenticatedUser }: HeaderProps) {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <MenuIcon className="text-2xl" />
          </div>
          {authenticatedUser ? (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                {NAVIGATIONS.map((nav) => (
                  <Link key={nav.label} to={nav.href}>
                    {nav.label}
                  </Link>
                ))}
              </li>
            </ul>
          ) : null}
        </div>
        <a className="btn btn-ghost text-xl">Star Citizen</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        {authenticatedUser ? (
          <ul className="menu menu-horizontal px-1">
            <li>
              {NAVIGATIONS.map((nav) => (
                <Link key={nav.label} to={nav.href}>
                  {nav.label}
                </Link>
              ))}
            </li>
          </ul>
        ) : null}
      </div>
      <div className="navbar-end">
        {authenticatedUser ? (
          <div className="flex gap-x-2">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={authenticatedUser.avatarUrl} />
              </div>
            </div>
            <SignoutButton />
          </div>
        ) : (
          <Link className="link link-primary" to="/auth">
            Se connecter / S'inscrire
          </Link>
        )}
      </div>
    </div>
  );
}
