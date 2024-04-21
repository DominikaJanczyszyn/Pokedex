import '../styles/Root.css';
import logo from '../image.png';
import { Link, Outlet } from "react-router-dom"

export default function App() {
    return (
        <>
            <div id="header">
                <img id="logo" src= {logo} alt="Pokedex" />
                <Link to="/" className='buttonLink'>HOME</Link>
                <Link to="/about" className='buttonLink'>ABOUT</Link>
            </div>
            <Outlet />
        </>
    )
}