import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "@/pages/Home";
import Review from "@/pages/Review";
import Templates from "@/pages/Templates";
import Regulations from "@/pages/Regulations";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function AppLayout() {
  const location = useLocation();
  const isReviewPage = location.pathname === '/review';
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/review" element={<Review />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/regulations" element={<Regulations />} />
        </Routes>
      </main>
      {!isReviewPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppLayout />
    </Router>
  );
}
