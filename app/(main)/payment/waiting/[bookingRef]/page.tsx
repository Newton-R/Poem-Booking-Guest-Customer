import { SuspensePaymentProcessing } from "@/components/payments/ProcessingCard";

const WaitingPage = () => {
  return (
    <div className="py-[calc(var(--nav-height)+24px)]">
      <SuspensePaymentProcessing />
    </div>
  );
};

export default WaitingPage;
