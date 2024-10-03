import React from "react";

type Props = {
    children?: React.ReactNode;
    onClick?: () => void;
};

const MainButton = ({ children, onClick }: Props) => {
    return (
        <button
            className="rounded-md bg-secondary-500 px-10 py-2 hover:bg-primary-500 hover:text-white"
            onClick={() => {
                if (onClick) {
                    onClick();
                }
            }}
        >
            {children}
        </button>
    );
};

export default MainButton;