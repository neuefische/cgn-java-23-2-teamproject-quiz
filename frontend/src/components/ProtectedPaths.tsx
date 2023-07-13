import {Navigate, Outlet} from "react-router-dom";

type Props = {
    user?: string
}
function ProtectedPaths(props: Props) {
    const isAuthenticated = props.user !== undefined && props.user!== "anonymousUser"
    return (
        isAuthenticated ? <Outlet/> : <Navigate to={"/login"} />
    );
}

export default ProtectedPaths;