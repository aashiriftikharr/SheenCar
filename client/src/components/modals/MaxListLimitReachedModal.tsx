import React from "react";
import CustomModal from "../ui/custom-modal";
import { CustomButton } from "../ui/custom-button";
import CloseAdIcon from "../../assets/ClosedAd.svg";

interface MaxListLimitReachedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  daysActive: number;
}

const MaxListLimitReachedModal: React.FC<MaxListLimitReachedModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  daysActive,
}) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Maximum Active Listings Reached!"
      icon={CloseAdIcon}
    >
      <div className="flex flex-col items-center gap-6 w-[339px]">
        <p
          style={{
            fontFamily: "Poppins",
            fontWeight: 300,
            fontSize: "16px",
            lineHeight: "22px",
            textAlign: "center",
            color: "#585353",
          }}
        >
          You can only have 2 active listings at a time. To post an additional
          car, you'll need to pay a one-time fee of $10 for exceeding your
          active ad limit.
        </p>

        <CustomButton
          customStyles={{
            width: "357px",
            height: "44px",
            borderRadius: "7.27px",
          }}
          onClick={onConfirm}
        >
          Proceed to Pay
        </CustomButton>
      </div>
    </CustomModal>
  );
};

export default MaxListLimitReachedModal;
