import React from "react";
import member_berries_logo from "../../images/member_berries.png";
import styles from "./SideNavigation.module.css";

function Logo() {
	return (
		<div className={styles.logo_div}>
			<img className={styles.logo} src={member_berries_logo} alt="MEMBER BERRY LOGO"></img>
		</div>
	);
}

export default Logo;
