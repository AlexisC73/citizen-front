import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="flex-1 h-full w-full hidden md:block">
        <img
          src="https://placehold.co/600x400"
          className="object-cover h-full w-full"
        />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
}
