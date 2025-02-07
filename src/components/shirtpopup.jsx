import React, { useState } from "react";
import Embroidery from "../assets/images/Embroidery.jpeg";
import Print from "../assets/images/print.jpeg";
import PositionPopup from "./shirtpositionpopup";
import AddLogoPopup from "./addlogo";
import AddTextLogoPopup from "./AddTextLogoPopup";
import UploadLogoPopup from "./UploadLogoPopup";

const Popup = ({ onClose, visible }) => {
  const [selectedMethod, setSelectedMethod] = useState("Embroidery");
  const [selectedPosition, setSelectedPosition] = useState("Large Front"); 
  const [showSizePopup, setShowSizePopup] = useState(false);
  const [isAddLogoPopupVisible, setIsAddLogoPopupVisible] = useState(false);
  const [isAddTextLogoPopupVisible, setIsAddTextLogoPopupVisible] = useState(false);
  const [isUploadLogoPopupVisible, setIsUploadLogoPopupVisible] = useState(false);
  const [textLogoDetails, setTextLogoDetails] = useState(null);

  const handleFinishTextLogo = (details) => {
    setTextLogoDetails(details);
    setIsAddTextLogoPopupVisible(false);
    setIsAddLogoPopupVisible(false);
    onClose();
    console.log("Text logo details:", details);
    // Handle the details as needed, e.g., save to state, send to server, etc.
  };
  if (!visible) return null;

  return (
    <>
      {/* Main Popup */}
      {!showSizePopup && !isAddLogoPopupVisible && !isAddTextLogoPopupVisible && !isUploadLogoPopupVisible && (
        <div className="inset-0 flex justify-center items-center absolute bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-96 md:w-[600px]">
            <div className="font-semibold text-xl mb-4 text-center">
              Russell Classic Heavyweight T-Shirt
            </div>
            <div className="text-lg mb-4 text-center">
              Select an application method
            </div>

            <div className="flex justify-between space-x-4">
              {/* Embroidery Option */}
              <div
                className="flex flex-col items-center cursor-pointer w-full p-2 rounded-md"
                onClick={() => setSelectedMethod("Embroidery")}
              >
                <div
                  className={`border-2 ${
                    selectedMethod === "Embroidery"
                      ? "border-orange-500"
                      : "border-transparent"
                  } rounded-md`}
                >
                  <img
                    src={Embroidery}
                    alt="Embroidery"
                    className="object-cover mb-2 rounded-md"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
                <div className="text-lg font-semibold text-center">
                  Embroidery
                </div>
                <div className="text-sm text-gray-500 text-center">
                  Embroidery involves stitching logos onto garments by needle
                  and thread.
                </div>
                {selectedMethod === "Embroidery" && (
                  <div className="mt-2 text-sm text-yellow-500">
                    We Recommend
                  </div>
                )}
              </div>

              {/* Print Option */}
              <div
                className="flex flex-col items-center cursor-pointer w-full p-2 rounded-md"
                onClick={() => setSelectedMethod("Print")}
              >
                <div
                  className={`border-2 ${
                    selectedMethod === "Print"
                      ? "border-orange-500"
                      : "border-transparent"
                  } rounded-md`}
                >
                  <img
                    src={Print}
                    alt="Print"
                    className="object-cover mb-2 rounded-md"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
                <div className="text-lg font-semibold text-center">Print</div>
                <div className="text-sm text-gray-500 text-center">
                  Printing involves pressing logos onto garments using heat.
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={onClose}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
              >
                BACK
              </button>
              <button
                onClick={() => {
                  setShowSizePopup(true);
                  console.log("Selected method:", selectedMethod);
                }}
                className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
              >
                NEXT STEP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SizePopup */}
      {showSizePopup && (
        <PositionPopup
          visible={showSizePopup}
          onClose={() => setShowSizePopup(false)}
          selectedPosition={selectedPosition}
          setSelectedPosition={setSelectedPosition}
          onNext={() => {
            setShowSizePopup(false);
            setIsAddLogoPopupVisible(true);
            console.log("Selected position:", selectedPosition);
          }}
        />
      )}

      {/* AddLogoPopup */}
      {isAddLogoPopupVisible && (
        <AddLogoPopup
          selectedPosition={selectedPosition} // Pass down the selected position
          onBack={() => {
            setIsAddLogoPopupVisible(false);
            setShowSizePopup(true);
          }}
          onNext={() => {
            setIsAddLogoPopupVisible(false);
            setIsAddTextLogoPopupVisible(true);
          }}
          onUpload={() => {
            setIsAddLogoPopupVisible(false);
            setIsUploadLogoPopupVisible(true);
          }}
        />
      )}

      {/* AddTextLogoPopup */}
      {isAddTextLogoPopupVisible && (
        <AddTextLogoPopup
          onBack={() => {
            setIsAddTextLogoPopupVisible(false);
            setIsAddLogoPopupVisible(true);
          }}
          onFinish={handleFinishTextLogo}
        />
      )}

      {/* UploadLogoPopup */}
      {isUploadLogoPopupVisible && (
        <UploadLogoPopup
          onBack={() => {
            setIsUploadLogoPopupVisible(false);
            setIsAddLogoPopupVisible(true);
          }}
        />
      )}
    </>
  );
};

export default Popup;
