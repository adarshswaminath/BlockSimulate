import React from "react"

interface CardProps {
    children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
    return (
        <div className="card bg-gray-900 border border-gray-400 shadow-lg bg-opacity-20 w-full h-32 lg:w-80 p-4 text-white bg:blur backdrop-blur">
            {children}
        </div>
    )
}
export default Card;