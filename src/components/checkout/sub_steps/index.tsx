import { type THeadStepItem } from "../CheckoutHome";
import { ArrowLeft } from "lucide-react";
import TransportInfo from "./TransportInfo";
import AdressDetail from "./AdressDetail";
// import BookShipment from "./BookShipment";

type TSubProps = {
  items: THeadStepItem[];
  starterTrigger: () => void;
  setSubSteps: React.Dispatch<React.SetStateAction<THeadStepItem[]>>;
  enqdata:any
};

const index = ({ starterTrigger, setSubSteps, items, enqdata }: TSubProps) => {
  const activeStep = items.find((item) => item.status === "process");
  const findIndex = items.findIndex((item) => item.title === activeStep?.title);

  const nextAction = (activeStep?: THeadStepItem) => {
    setSubSteps((prev) => {
      const nextActive = items[findIndex + 1];

      const finalUpdate: THeadStepItem[] = prev.map((item) => {
        if (item.title === activeStep?.title) {
          return { ...item, status: "finish" };
        }
        if (nextActive.title === item.title) {
          return { ...item, status: "process" };
        }
        return item;
      });
      // localStorage.setItem("step-assets", JSON.stringify(finalUpdate));
      return finalUpdate;
    });
  };

  const prevAction = () => {
    setSubSteps((prev) => {
      const prevActive = items[findIndex - 1];
      const finalUpdate: THeadStepItem[] = prev.map((item) => {
        if (prevActive.title === item.title) {
          return { ...item, status: "process" };
        }
        return {
          ...item,
          status: item.status === "process" ? "wait" : item.status,
        };
      });
      localStorage.setItem("step-assets", JSON.stringify(finalUpdate));
      return finalUpdate;
    });
  };

  return (
    <div className="relative animate-slide-right-to-left">
       <div
        onClick={() =>
          activeStep?.title === "Transport" ? starterTrigger() : prevAction()
        }
        className="absolute top-0 -left-12 w-8 h-8 border rounded-full flex items-center justify-center cursor-pointer hover:bg-secondary max-sm:relative max-sm:left-0 mb-4"
      >
        <ArrowLeft width={18} />
      </div>

      <div className="space-y-5">
        <div>
          <div className="font-medium text-lg">
            {activeStep?.title === "Delivery" || activeStep?.title === "Pickup"
              ? `Vehicle`
              : ``}{" "}
            {activeStep?.title}
          </div>
          {activeStep?.title === "Transport" && (
            <div className="text-muted-foreground font-light">
              A counle more snecitics we want to det eventhing riaht.
            </div>
          )}
        </div>

        {activeStep?.title === "Transport" && (
          <TransportInfo
            transportId={enqdata?.data?.attributes?.checkout?.data?.id}
            toNext={() => nextAction(activeStep)}
            // activeStep={activeStep}
          />
        )}

        {activeStep?.title === "Pickup" && (
          <AdressDetail
            addressType="Pickup"
            addressId={enqdata?.data?.attributes?.pickup_address_detail?.data?.id}
            toNext={() => nextAction(activeStep)}
            // activeStep={activeStep}
          />
        )}

        {activeStep?.title === "Delivery" && (
          <AdressDetail
            addressType="Delivery"
            addressId={enqdata?.data?.attributes?.delivery_address_detail?.data?.id}
            orderId={enqdata?.data?.attributes?.order?.data?.id}
            toNext={() => nextAction(activeStep)}
            // activeStep={activeStep}
          />
        )}
      </div>
    </div>
  );
};

export default index;
