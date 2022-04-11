import { click } from "@testing-library/user-event/dist/click";
import React from "react";
import "./Button.css";

export default (props) => {
	const { label, seletores, click } = props;
	const classes = seletores.join(" ");

	return (
		<button className={`${classes}`} onClick={()=>click(label)}>
			{label}
		</button>
	);
};
