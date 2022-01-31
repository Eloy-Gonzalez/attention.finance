import React from 'react';
import { Button } from "@mui/material";

// @Router
import { Link } from 'react-router-dom';

export default function NotFound() {
	return (
		<>
			<h1>404 - Page not found!</h1>
			<Button color="primary" component={Link} to="/">Go back</Button>
		</>
	);
}