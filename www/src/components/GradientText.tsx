"use client"

interface GradientTextProps {
    children: React.ReactNode,
    from?: string,
    via?: string,
    to?: string,
}

const GradientText = ({ children, from, via, to, ...props}: GradientTextProps): React.ReactNode => {
    return (
        <span className={`font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600`} {...props}>
            { children }
        </span>
    );
}

export default GradientText;