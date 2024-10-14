import styles from './MenuLink.module.css';
import { NavLink } from "react-router-dom";
import React from "react";

interface MenuLinkProps {
    to: string;
    children: React.ReactNode;
  }

export default function MenuLink({ children, to }: MenuLinkProps ) {
    return(
        <NavLink className={styles.link} to={to} >{children}</NavLink>
    )
}
