import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./Landing.module.css";
import member_berry from "../../images/member_berries.png";
import SignUpModal from "../SignUpModal";

const Landing = () => {
	const history = useHistory();
	const currentUser = useSelector((state) => state.session.user?.id);

	if (currentUser) history.push("/home");

	return (
		<div className={styles.center}>
			<h1>The smart to-do app for busy people.</h1>
			<div className={styles.signUpModal}>
				<SignUpModal location={"landingPage"} />
			</div>
			<div className={styles.landing_img}>
				<img src={member_berry} alt="MEMBER BERRY LOGO"></img>
			</div>
			<h2>Get to-dos out of your head.</h2>
			<div className={styles.description}>
				<h4>Stop thinking about your to-dos, and let the app remember for you</h4>
			</div>
		</div>
	);
};

export default Landing;
