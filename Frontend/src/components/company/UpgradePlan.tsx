import { RootState } from '@/redux/store';
import React from 'react'
import { useSelector } from 'react-redux';
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { CheckIcon } from 'lucide-react';


const includedFeatures = [
  "You Can add Unlimited Questions ",
  "You can add Morethan 2 Interviewers",
];
const UpgradePlan:React.FC<Props> = ({isOpen,onClose}) => {

const{companyData}=useSelector((state:RootState)=>state.company)
  const makePayment = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);
      const response = await axios.post("https://electronix.today/api/company/buy-premium", companyData);

      const sessionId = response.data.sessionId;

      await stripe?.redirectToCheckout({
        sessionId: sessionId,
      });
    } catch (error) {
      toast("Error making payment");
    }
  };

  return (
    <>
     {  isOpen && (
          <div
            className="fixed z-10 overflow-y-auto top-0 w-full left-0 "
            id="modal"
          >
            <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-900 opacity-75" />
              </div>
                <div
                  className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                >
                  <h3 className="text-2xl font-bold tracking-tight text-gray-900 text-center mb-6">
                   Lifetime membership
                </h3>
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <ul className="grid grid-cols-1 gap-2 text-sm leading-6 text-gray-600">
                   {includedFeatures.map((feature) => (
                     <li key={feature} className="flex items-center gap-x-2">
                       <CheckIcon className="h-4 w-4 text-indigo-600" />
                       <span>{feature}</span>
                     </li>
                   ))}
                 </ul>
                  </div>
                  <div className="flex items-center justify-center w-full sm:w-auto">
                     <p className="text-base font-semibold text-gray-600 mr-2">
                       Pay once, own it forever for Just
                     </p>
                     <p className="text-2xl font-bold tracking-tight text-gray-900">
                       &#8377; 1999{" "} INR
                     </p>
                   </div>
                  <div className=" px-4 py-3 text-right">
                    <Button
                      type="submit"
                      className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                      onClick={onClose}
                    >
                   Cancel
                    </Button>
                    <Button
                      className="py-2 px-4 bg-blue-500 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500"
                      onClick={makePayment}
                      type="button"
                    >
                     Upgrade To Premium
                    </Button>
                  </div>
                </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default UpgradePlan

interface Props{
  isOpen:boolean,
  onClose:()=>void
}