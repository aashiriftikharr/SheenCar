import React from "react";
import ProductCardVariant2, {
  ButtonState,
} from "@/components/cards/product-card-variant-2";
import Pagination2 from "@/components/ui/pagination2";

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
  status: string;
  buttonState: string;
  dealType?: "sell" | "buy";
}

interface TabSectionProps {
  tabList: string[];
  selectedTab: number;
  tabFade: boolean;
  currentPage: number;
  totalPages: number;
  getCurrentPageItems: () => Car[];
  onTabClick: (index: number) => void;
  onPageChange: (page: number) => void;
  renderCustomContent?: (items: Car[]) => React.ReactNode;
  hidePagination?: boolean;
}

const TabSection: React.FC<TabSectionProps> = ({
  tabList,
  selectedTab,
  tabFade,
  currentPage,
  totalPages,
  getCurrentPageItems,
  onTabClick,
  onPageChange,
  renderCustomContent,
  hidePagination = false,
}) => {
  // Add function to get status based on tab
  const getStatusForTab = (
    tab: string
  ): "active" | "completed" | "closed" | "pending" => {
    switch (tab) {
      case "Active":
        return "active";
      case "Pending":
        return "pending";
      case "Closed":
        return "closed";
      case "Request":
        // For Request tab, we'll need to determine status based on buttonState
        return "completed"; // Default for Request tab
      default:
        return "active";
    }
  };

  return (
    <>
      {/* Tab Buttons */}
      <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
        {tabList?.map((tab, idx) => (
          <button
            key={tab}
            onClick={() => onTabClick(idx)}
            style={{
              width: 210,
              height: 44,
              borderRadius: 24,
              border: "0.7px solid #003A2F",
              background: selectedTab === idx ? "#003A2F" : "#fff",
              color: selectedTab === idx ? "#fff" : "#003A2F",
              fontWeight: 500,
              fontSize: 18,
              paddingRight: 20,
              paddingLeft: 20,
              cursor: "pointer",
              transition: "background 0.3s, color 0.3s",
              outline: "none",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div
        style={{
          minHeight: 120,
          transition: "opacity 300ms ease-in-out",
          opacity: tabFade ? 0 : 1,
        }}
      >
        {renderCustomContent ? (
          renderCustomContent(getCurrentPageItems())
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
              marginBottom: 32,
            }}
          >
            {getCurrentPageItems()?.map((car) => (
              <ProductCardVariant2
                key={car.id}
                car={car}
                linkUrl={`/car/${car.id}`}
                buttonState={car.buttonState as ButtonState}
                status={car.status as "active" | "completed" | "closed" | "pending" | "rejected"}
                dealType={car?.dealType}
              />
            ))}
          </div>
        )}
        <Pagination2
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};

export default TabSection;
