import { Link } from "react-router";
import { LogOut, Moon, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "../ui/separator";
import { useTheme } from "../common/theme-provider";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

const Header = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { setTheme } = useTheme();
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${isScrolled
          ? "bg-white dark:bg-gray-800 shadow-md"
          : "bg-transparent"
          }`}
      >
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            to="/"
            className="text-xl font-bold bg-[#372AAC] text-white py-2 px-4 rounded-2xl dark:text-white"
          >
            RentGo
          </Link>

          <div className="hidden md:flex space-x-6">
            {["/", "/cars", "/about", "/contact"].map((path, i) => (
              <Link
                key={i}
                to={path}
                className="text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300"
              >
                {path === "/"
                  ? "Home"
                  : path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
              </Link>
            ))}
          </div>

          {/* Theme + Auth */}
          <div className="hidden md:flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Toggle theme">
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="w-10 h-10 rounded-full overflow-hidden border-2"
                    aria-label="User menu"
                  >
                    <img
                      src={user.profileImage || "/default-profile.png"}
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60">
                  <div className="flex flex-col ml-3">
                    <p className="font-semibold text-sm">{user.role} User</p>
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <Separator className="mt-3" />
                  {(user.role === "ADMIN" || user.role === "HOST") && (
                    <DropdownMenuItem asChild>
                      <Link to={`/${user.role.toLowerCase()}`}>
                        {user.role} Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/user">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white focus:outline-none transition"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-white dark:bg-gray-800 shadow-lg absolute w-full left-0 transition-all duration-300 ${mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
            }`}
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            {["/", "/cars", "/about", "/contact"].map((path, i) => (
              <Link
                key={i}
                to={path}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition"
              >
                {path === "/"
                  ? "Home"
                  : path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
              </Link>
            ))}

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="inline-block bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="inline-block bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/user"
                  className="inline-block bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
