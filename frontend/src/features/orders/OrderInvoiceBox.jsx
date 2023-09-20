import { useNavigate } from "react-router";
import { useState } from "react";

import ConfirmationModal from "../../ui/ConfirmationModal";
import Button from "../../ui/Button";

export default function OrderInvoiceBox({ data }) {
  const [invoiceIsOpen, setInvoiceIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 px-3 py-3 shadow-xl">
      <>
        {data.item.details.packer && (
          <>
            <div className="flex flex-col gap-4">
              <p className="text-base font-bold leading-snug text-[#282c35]">
                Sold by: {data.item.details.packer}
              </p>
              <Button onClick={() => setInvoiceIsOpen(true)} secondaryButton>
                GET INVOICE
              </Button>
            </div>
            {invoiceIsOpen && (
              <ConfirmationModal
                modalHeading="We're sorry :("
                modalIsOpen={invoiceIsOpen}
                onClose={() => setInvoiceIsOpen(false)}
                modalSubHeading="As a demonstration website, we do not generate product invoices"
                buttons={[
                  {
                    btnText: "Privacy policy",
                    secondaryButton: true,
                    onClick: () => navigate("/privacy-policy"),
                  },
                  {
                    btnText: "Close",
                    onClick: () => setInvoiceIsOpen(false),
                  },
                ]}
              />
            )}
          </>
        )}
      </>
    </div>
  );
}
