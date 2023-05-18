import * as React from "react";
import { Link } from "gatsby";
import { navbar, navbarLink, navbarLinkActive } from "../styles/navbar.module.css";

const Navbar = ({ active }) => {
    return (
        <nav className={navbar}>
            <ul>
                <li>
                    <Link to="/" className={navbarLink + (active === "today" ? ` ${navbarLinkActive}` : "")}>Today</Link>
                </li>
                <li>
                    <Link to="/old" className={navbarLink + (active === "old" ? ` ${navbarLinkActive}` : "")}>Old data</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
