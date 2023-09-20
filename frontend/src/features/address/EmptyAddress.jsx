import BreadCrumbNav from "../../ui/BreadCrumbNav";
import Container from "../../ui/Container";
import EmptyList from "../../ui/EmptyList";

export default function EmptyAddress({ onClick, inTrash }) {
  return (
    <Container>
      {!inTrash && (
        <BreadCrumbNav
          navLinks={[
            { name: "My Account", linkTo: "/my-profile", type: "link" },
          ]}
          currentPageName="Addresses"
        />
      )}

      {inTrash && (
        <BreadCrumbNav
          navLinks={[
            { name: "Settings", linkTo: "/settings", type: "link" },
            { name: "Trash", linkTo: "/trash", type: "link" },
          ]}
          currentPageName="Addresses"
        />
      )}

      {/* If there are empty addresses */}
      {!inTrash && (
        <EmptyList
          iconSrc="icons/empty-address.svg"
          heading="save your addresses now"
          description="Add your home and office addresses and enjoy faster checkout"
          btnText="+add new address"
          onClick={onClick}
          hasActionButton
        />
      )}

      {/* If there are empty addresses in trash */}
      {inTrash && (
        <EmptyList
          iconSrc="icons/empty-address.svg"
          heading="No addresses in trash"
          description="No addresses currently in the trash. Deleted addresses find their place here"
        />
      )}
    </Container>
  );
}
