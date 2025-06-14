import React, { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ProfileActionButton from "@/components/profile-action-button";
import EditIcon from "../assets/Icon/edit.svg";
import EditIcon2 from "../assets/Icon/edit2.svg";
import Plus from "../assets/Icon/Plus.svg";
import ProductCardVariant2, {
  ButtonState,
} from "@/components/cards/product-card-variant-2";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Pencil, X } from "lucide-react";
import Pagination2 from "@/components/ui/pagination2";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomPhoneInput from "@/components/ui/phone-input";
import TabSection from "@/components/ui/tab-section";
import AccountBanner from "../assets/account-banner.png";
import RequestTypeModal from "@/components/modals/request-type-modal";
import AccountHero from "@/components/account-hero";
import { CustomButton } from "@/components/ui/custom-button";
import DealCard from "@/components/deal-card";
import { useLocation, useSearchParams } from "wouter";
import DealDetailsView from "@/components/deal-details-view";
import OfferDetailsView from "@/components/offer-details-view";
import { useMobileDevice } from "@/hooks/useMobileDevice";

const tabList = ["Active", "Pending", "Closed", "Request"];

// Keep the original tab list for UI navigation
const tradeDealsTabList = ["My Trade Proposals", "Deals Received"];

// First, define the Car interface
interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
  status: string; // For status badge
  buttonState: string;
  dealType?: "sell" | "buy";
  tradeWith?: string;
  tabType: string; // For tab filtering
  isTraded?: boolean;
  tradeAmount?: number;
}

// Add these new interfaces and dummy data after the existing Car interface
interface Offer {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
  status: string; // Changed to string to match Car interface
  buttonState: string; // Added to match Car interface
  offerAmount: number;
  offerDate: string;
  tabType: "My Listings" | "My Offers";
}

// Add the offers tab list
const offersTabList = ["My Listings", "My Offers"];

const dummyCars = [
  // Active Tab Cars (18 cars = 2 pages)
  {
    id: 1,
    make: "Toyota",
    model: "Camry",
    year: 2023,
    price: 25000,
    image:
      "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&w=400",
    status: "active",
    buttonState: "boostAd",
    tabType: "Active",
  },
  {
    id: 2,
    make: "Honda",
    model: "Civic",
    year: 2022,
    price: 22000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "active",
    buttonState: "boosted",
    tabType: "Active",
  },
  {
    id: 3,
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 45000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "active",
    buttonState: "renewAd",
    tabType: "Active",
  },
  {
    id: 4,
    make: "BMW",
    model: "X5",
    year: 2022,
    price: 55000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "active",
    buttonState: "boosted",
    tabType: "Active",
  },
  {
    id: 5,
    make: "Mercedes",
    model: "C-Class",
    year: 2023,
    price: 48000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "active",
    buttonState: "renewBoost",
    tabType: "Active",
  },
  {
    id: 6,
    make: "Audi",
    model: "A4",
    year: 2022,
    price: 42000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "active",
    buttonState: "boosted",
    tabType: "Active",
  },
  {
    id: 7,
    make: "Lexus",
    model: "ES",
    year: 2023,
    price: 42000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "active",
    buttonState: "boostAd",
    tabType: "Active",
  },
  {
    id: 8,
    make: "Acura",
    model: "TLX",
    year: 2023,
    price: 38000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "active",
    buttonState: "boosted",
    tabType: "Active",
  },
  {
    id: 9,
    make: "Volvo",
    model: "S60",
    year: 2023,
    price: 41000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "active",
    buttonState: "boostAd",
    tabType: "Active",
  },
  {
    id: 10,
    make: "Genesis",
    model: "G70",
    year: 2023,
    price: 45000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "active",
    buttonState: "boosted",
    tabType: "Active",
  },
  {
    id: 11,
    make: "Mazda",
    model: "Mazda6",
    year: 2023,
    price: 32000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "active",
    buttonState: "boostAd",
    tabType: "Active",
  },
  {
    id: 12,
    make: "Subaru",
    model: "Legacy",
    year: 2023,
    price: 28000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "active",
    buttonState: "boosted",
    tabType: "Active",
  },
  {
    id: 13,
    make: "Kia",
    model: "K5",
    year: 2023,
    price: 26000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "active",
    buttonState: "boostAd",
    tabType: "Active",
  },
  {
    id: 14,
    make: "Hyundai",
    model: "Sonata",
    year: 2023,
    price: 24000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "active",
    buttonState: "boosted",
    tabType: "Active",
  },
  {
    id: 15,
    make: "Nissan",
    model: "Altima",
    year: 2023,
    price: 27000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "active",
    buttonState: "boostAd",
    tabType: "Active",
  },
  {
    id: 16,
    make: "Mitsubishi",
    model: "Mirage",
    year: 2023,
    price: 22000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "active",
    buttonState: "boosted",
    tabType: "Active",
  },
  {
    id: 17,
    make: "Buick",
    model: "Regal",
    year: 2023,
    price: 35000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "active",
    buttonState: "boostAd",
    tabType: "Active",
  },
  {
    id: 18,
    make: "Chrysler",
    model: "300",
    year: 2023,
    price: 36000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "active",
    buttonState: "boosted",
    tabType: "Active",
  },

  // Pending Tab Cars (18 cars = 2 pages)
  {
    id: 19,
    make: "Ford",
    model: "Mustang",
    year: 2023,
    price: 35000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "pending",
    buttonState: "withdrawAd",
    tabType: "Pending",
  },
  {
    id: 20,
    make: "Chevrolet",
    model: "Corvette",
    year: 2022,
    price: 65000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "pending",
    buttonState: "withdrawAd",
    tabType: "Pending",
  },
  {
    id: 21,
    make: "Porsche",
    model: "911",
    year: 2023,
    price: 95000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "pending",
    buttonState: "withdrawAd",
    tabType: "Pending",
  },
  {
    id: 22,
    make: "Lexus",
    model: "RX",
    year: 2022,
    price: 52000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "pending",
    buttonState: "withdrawAd",
    tabType: "Pending",
  },
  {
    id: 23,
    make: "Volvo",
    model: "XC90",
    year: 2023,
    price: 58000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "pending",
    buttonState: "withdrawAd",
    tabType: "Pending",
  },
  {
    id: 24,
    make: "Jaguar",
    model: "F-Pace",
    year: 2022,
    price: 62000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "pending",
    buttonState: "withdrawAd",
    tabType: "Pending",
  },
  {
    id: 25,
    make: "Mazda",
    model: "CX-5",
    year: 2022,
    price: 32000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "pending",
    buttonState: "withdrawAd",
    tabType: "Pending",
  },
  {
    id: 26,
    make: "Porsche",
    model: "Cayman",
    year: 2023,
    price: 65000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "pending",
    buttonState: "withdrawAd",
    tabType: "Pending",
  },
  {
    id: 27,
    make: "Maserati",
    model: "Ghibli",
    year: 2023,
    price: 72000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "pending",
    buttonState: "withdrawAd",
    tabType: "Pending",
  },
  {
    id: 28,
    make: "Alfa Romeo",
    model: "Giulia",
    year: 2023,
    price: 45000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "pending",
    buttonState: "withdrawAd",
    tabType: "Pending",
  },
  {
    id: 29,
    make: "Jaguar",
    model: "XE",
    year: 2023,
    price: 42000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "pending",
    buttonState: "withdrawAd",
    tabType: "Pending",
  },
  {
    id: 30,
    make: "Bentley",
    model: "Continental",
    year: 2023,
    price: 220000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "pending",
    buttonState: "withdrawAd",
    tabType: "Pending",
  },
  {
    id: 31,
    make: "Rolls-Royce",
    model: "Ghost",
    year: 2023,
    price: 350000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "pending",
    buttonState: "withdrawAd",
    tabType: "Pending",
  },
  {
    id: 32,
    make: "Aston Martin",
    model: "DB11",
    year: 2023,
    price: 200000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "pending",
    buttonState: "withdrawAd",
    tabType: "Pending",
  },
  {
    id: 33,
    make: "McLaren",
    model: "720S",
    year: 2023,
    price: 300000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "pending",
    buttonState: "withdrawAd",
    tabType: "Pending",
  },
  {
    id: 34,
    make: "Ferrari",
    model: "F8",
    year: 2023,
    price: 280000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "pending",
    buttonState: "withdrawAd",
    tabType: "Pending",
  },
  {
    id: 35,
    make: "Lamborghini",
    model: "Huracan",
    year: 2023,
    price: 250000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "pending",
    buttonState: "withdrawAd",
    tabType: "Pending",
  },
  {
    id: 36,
    make: "Bugatti",
    model: "Chiron",
    year: 2023,
    price: 3000000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "pending",
    buttonState: "withdrawAd",
    tabType: "Pending",
  },

  // Closed Tab Cars (27 cars = 3 pages)
  {
    id: 37,
    make: "Mazda",
    model: "CX-5",
    year: 2022,
    price: 32000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "closed",
    buttonState: "reopenAd",
    tabType: "Closed",
  },
  {
    id: 38,
    make: "Subaru",
    model: "Outback",
    year: 2023,
    price: 34000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "closed",
    buttonState: "reopenAd",
    tabType: "Closed",
  },
  {
    id: 39,
    make: "Hyundai",
    model: "Tucson",
    year: 2022,
    price: 28000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "closed",
    buttonState: "reopenAd",
    tabType: "Closed",
  },
  {
    id: 40,
    make: "Kia",
    model: "Telluride",
    year: 2023,
    price: 38000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "closed",
    buttonState: "reopenAd",
    tabType: "Closed",
  },
  {
    id: 41,
    make: "Nissan",
    model: "Rogue",
    year: 2022,
    price: 29000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "closed",
    buttonState: "reopenAd",
    tabType: "Closed",
  },
  {
    id: 42,
    make: "Mitsubishi",
    model: "Outlander",
    year: 2023,
    price: 27000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "closed",
    buttonState: "reopenAd",
    tabType: "Closed",
  },
  {
    id: 43,
    make: "Jeep",
    model: "Grand Cherokee",
    year: 2022,
    price: 45000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "closed",
    buttonState: "reopenAd",
    tabType: "Closed",
  },
  {
    id: 44,
    make: "Jeep",
    model: "Grand Cherokee",
    year: 2022,
    price: 45000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "closed",
    buttonState: "reopenAd",
    tabType: "Closed",
  },
  {
    id: 45,
    make: "GMC",
    model: "Sierra",
    year: 2022,
    price: 42000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "closed",
    buttonState: "reopenAd",
    tabType: "Closed",
  },
  {
    id: 46,
    make: "Ram",
    model: "1500",
    year: 2022,
    price: 40000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "closed",
    buttonState: "reopenAd",
    tabType: "Closed",
  },
  {
    id: 47,
    make: "Toyota",
    model: "Tacoma",
    year: 2022,
    price: 35000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "closed",
    buttonState: "reopenAd",
    tabType: "Closed",
  },
  {
    id: 48,
    make: "Honda",
    model: "Ridgeline",
    year: 2022,
    price: 38000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "closed",
    buttonState: "reopenAd",
    tabType: "Closed",
  },
  {
    id: 49,
    make: "Nissan",
    model: "Frontier",
    year: 2022,
    price: 32000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "closed",
    buttonState: "reopenAd",
    tabType: "Closed",
  },
  {
    id: 50,
    make: "Chevrolet",
    model: "Colorado",
    year: 2022,
    price: 34000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "closed",
    buttonState: "reopenAd",
    tabType: "Closed",
  },
  {
    id: 51,
    make: "GMC",
    model: "Canyon",
    year: 2022,
    price: 36000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "closed",
    buttonState: "reopenAd",
    tabType: "Closed",
  },
  {
    id: 52,
    make: "Ford",
    model: "Ranger",
    year: 2022,
    price: 33000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "closed",
    buttonState: "reopenAd",
    tabType: "Closed",
  },
  {
    id: 53,
    make: "Toyota",
    model: "4Runner",
    year: 2022,
    price: 42000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "closed",
    buttonState: "reopenAd",
    tabType: "Closed",
  },
  {
    id: 54,
    make: "Jeep",
    model: "Wrangler",
    year: 2022,
    price: 45000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "closed",
    buttonState: "reopenAd",
    tabType: "Closed",
  },
  {
    id: 55,
    make: "Land Rover",
    model: "Defender",
    year: 2022,
    price: 65000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "closed",
    buttonState: "reopenAd",
    tabType: "Closed",
  },
  {
    id: 56,
    make: "Mercedes",
    model: "G-Class",
    year: 2022,
    price: 150000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "closed",
    buttonState: "reopenAd",
    tabType: "Closed",
  },
  {
    id: 57,
    make: "Toyota",
    model: "Land Cruiser",
    year: 2022,
    price: 85000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "closed",
    buttonState: "reopenAd",
    tabType: "Closed",
  },
  {
    id: 58,
    make: "Lexus",
    model: "LX",
    year: 2022,
    price: 95000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "closed",
    buttonState: "reopenAd",
    tabType: "Closed",
  },
  {
    id: 59,
    make: "Nissan",
    model: "Patrol",
    year: 2022,
    price: 75000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "closed",
    buttonState: "reopenAd",
    tabType: "Closed",
  },
  {
    id: 60,
    make: "Mitsubishi",
    model: "Pajero",
    year: 2022,
    price: 55000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "closed",
    buttonState: "reopenAd",
    tabType: "Closed",
  },
  {
    id: 61,
    make: "Suzuki",
    model: "Jimny",
    year: 2022,
    price: 35000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "closed",
    buttonState: "reopenAd",
    tabType: "Closed",
  },
  {
    id: 62,
    make: "Isuzu",
    model: "D-Max",
    year: 2022,
    price: 40000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "closed",
    buttonState: "reopenAd",
    tabType: "Closed",
  },
  {
    id: 63,
    make: "Mahindra",
    model: "Thar",
    year: 2022,
    price: 30000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "closed",
    buttonState: "reopenAd",
    tabType: "Closed",
  },

  // Request Tab Cars (18 cars = 2 pages)
  {
    id: 64,
    make: "Land Rover",
    model: "Range Rover",
    year: 2023,
    price: 85000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "completed",
    dealType: "sell",
    buttonState: "closeRequest",
    tabType: "Request",
  },
  {
    id: 65,
    make: "Genesis",
    model: "G80",
    year: 2022,
    price: 58000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "completed",
    dealType: "buy",
    buttonState: "closeRequest",
    tabType: "Request",
  },
  {
    id: 66,
    make: "Acura",
    model: "MDX",
    year: 2023,
    price: 52000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "completed",
    buttonState: "reopenRequest",
    tabType: "Request",
  },
  {
    id: 67,
    make: "Infiniti",
    model: "QX60",
    year: 2022,
    price: 48000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "completed",
    buttonState: "reopenRequest",
    tabType: "Request",
  },
  {
    id: 68,
    make: "Lincoln",
    model: "Aviator",
    year: 2023,
    price: 62000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "completed",
    buttonState: "closeRequest",
    tabType: "Request",
  },
  {
    id: 69,
    make: "Cadillac",
    model: "Escalade",
    year: 2022,
    price: 78000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "completed",
    buttonState: "closeRequest",
    tabType: "Request",
  },
  {
    id: 70,
    make: "Bentley",
    model: "Bentayga",
    year: 2023,
    price: 180000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "completed",
    buttonState: "closeRequest",
    tabType: "Request",
  },
  {
    id: 71,
    make: "Rolls-Royce",
    model: "Cullinan",
    year: 2023,
    price: 350000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "completed",
    buttonState: "closeRequest",
    tabType: "Request",
  },
  {
    id: 72,
    make: "Mercedes",
    model: "Maybach",
    year: 2023,
    price: 200000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "completed",
    buttonState: "closeRequest",
    tabType: "Request",
  },
  {
    id: 73,
    make: "Lexus",
    model: "LX",
    year: 2023,
    price: 95000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "completed",
    buttonState: "closeRequest",
    tabType: "Request",
  },
  {
    id: 74,
    make: "Infiniti",
    model: "QX80",
    year: 2023,
    price: 85000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "completed",
    buttonState: "closeRequest",
    tabType: "Request",
  },
  {
    id: 75,
    make: "Cadillac",
    model: "Escalade",
    year: 2023,
    price: 78000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "completed",
    buttonState: "closeRequest",
    tabType: "Request",
  },
  {
    id: 76,
    make: "Lincoln",
    model: "Navigator",
    year: 2023,
    price: 82000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "completed",
    buttonState: "closeRequest",
    tabType: "Request",
  },
  {
    id: 77,
    make: "GMC",
    model: "Yukon",
    year: 2023,
    price: 75000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "completed",
    buttonState: "closeRequest",
    tabType: "Request",
  },
  {
    id: 78,
    make: "Chevrolet",
    model: "Suburban",
    year: 2023,
    price: 72000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "completed",
    buttonState: "closeRequest",
    tabType: "Request",
  },
  {
    id: 79,
    make: "Toyota",
    model: "Sequoia",
    year: 2023,
    price: 68000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "completed",
    buttonState: "closeRequest",
    tabType: "Request",
  },
  {
    id: 80,
    make: "Nissan",
    model: "Armada",
    year: 2023,
    price: 65000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "completed",
    buttonState: "closeRequest",
    tabType: "Request",
  },
];

// Update the dummyTradeDeals to use status values for badges
const dummyTradeDeals = [
  // My Trade Proposals (first tab)
  {
    id: 1,
    make: "Toyota",
    model: "Camry",
    year: 2023,
    price: 25000,
    image:
      "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&w=400",
    status: "active",
    buttonState: "pending",
    tradeWith: "Honda Civic 2022",
    tabType: "My Trade Proposals",
    isTraded: false,
    tradeAmount: 5000,
  },
  {
    id: 2,
    make: "BMW",
    model: "X5",
    year: 2022,
    price: 55000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "pending",
    buttonState: "accepted",
    tradeWith: "Mercedes GLE 2023",
    tabType: "My Trade Proposals",
    isTraded: true,
    tradeAmount: 0,
  },

  // Deals Received (second tab)
  {
    id: 10,
    make: "Honda",
    model: "Civic",
    year: 2022,
    price: 22000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "active", // Status badge
    buttonState: "pending",
    tradeWith: "Toyota Corolla 2023",
    tabType: "Deals Received",
  },
  {
    id: 11,
    make: "Mercedes",
    model: "GLE",
    year: 2023,
    price: 65000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "closed", // Status badge
    buttonState: "accepted",
    tradeWith: "BMW X5 2022",
    tabType: "Deals Received",
  },
  // ... more Deals Received items ...
];

// First, update the dummy offers data to include the correct buttonState
const dummyOffers = [
  // My Listings (offers received)
  {
    id: 1,
    make: "Toyota",
    model: "Camry",
    year: 2023,
    price: 25000,
    image:
      "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&w=400",
    status: "pending",
    buttonState: "viewOffers",
    offerAmount: 23000,
    offerDate: "2024-03-15",
    tabType: "My Listings",
  },
  {
    id: 2,
    make: "Honda",
    model: "Civic",
    year: 2022,
    price: 22000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "completed",
    buttonState: "viewOffers",
    offerAmount: 21500,
    offerDate: "2024-03-14",
    tabType: "My Listings",
  },
  {
    id: 3,
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 45000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "rejected",
    buttonState: "viewOffers",
    offerAmount: 42000,
    offerDate: "2024-03-13",
    tabType: "My Listings",
  },

  // My Offers (offers made)
  {
    id: 4,
    make: "BMW",
    model: "X5",
    year: 2022,
    price: 55000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "pending",
    buttonState: "pending",
    offerAmount: 52000,
    offerDate: "2024-03-15",
    tabType: "My Offers",
  },
  {
    id: 5,
    make: "Mercedes",
    model: "C-Class",
    year: 2023,
    price: 48000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "completed",
    buttonState: "completed",
    offerAmount: 46000,
    offerDate: "2024-03-14",
    tabType: "My Offers",
  },
  {
    id: 6,
    make: "Audi",
    model: "A4",
    year: 2022,
    price: 42000,
    image:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400",
    status: "rejected",
    buttonState: "rejected",
    offerAmount: 40000,
    offerDate: "2024-03-13",
    tabType: "My Offers",
  },
];

const Account = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [tabFade, setTabFade] = useState(false);
  const [postAdFade, setPostAdFade] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMainTab, setActiveMainTab] = useState("My Ads");
  const itemsPerPage = 9;

  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get("view");
  const dealId = searchParams.get("id");
  const [, location] = useLocation();
  const isMobile =useMobileDevice();

  // Calculate total pages based on filtered cars
  const filteredCars = dummyCars.filter(
    (car) => car?.tabType === tabList?.[selectedTab]
  );
  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Update the getCurrentPageItems function to explicitly return Car[]
  const getCurrentPageItems = (): Car[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCars.slice(startIndex, endIndex) as Car[];
  };

  // Update the handleTabChange function
  const handleTabChange = (index: number) => {
    setContentFade(true);
    // Clear query parameters when changing tabs
    setSearchParams({});
    setTimeout(() => {
      setSelectedTab(index);
      setContentFade(false);
    }, 300);
  };

  // Update the handleMainTabChange function
  const handleMainTabChange = (tab: string) => {
    setContentFade(true);
    // Clear query parameters when changing main tabs
    setSearchParams({});
    setTimeout(() => {
      setActiveMainTab(tab);
      setContentFade(false);
    }, 300);
  };

  // Add new state for request modal
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  // Update handlePostAdClick
  const handlePostAdClick = () => {
    if (selectedTab === 3) {
      // Request tab
      setIsRequestModalOpen(true);
    } else {
      setPostAdFade(true);
      setTimeout(() => {
        setPostAdFade(false);
        // Navigate to post ad page
        location("/post-ad");
      }, 300);
    }
  };

  // Update the handlers for request type selection
  const handleSellRequest = () => {
    setIsRequestModalOpen(false);
    // Navigate to post-ad page with sell request type
    location("/post-ad?requestType=sell");
  };

  const handleBuyRequest = () => {
    setIsRequestModalOpen(false);
    // Navigate to post-ad page with buy request type
    location("/post-ad?requestType=buy");
  };

  // Add new state for modal
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  // Add handler for profile edit
  const handleEditProfile = () => {
    setIsEditProfileOpen(true);
  };

  // Add handler for saving profile changes
  const handleSaveProfile = () => {
    // TODO: Implement save logic
    setIsEditProfileOpen(false);
  };

  // Add handler for password change
  const handleChangePassword = () => {
    // TODO: Implement password change logic
  };

  // Add this state
  const [contentFade, setContentFade] = useState(false);

  // Add new state for Trade Deals
  const [selectedTradeTab, setSelectedTradeTab] = useState(0);
  const [tradeTabFade, setTradeTabFade] = useState(false);
  const [currentTradePage, setCurrentTradePage] = useState(1);

  // Calculate total pages for trade deals
  const filteredTradeDeals = dummyTradeDeals.filter(
    (deal) => deal?.tabType === tradeDealsTabList?.[selectedTradeTab]
  );
  const totalTradePages = Math.ceil(filteredTradeDeals.length / itemsPerPage);

  const handleTradePageChange = (page: number) => {
    setCurrentTradePage(page);
  };

  // Get current page items for trade deals
  const getCurrentTradePageItems = () => {
    const startIndex = (currentTradePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTradeDeals.slice(startIndex, endIndex);
  };

  // Update the handleTradeTabClick function
  const handleTradeTabClick = (index: number) => {
    if (selectedTradeTab !== index) {
      setTradeTabFade(true);
      // Clear query parameters when changing trade tabs
      setSearchParams({});
      setTimeout(() => {
        setSelectedTradeTab(index);
        setTradeTabFade(false);
      }, 300);
    }
  };

  // Update the renderTradeDealContent function
  const renderTradeDealContent = (items: Car[]) => {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap: "24px",
          marginBottom: 32,
        }}
      >
        {items?.map((car) => (
          <ProductCardVariant2
            key={car.id}
            car={car}
            linkUrl={`/car/${car.id}`}
            buttonState={
              tradeDealsTabList[selectedTradeTab] === "Deals Received"
                ? "viewDeals"
                : tradeDealsTabList[selectedTradeTab] === "My Trade Proposals"
                ? "withdrawProposal"
                : (car.buttonState as ButtonState)
            }
            status={car.status as any}
            dealType={car?.dealType}
            tiny={isMobile}
          />
        ))}
      </div>
    );
  };

  // Add new function to handle closing the deal view
  const handleCloseDealView = () => {
    setSearchParams({});
  };

  // Add new state for offers
  const [selectedOfferTab, setSelectedOfferTab] = useState(0);
  const [offerTabFade, setOfferTabFade] = useState(false);
  const [currentOfferPage, setCurrentOfferPage] = useState(1);

  // Update the renderOfferContent function
  const renderOfferContent = (items: any[]) => {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap: "24px",
          marginBottom: 32,
        }}
      >
        {items?.map((item) => {
          const offer = item as Offer;
          return (
            <ProductCardVariant2
              key={offer.id}
              car={{
                id: offer.id,
                make: offer.make,
                model: offer.model,
                year: offer.year,
                price: offer.price,
                image: offer.image,
                tabType: offer.tabType,
              }}
              linkUrl={`/car/${offer.id}`}
              buttonState={
                offersTabList[selectedOfferTab] === "My Listings"
                  ? "viewOffers"
                  : "withdrawOffer"
              }
              status={offer.status as any}
              disabled={offer.status !== "pending"}
              offerDetails={{
                amount: offer.offerAmount,
                date: offer.offerDate,
              }}
              tiny={isMobile}
            />
          );
        })}
      </div>
    );
  };

  // Update the renderTabContent function to handle the offers view
  const renderTabContent = () => {
    // If we're viewing a deal or offer, show the details view
    if (view === "deal" && dealId) {
      return (
        <DealDetailsView
          onCloseTrade={handleCloseDealView}
          onViewProductDetails={() => {
            location(`/trade-car/sellers/${"5"}/cars/${"1"}`);
          }}
          sellerId={"5"}
          carId={"1"}
        />
      );
    }

    if (view === "offers" && dealId) {
      return (
        <OfferDetailsView
          onCloseOffer={handleCloseDealView}
          onViewProductDetails={() => {
            location(`/trade-car/sellers/5/cars/1`);
          }}
          sellerId={"5"}
          carId={"1"}
        />
      );
    }

    // Otherwise, show the regular tab content
    switch (activeMainTab) {
      case "My Ads":
        return (
          <div
            className="opacity-100 transition-opacity duration-300 ease-in-out"
            style={{
              opacity: contentFade ? 0 : 1,
            }}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 mb-8 md:mb-8">
              <div className="flex gap-[10px] text-3xl md:text-[40px] font-normal text-black">
                My <span className="text-[#AF8C32]">Ads</span>
              </div>
              <div className="w-full flex justify-center md:justify-end">
                <button
                  className="w-[331px] md:w-[216px] h-11 bg-[#003A2F] text-white border border-[#003A2F] rounded-md font-light text-base cursor-pointer flex items-center justify-center gap-2 px-5 transition-opacity duration-300 ease-in-out"
                  style={{
                    opacity: postAdFade ? 0 : 1,
                  }}
                  onClick={handlePostAdClick}
                >
                  <img src={Plus} alt="Plus icon" />
                  <span>{selectedTab === 3 ? "Add Request" : "Post Ad"}</span>
                </button>
              </div>
            </div>
            <div className="w-full">
              <TabSection
                tabList={tabList}
                selectedTab={selectedTab}
                tabFade={tabFade}
                currentPage={currentPage}
                totalPages={totalPages}
                getCurrentPageItems={getCurrentPageItems}
                onTabClick={handleTabChange}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        );
      case "Trade Deals":
        return (
          <div
            style={{
              opacity: contentFade ? 0 : 1,
              transition: "opacity 300ms ease-in-out",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 32,
              }}
            >
              <div style={{ fontWeight: 400, fontSize: 40, color: "#000000" }}>
                Trade <span style={{ color: "#AF8C32" }}>Deals</span>
              </div>
            </div>
            <TabSection
              tabList={tradeDealsTabList}
              selectedTab={selectedTradeTab}
              tabFade={tradeTabFade}
              currentPage={currentTradePage}
              totalPages={totalTradePages}
              getCurrentPageItems={getCurrentTradePageItems}
              onTabClick={handleTradeTabClick}
              onPageChange={handleTradePageChange}
              renderCustomContent={renderTradeDealContent}
              hidePagination={
                tradeDealsTabList[selectedTradeTab] === "Deals Received"
              }
            />
          </div>
        );
      case "Offers":
        return (
          <div
            style={{
              opacity: contentFade ? 0 : 1,
              transition: "opacity 300ms ease-in-out",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 32,
              }}
            >
              <div style={{ fontWeight: 400, fontSize: 40, color: "#000000" }}>
                My <span style={{ color: "#AF8C32" }}>Offers</span>
              </div>
            </div>
            <TabSection
              tabList={offersTabList}
              selectedTab={selectedOfferTab}
              tabFade={offerTabFade}
              currentPage={currentOfferPage}
              totalPages={Math.ceil(
                dummyOffers.filter(
                  (offer) => offer.tabType === offersTabList[selectedOfferTab]
                ).length / itemsPerPage
              )}
              getCurrentPageItems={() => {
                const startIndex = (currentOfferPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                return dummyOffers
                  .filter(
                    (offer) => offer.tabType === offersTabList[selectedOfferTab]
                  )
                  .slice(startIndex, endIndex)
                  .map((offer) => ({
                    ...offer,
                    buttonState: offer.buttonState,
                  }));
              }}
              onTabClick={(index) => {
                setOfferTabFade(true);
                setSearchParams({});
                setTimeout(() => {
                  setSelectedOfferTab(index);
                  setOfferTabFade(false);
                }, 300);
              }}
              onPageChange={setCurrentOfferPage}
              renderCustomContent={renderOfferContent}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <AccountHero
        onEditProfile={handleEditProfile}
        onTabChange={handleMainTabChange}
      />
      <div
        style={{ maxWidth: 1200, margin: "40px auto 0 auto", width: "100%" }}
      >
        {renderTabContent()}
      </div>

      {/* Update the Edit Profile Modal */}
      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:max-w-[633px] rounded-[34px] bg-[#F8F8F8]"
          style={{
            width: 633,
            height: 500,
            padding: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Fixed Header */}
          <div className="flex items-center justify-between px-[42px] py-4">
            <DialogTitle
              className="text-2xl font-semibold"
              style={{
                fontWeight: 600,
                fontSize: "24px",
                letterSpacing: "1%",
                color: "#000000",
              }}
            >
              Edit Profile
            </DialogTitle>
          </div>

          {/* Scrollable Content */}
          <div
            className="overflow-y-auto px-[42px] pb-[45px] flex-1"
            style={{
              maxHeight: "calc(645px - 80px)", // Adjust based on header height
            }}
          >
            <div className="grid gap-6 py-4">
              {/* Profile Image Upload with Edit Icon */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="w-[133px] h-[133px] rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-2xl text-gray-500">U</span>
                  </div>
                  <button
                    className="absolute bottom-0 right-0 w-8 h-8 flex items-center justify-center text-white"
                    onClick={() => {
                      /* TODO: Implement image upload */
                    }}
                  >
                    <img
                      src={EditIcon2}
                      alt="Edit"
                      style={{ width: 20, height: 20, display: "block" }}
                    />
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="First Name"
                  value={profileData.firstName}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      firstName: e.target.value,
                    })
                  }
                  style={{
                    width: 263,
                    height: 40,
                    padding: "10px 16px",
                    borderRadius: 6,
                    border: "1px solid #CFCFCF",
                    background: "transparent",
                  }}
                />
                <Input
                  placeholder="Last Name"
                  value={profileData.lastName}
                  onChange={(e) =>
                    setProfileData({ ...profileData, lastName: e.target.value })
                  }
                  style={{
                    width: 263,
                    height: 40,
                    padding: "10px 16px",
                    borderRadius: 6,
                    border: "1px solid #CFCFCF",
                    background: "transparent",
                  }}
                />
              </div>

              {/* Phone Number with Country Selector */}
              <CustomPhoneInput
                value={profileData.phone}
                onChange={(phone) => setProfileData({ ...profileData, phone })}
              />

              {/* Email Input */}
              <Input
                placeholder="Email"
                type="email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
                className="w-full"
                style={{
                  height: 40,
                  padding: "10px 16px",
                  borderRadius: 6,
                  border: "1px solid #CFCFCF",
                  background: "transparent",
                }}
              />

              {/* Password Label, Input, and Button */}
              <div>
                <div className="flex items-center gap-2">
                  {/*    <Input
                    id="password" // Add id to link with label
                    placeholder="********" // Updated placeholder to match image
                    type="password"
                    value={profileData.password}
                    onChange={(e) =>
                      setProfileData({ ...profileData, password: e.target.value })
                    }
                    className="flex-1" // Allow input to grow and take remaining space
                    style={{
                      height: 40,
                      padding: "10px 16px",
                      borderRadius: 6,
                      border: "1px solid #CFCFCF",
                      background: "transparent",
                    }}
                  /> */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                      width: "100%",
                    }}
                  >
                    <Label
                      htmlFor="password"
                      className="mb-2 block text-base font-normal text-black"
                      style={{
                        fontWeight: 400,
                        fontSize: 16,
                        lineHeight: "100%",
                        letterSpacing: "0%",
                        color: "#000000",
                        marginBottom: 8, // Add some space below the label
                      }}
                    >
                      Password
                    </Label>
                    <div
                      style={{
                        fontFamily: "Open Sans",
                        fontWeight: 400,
                        fontSize: 14,
                        lineHeight: "100%",
                        letterSpacing: "0%",
                        color: "#747474",
                      }}
                    >
                      *********
                    </div>
                  </div>
                  <button
                    onClick={handleChangePassword}
                    style={{
                      width: 189, // Keep button fixed width
                      height: 40,
                      padding: "0 20px", // Padding inside the button
                      borderRadius: 6,
                      border: "1px solid #000000",
                      color: "#000000",
                      fontFamily: "Gilroy-Regular",
                      fontWeight: 400,
                      fontSize: 16,
                      lineHeight: "100%",
                      letterSpacing: 0,
                      background: "transparent",
                      cursor: "pointer",
                      flexShrink: 0, // Prevent button from shrinking
                    }}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4">
              {" "}
              {/* Container for Save Changes button */}
              <button
                onClick={handleSaveProfile}
                className="px-6 py-2 text-sm text-white bg-primary rounded-md hover:bg-primary/90 w-full" // Added w-full utility class
                style={{ height: 40 }} // Ensure height is consistent with other inputs/buttons
              >
                Save Changes
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <RequestTypeModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onSellClick={handleSellRequest}
        onBuyClick={handleBuyRequest}
      />

      <Footer />
    </>
  );
};

export default Account;
