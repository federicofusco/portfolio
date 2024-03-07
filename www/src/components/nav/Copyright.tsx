"use client"

import { HTMLAttributes } from "react"

const Copyright = ({...props}: HTMLAttributes<HTMLParagraphElement>): React.ReactNode => {
    return (
        <p {...props}>
            (c) Federico Fusco {new Date().getFullYear()}.<br />
            All rights reserved.
        </p>
    )
}

export default Copyright