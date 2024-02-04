import * as React from "react";

type EmailTemplateProps = {
	targetEmail: string;
	message: string;
	path: string;
	token: string;
};

const url =
	process.env.NODE_ENV === "production"
		? "https://gepukjom.nrmnqdds.com"
		: "http://localhost:3000";

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	targetEmail,
	token,
	message,
	path,
}) => (
	<div>
		<h1>Hello, {targetEmail}!</h1>
		<p>{message}</p>
		<a
			href={`${url}/${path}/${token}`}
			target="_blank"
			rel="noopener noreferrer"
			style={{
				color: "white",
				backgroundColor: "blue",
				padding: "10px",
				borderRadius: "5px",
				textDecoration: "none",
			}}
		>
			Click here
		</a>
	</div>
);
