import PageTitle from "../_components/PageTitle";
import { HiOutlineMail } from "react-icons/hi";
import { BsTelephoneFill } from "react-icons/bs";
import Link from "next-intl/link";
import ContactForm from "./ContactForm";
import UseTranslation from "@/helplers/UseTranslation";

const DeliveryPage = () => {


  return (
    <div className="container">
      <PageTitle title={<UseTranslation translate={'title'} namespace={'contact'} />} />
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="margin mb-7 md:mb-0">
          <div className="mb-12 text-2xl font-norms font-bold" style={{color: "#2C334A"}}>
            <UseTranslation translate={'compliment'} namespace={'contact'} />
          </div>
          <div
            className="rounded-[10px] p-3 w-fit flex items-center gap-5 mb-7"
            style={{ backgroundColor: "#F8F9FF" }}
          >
            <HiOutlineMail />
            <p>team@carspace.uz</p>
          </div>
          <div
            className="rounded-[10px] p-3 w-fit flex items-center gap-5 mb-7"
            style={{ backgroundColor: "#F8F9FF" }}
          >
            <BsTelephoneFill />
            <Link href="tel:+998 (95) 822-82-88" className="text-underline">
              +998 (95) 822-82-88
            </Link>
          </div>
          <div
            className="rounded-[10px] p-3 w-fit flex items-center gap-5"
            style={{ backgroundColor: "#F8F9FF" }}
          >
            <BsTelephoneFill />
            <Link href="tel:+998 (97) 178-77-90" className="text-underline">
              +998 (97) 178-77-90
            </Link>
          </div>
        </div>
        <div className="rounded-[8px] productCard px-4 py-7 md:p-12">
            <ContactForm
              label={<UseTranslation translate={'contactUs'} namespace={'contact'} />}
              button={<UseTranslation translate={'send'} namespace={'buttons'} />}
            />
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
