const { default: MainNavbar } = require("../MainNavbar/Navbar");

function Layout({ children }) {
  return (
    <>
      <div className="layout">
        <MainNavbar />
        <main>{children}</main>
      </div>{" "}
    </>
  );
}

export default Layout;
