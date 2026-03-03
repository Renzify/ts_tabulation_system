import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-cyan-700 hover:text-cyan-900 transition-colors font-medium"
    >
      <ArrowLeft size={18} />
      Back
    </button>
  );
}

export default BackButton;
