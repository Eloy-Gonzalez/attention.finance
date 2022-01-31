// @Vendors
import React from 'react'
import { Route, Redirect } from 'react-router-dom';

// @Components
import DashboardLayout from 'components/DashboardLayout'

// @Helpers
import { verifyToken } from 'utils/helpers'

function PublicRouter({ component: Component, alias="Not title assigned", ...rest }) {
	return !verifyToken()
	? <Route {...rest} render={ (routeProps) =>
		<DashboardLayout title={alias} withFooter={rest.withFooter}>
			<Component {...routeProps}/>
		</DashboardLayout>
	} />
	: <Redirect to="/"/>
}

export default PublicRouter;
