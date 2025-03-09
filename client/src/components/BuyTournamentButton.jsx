import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useCreateOrderMutation } from "@/features/api/purchaseApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const BuyTournamentButton = ({ tournamentId }) => {
  const [createOrder, {data, isLoading, isSuccess, isError, error }] =
  useCreateOrderMutation();

  const purchaseTournamentHandler = async () => {
    await createOrder(tournamentId);
  };

  useEffect(()=>{
    if(isSuccess){
       if(data?.url){
        window.location.href = data.url; // Redirect to stripe checkout url
       }else{
        toast.error("Invalid response from server.")
       }
    } 
    if(isError){
      toast.error(error?.data?.message || "Failed to create order")
    }
  },[data, isSuccess, isError, error])

  return (
    <Button
      disabled={isLoading}
      onClick={purchaseTournamentHandler}
      className="w-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
          Please wait
        </>
      ) : (
        "Purchase Tournament"
      )}
    </Button>
  );
};

export default BuyTournamentButton;
