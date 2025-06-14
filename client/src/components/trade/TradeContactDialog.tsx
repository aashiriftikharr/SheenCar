import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CustomButton } from "@/components/ui/custom-button";
import Trade1 from "../../assets/trade-1.svg";
import ProductCard from "../cards/product-card";
import { useLocation } from "wouter";

interface Seller {
  name: string;
  logo: string;
  rating: number;
  reviewCount: number;
  location: string;
  phoneNumber: string;
}

interface CarType {
  make: string;
  model: string;
  year: number;
  price: number;
  seller: Seller;
}

interface TradeContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  seller: Seller;
  car: CarType;
}

const dummyCars = [
  {
    id: 1,
    title: "Toyota Corolla SE",
    year: 2025,
    price: 22500,
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 2,
    title: "Honda Civic LX",
    year: 2024,
    price: 21000,
    image:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
];

const TradeContactDialog: React.FC<TradeContactDialogProps> = ({
  open,
  onOpenChange,
  seller,
  car,
}) => {
  const [flow, setFlow] = useState<
    "main" | "select" | "add" | "trade" | "proposal"
  >("main");
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [, location] = useLocation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md w-[95%] h-auto max-h-[90vh] overflow-y-auto rounded-lg">
        <div className="p-4 sm:p-6 text-center">
          {flow === "main" && (
            <>
              {/* Icon */}
              <div className="mb-4 sm:mb-6 flex justify-center">
                <img src={Trade1} alt="trade" className="w-16 sm:w-20" />
              </div>
              {/* Title */}
              <div
                style={{
                  fontFamily: "Gilroy-Medium, sans-serif",
                  fontWeight: 400,
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textAlign: "center",
                  color: "#000000",
                }}
                className="text-lg sm:text-xl md:text-2xl mb-2"
              >
                Interested in this Car? Make an Offer today!
              </div>
              {/* Subtitle */}
              <div
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 300,
                  lineHeight: "22px",
                  letterSpacing: "0%",
                  textAlign: "center",
                  color: "#585353",
                }}
                className="text-sm sm:text-base mb-4 sm:mb-6"
              >
                Want to trade your car for this listing?
                <br />
                Choose how you'd like to proceed.
              </div>
              {/* Buttons */}
              <div className="space-y-2 sm:space-y-3">
                <CustomButton
                  customStyles={{
                    width: "100%",
                    marginBottom: "8px",
                  }}
                  onClick={() => setFlow("select")}
                >
                  Select From Listings
                </CustomButton>
                <CustomButton
                  variant="outline"
                  outlineColor="#AF8C32"
                  customStyles={{
                    width: "100%",
                    marginBottom: "8px",
                  }}
                  onClick={() => {
                    location("/post-ad");
                  }}
                >
                  Add Car for Trade
                </CustomButton>
              </div>
              {/* Disclaimer */}
              <p className="text-xs text-gray-500 mt-3 sm:mt-4 leading-relaxed">
                *If the seller allows Price Adjustment, the system will
                automatically calculate the difference based on vehicle values.
              </p>
            </>
          )}

          {flow === "select" && (
            <>
              <h2
                style={{
                  fontFamily: "Gilroy-Medium, sans-serif",
                  fontWeight: 400,
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textAlign: "center",
                  color: "#171616",
                }}
                className="text-lg sm:text-xl md:text-2xl mb-2"
              >
                Select a Car from Your Active Listings
              </h2>
              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 300,
                  lineHeight: "22px",
                  letterSpacing: "0%",
                  textAlign: "center",
                  color: "#585353",
                }}
                className="text-sm sm:text-base mb-4 sm:mb-6"
              >
                Choose one of your active listings to propose a trade.
              </p>
              <div className="mb-4 space-y-2 sm:space-y-3">
                {dummyCars?.map((item) => (
                  <label key={item.id} className="flex w-full">
                    <input
                      type="radio"
                      name="select-car"
                      className="mr-2 sm:mr-3 accent-green-800"
                      checked={selectedCarId === item.id}
                      onChange={() => setSelectedCarId(item.id)}
                    />
                    <ProductCard
                      title={item.title}
                      year={item.year}
                      price={item.price}
                      image={item.image}
                    />
                  </label>
                ))}
              </div>
              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 300,
                  lineHeight: "22px",
                  letterSpacing: "0%",
                  textAlign: "center",
                  color: "#585353",
                }}
                className="text-sm sm:text-base mb-4 sm:mb-6"
              >
                Only Cars that will keep the trade even are allowed.
              </p>
              <CustomButton
                customStyles={{
                  width: "100%",
                  marginBottom: "8px",
                }}
                disabled={selectedCarId === null}
                onClick={() => setFlow("trade")}
              >
                Confirm Selection
              </CustomButton>
            </>
          )}

          {flow === "add" && (
            <>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Add a Car for Trade
              </h2>
              <p className="text-[#585353] text-sm mb-6">
                (A form to add your car details would appear here.)
              </p>
              {/* Placeholder for add car form */}
              <div className="mb-4 border rounded-lg p-4 text-gray-500">
                [Add car for trade form goes here]
              </div>
              <CustomButton
                customStyles={{
                  width: "100%",
                  marginBottom: "8px",
                }}
              >
                Submit Car for Trade
              </CustomButton>
              <CustomButton
                variant="outline"
                customStyles={{
                  width: "100%",
                  marginTop: "8px",
                }}
                onClick={() => setFlow("main")}
              >
                Back
              </CustomButton>
            </>
          )}

          {flow === "trade" && (
            <>
              <h2
                style={{
                  fontFamily: "Gilroy-Medium, sans-serif",
                  fontWeight: 400,
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textAlign: "center",
                  color: "#171616",
                }}
                className="text-lg sm:text-xl md:text-2xl mb-2"
              >
                Trade Proposal Summary
              </h2>
              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 300,
                  lineHeight: "22px",
                  letterSpacing: "0%",
                  textAlign: "center",
                  color: "#585353",
                }}
                className="text-sm sm:text-base mb-4 sm:mb-6"
              >
                You're proposing an even trade! Review the details below before
                submitting your offer.
              </p>

              <div className="mb-4 sm:mb-6">
                <div
                  style={{
                    fontFamily: "Gilroy-SemiBold, sans-serif",
                    fontWeight: 400,
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#171616",
                  }}
                  className="text-sm sm:text-base text-left mb-2"
                >
                  Your Selected Car:
                </div>
                {selectedCarId && (
                  <ProductCard
                    title={
                      dummyCars.find((c) => c.id === selectedCarId)?.title || ""
                    }
                    year={
                      dummyCars.find((c) => c.id === selectedCarId)?.year || 0
                    }
                    price={
                      dummyCars.find((c) => c.id === selectedCarId)?.price || 0
                    }
                    image={
                      dummyCars.find((c) => c.id === selectedCarId)?.image || ""
                    }
                  />
                )}
              </div>
              <div className="mb-4">
                <div
                  style={{
                    fontFamily: "Gilroy-SemiBold, sans-serif",
                    fontWeight: 400,
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#171616",
                  }}
                  className="text-sm sm:text-base text-left mb-2"
                >
                  To be Traded with:
                </div>
                <ProductCard
                  title={car.make + " " + car.model}
                  year={car.year}
                  price={car.price}
                  image={
                    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                  }
                />
              </div>

              <CustomButton
                customStyles={{
                  width: "100%",
                  marginBottom: "8px",
                }}
                disabled={selectedCarId === null}
                onClick={() => {
                  setFlow("proposal");
                }}
              >
                Submit Proposal
              </CustomButton>
            </>
          )}

          {flow === "proposal" && (
            <>
              {/* Icon */}
              <div className="mb-4 sm:mb-6 flex justify-center">
                <img src={Trade1} alt="trade" className="w-16 sm:w-20" />
              </div>
              {/* Title */}
              <div
                style={{
                  fontFamily: "Gilroy-Medium, sans-serif",
                  fontWeight: 400,
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textAlign: "center",
                  color: "#000000",
                }}
                className="text-lg sm:text-xl md:text-2xl mb-2"
              >
                Trade Proposal Sent Successfully!
              </div>
              {/* Subtitle */}
              <div
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 300,
                  lineHeight: "22px",
                  letterSpacing: "0%",
                  textAlign: "center",
                  color: "#585353",
                }}
                className="text-sm sm:text-base"
              >
                Your trade offer has been sent to the seller. Now, just sit
                tight and wait for their response! You'll get a notification
                once the seller reviews your proposal.
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TradeContactDialog;
