import RetroGrid from "@/components/UI/magic-ui/retro-grid";
import AuthCard from "../../components/App Components/AuthCard";

const page = () => {
  return (
    <div className="w-full lg:flex block">
      <AuthCard />
      <div className="w-[60%] hidden lg:block">
        <div className="relative flex gap-2 flex-col h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20 ">
          <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent">
            Myiloai.com
          </span>
          <span className="font-medium text-sm">
            Create stunning newsletters with AI in seconds
          </span>

          <RetroGrid />
        </div>
      </div>
    </div>
  );
};

export default page;
