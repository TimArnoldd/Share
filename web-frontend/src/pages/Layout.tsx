import { FC } from "react";
import { Outlet, Link } from "react-router-dom";

export const Layout: FC = () => {

    function toggleNavigation(force?: boolean) {
        document.getElementById('navigation')?.classList.toggle('expanded', force);
    }

    return (
        <>
            <header>
                <div className="logo">
                    <Link to="/">
                        <img src="/logo.svg" alt="Home" />
                    </Link>
                </div>
                <nav id="navigation">
                    <div>
                        <span className="menu" onClick={() => toggleNavigation()}>
                            <span className="hamburger"></span>
                        </span>
                    </div>
                    <ul>
                        <li><Link to="/" onClick={() => toggleNavigation(false)}><div>Home</div></Link></li>
                        <li><Link to="/setToken" onClick={() => toggleNavigation(false)}><div>SetToken</div></Link></li>
                        <li><Link to="/createRoom" onClick={() => toggleNavigation(false)}><div>CreateRoom</div></Link></li>
                    </ul>
                </nav>
            </header>

            <article>
                <Outlet />
            </article>
        </>
    )
};
