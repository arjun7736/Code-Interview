import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";
import { CheckIcon } from "lucide-react";

const includedFeatures = [
  "You Can add Unlimited Questions ",
  "You can add Morethan 2 Interviewers",
];

const UpgradePlan = ({ isOpen, onClose }) => {
  const comapny = localStorage.getItem("company_token");
  const data = JSON.parse(comapny);

  const makePayment = async () => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);
    
    const { data: { id: sessionId } } = await axios.post("/api/company/buy-premium", data);
    console.log('Session ID:', sessionId);
    const result = await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <>
      {
        <Modal isOpen={isOpen} backdrop="transparent" placement="top-center">
          <ModalContent>
            <div className="bg-white py-8 sm:py-12">
              <div className="mx-auto max-w-lg px-6 lg:px-8">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 text-center mb-6">
                  Lifetime membership
                </h3>
                <div className="flex items-center gap-x-4 mt-6 mb-8">
                  <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                    What’s included
                  </h4>
                  <div className="h-px flex-auto bg-gray-100" />
                </div>
                <ul className="grid grid-cols-1 gap-2 text-sm leading-6 text-gray-600">
                  {includedFeatures.map((feature) => (
                    <li key={feature} className="flex items-center gap-x-2">
                      <CheckIcon className="h-4 w-4 text-indigo-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 sm:flex sm:justify-center">
                  <div className="flex items-center justify-center w-full sm:w-auto">
                    <p className="text-base font-semibold text-gray-600 mr-2">
                      Pay once, own it forever
                    </p>
                    <p className="text-2xl font-bold tracking-tight text-gray-900">
                      $349{" "}
                      <span className="text-sm font-semibold text-gray-600">
                        USD
                      </span>
                    </p>
                  </div>
                  <Button
                    color="primary"
                    onClick={makePayment}
                    className="mt-6 sm:mt-0 sm:ml-4"
                  >
                    Get access
                  </Button>
                </div>
              </div>
            </div>
          </ModalContent>
        </Modal>
      }
    </>
  );
};

export default UpgradePlan;
