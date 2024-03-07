"use client"

interface CodeProps {
    children: React.ReactNode,
}

const Code = ({ children, ...props }: CodeProps & React.HTMLAttributes<HTMLSpanElement>): React.ReactNode => {
    return <span {...props} className={`${props.className ? props.className : " "} font-mono text-slate-500 text-lg`}>{ children }</span>;
}

export default Code;