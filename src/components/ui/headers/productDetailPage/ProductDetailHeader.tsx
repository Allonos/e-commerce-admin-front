import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const ProductDetailHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="h-19.25 items-center flex px-4 gap-4 border-b border-[#3030303d] ">
      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer flex items-center gap-2 group"
      >
        <ArrowLeft
          width={20}
          height={20}
          className="text-[#717182] group-hover:text-[#000000] transition-all duration-300"
        />
        <h4 className="text-[#717182] text-[16px] group-hover:text-[#000000] transition-all duration-300">
          Go Back
        </h4>
      </div>
    </div>
  );
};

export default ProductDetailHeader;
