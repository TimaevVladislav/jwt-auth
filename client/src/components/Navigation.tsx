import React from "react"
import {Link} from "react-router-dom"

export default function Navigation() {
    return (
        <div className="flex justify-between items-center h-[50px] px-5 shadow-md bg-gray-500 text-white">
            <h3 className="font-bold">Travel</h3>

            <ul>
                <Link to="/" className="mr-2">Home</Link>
                <Link to="/destinations" className="mr-2" >Destinations</Link>
                <Link to="/blogs" className="mr-2">Blog</Link>
                <Link to="/about" className="mr-2">About</Link>
            </ul>
        </div>
    )
}