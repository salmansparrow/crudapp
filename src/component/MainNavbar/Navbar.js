import Link from "next/link";

function MainNavbar() {
  return (
    <>
      <nav className="d-flex justify-content-between align-items-center bg">
        <Link href="/" className="text-white fw-bold">
          {" "}
          CRUD{" "}
        </Link>
        <Link href="/addtopic" className="bg-white p-2">
          {" "}
          Add Topic
        </Link>
      </nav>
    </>
  );
}

export default MainNavbar;
