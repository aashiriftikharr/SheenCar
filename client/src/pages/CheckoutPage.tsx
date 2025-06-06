import React from "react";
import { useLocation } from "wouter";
import StripeCheckout from "../components/stripe/stripe-checkout";

const CheckoutPage: React.FC = () => {
  const [location, setLocation] = useLocation();
  
  // Get state from URL search params
  const searchParams = new URLSearchParams(window.location.search);
  const duration = searchParams.get('duration');
  const budget = searchParams.get('budget');
  const carDetails = JSON.parse(searchParams.get('carDetails') || '{}');
  const returnUrl = searchParams.get('returnUrl') || '/';

  // Only redirect if we're trying to make a purchase without required parameters
  React.useEffect(() => {
    // Check if we're on the checkout page with a purchase attempt
/*     const isPurchaseAttempt = window.location.pathname === '/checkout' && 
      (window.location.search.includes('duration=') || window.location.search.includes('budget='));
    
    if (isPurchaseAttempt && (!duration || !budget)) {
      setLocation("/");
    } */
  }, [duration, budget, setLocation]);

  const handlePaymentSuccess = () => {
    // Redirect back to the return URL with payment success parameter
    setLocation(`${returnUrl}?paymentSuccess=true`);
  };

  return (
    <div>
      <StripeCheckout
        duration={Number(duration) || 0}
        budget={Number(budget) || 0}
        carDetails={carDetails}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default CheckoutPage;
