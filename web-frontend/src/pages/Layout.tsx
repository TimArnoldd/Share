import { FC } from "react";
import { Outlet, Link } from "react-router-dom";

export const Layout: FC = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/setToken">SetToken</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
};
