import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";

const Layout = ({ children, title = "Finance App" }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className="min-h-screen">
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

