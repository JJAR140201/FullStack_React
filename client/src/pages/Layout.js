import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return <div>
        <nav>
            <ul>
                <li>
                    <Link to="/Vista1">Vista1</Link>
                </li>
                <li>
                    <Link to="/vista2">Vista2</Link>
                </li>
                <li>
                    <Link to="/vista3">Vista3</Link>
                </li>
            </ul>
        </nav>
        <hr />
        <Outlet />
    </div >;
}

export default Layout;