import * as React from "react";
import { mainContainer, content } from "./main-container.module.css";
import Navbar from "./navbar.js";

const MainContainer = ({ active, children }) => {
    return (
        <div className={mainContainer}>
            <Navbar active={active}></Navbar>
            <main className={content}>
                {children}
            </main>
        </div>
    );
};

export default MainContainer;
