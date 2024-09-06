import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getRazorPayId, purchaseCourseBundle, verifyUserPayment } from "../../Redux/Slices/RazorpaySlice"; 
import toast from 'react-hot-toast';
import HomeLayout from "../../Layouts/HomeLayout"
import { BiRupee } from 'react-icons/bi';

function Checkout() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const razorpaykey = useSelector((state) => state?.rozarpay?.key);
    const subscriptionId = useSelector((state) => state?.rozarpay?.subscriptionId);
    const userData =  useSelector((state) => state?.auth?.data);
    const paymentDetails = {
        paymentId: "",
        subscriptionId: "",
        signature: ""
    }
    
    async function handleSubscription(e) {
        e.preventDefault();      
        if (!subscriptionId || !razorpaykey) {
            toast.error("Something went wrong");
            return;
        }

        const options = {
            key: razorpaykey,
            subscription_id: subscriptionId, 
            name: "Coursify Pvt. Ltd.",
            description: "Subscription",
            
            theme: {
                color: '#F37254'
            },
            prefill: {
                email: userData.email,
                name: userData.fullName
            },
            handler: async function (response) {            
                paymentDetails.paymentId = response.razorpay_payment_id;
                paymentDetails.subscriptionId = response.razorpay_subscription_id;
                paymentDetails.signature = response.razorpay_signature;

                toast.success("Payment Successful");

                const respon = await dispatch(verifyUserPayment(paymentDetails));
                
                if (respon?.payload?.success) {
                                        
                    navigate("/checkout/success");
                } else {
                    navigate("/checkout/fail");
                }
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    async function load() {
        await dispatch(getRazorPayId());
        await dispatch(purchaseCourseBundle());
        
               
    }


    useEffect(() => {
        load();
    }, []); 

    return (
        <HomeLayout>
            <form 
                onSubmit={handleSubscription}
                className='min-h-[90vh] flex items-center justify-center text-white'>
                <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
                    <h1 className='bg-yellow-500 absolute top-0 w-full text-center p-4 text-2xl font-bold rounded-tr-lg rounded-tl-lg'>
                        Subscription Bundle
                    </h1>
                    <div className='px-4 space-y-5 text-center '>
                        <p className='text-[17px]'>This purchase will allow you to access all the available courses of our platform for {" "}
                            <span className='text-yellow-500 font-bold'> 
                                <br />
                                Next 3 Months
                            </span> {" "}
                            All the existing and upcoming courses will also be available.
                        </p>
                        <p className='flex items-center justify-center gap-1 text-2xl text-yellow-500 font-bold'>
                            <BiRupee/> <span>100</span> only
                        </p>
                        <div className='text-gray-200'>
                            <p>100% refund on cancellation</p>
                            <p>* Terms and conditions apply</p>
                        </div>
                        <button type='submit' className='bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute w-full bottom-0 left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2'>
                            Buy Now
                        </button>
                    </div>
                </div>
            </form>
        </HomeLayout>
    )
}

export default Checkout;