"use client"

import { cn } from "@/lib/utils";
import { HTMLAttributes, useRef } from "react";

interface CodeInputProps {
    defaultValue?: string,
    onValueChange: (v: string | undefined) => void,
}

const CodeInput = ({defaultValue, onValueChange, ...props}: CodeInputProps & HTMLAttributes<HTMLInputElement>): React.ReactNode => {
    const inputRef = useRef<HTMLInputElement>(null);
    const onChange = (): void => {
        if (onValueChange) onValueChange(inputRef.current?.value);
    };

    return <input {...props} placeholder="" onChange={onChange} maxLength={10} defaultValue={defaultValue} className={cn("p-1 w-[144px] rounded-sm outline-none bg-transparent hover:bg-muted focus:bg-muted transition-colors delay-100", props.className)} ref={inputRef} />
}

export default CodeInput;