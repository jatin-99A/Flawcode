"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import React, { PropsWithChildren } from "react"

interface ActiveLinkProps {
  href: string
  activeClass?: string
  inactiveClass?: string
  className?: string
}

const ActiveLink: React.FC<PropsWithChildren<ActiveLinkProps>> = ({
  href,
  children,
  activeClass = "font-bold underline",
  inactiveClass = "",
  className = ""
}) => {
  const pathname = usePathname()
  const isActive = pathname === href

  const combinedClass = `${isActive ? activeClass : inactiveClass} ${className}`.trim()

  return (
    <Link href={href} className={combinedClass}>
      {children}
    </Link>
  )
}

export default ActiveLink
