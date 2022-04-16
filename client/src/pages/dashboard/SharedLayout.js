import { Outlet } from "react-router-dom";
import Wrapper from '../../assets/wrappers/SharedLayout'
import { Navbar, SmallSidebar, BigSidebar } from '../../components'
import AppBreadcrumbs from "../../components/AppBreadcrumbs";

const SharedLayout = () => {
    return (
        <>
            <Wrapper>
                <main className="dashboard">
                    <SmallSidebar />
                    <BigSidebar />
                    <div>
                        <Navbar />
                        <div className="dashboard-page">
                            <AppBreadcrumbs />
                            <Outlet />
                        </div>
                    </div>
                </main>
            </Wrapper>
        </>
    )
}

export default SharedLayout