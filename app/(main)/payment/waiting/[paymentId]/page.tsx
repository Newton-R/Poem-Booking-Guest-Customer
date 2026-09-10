import {
  PaymentProcessingBlock,
  PaymentProcessingCard,
} from "@/components/payments/ProcessingCard";

const WaitingPage = () => {
  return (
    <div className="py-[calc(var(--nav-height)+24px)]">
      <PaymentProcessingBlock />
    </div>
  );
};

export default WaitingPage;
