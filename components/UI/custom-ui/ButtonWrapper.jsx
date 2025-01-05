import { cn } from "@/utils/utils";
import { Button } from "../shadcn-ui/button";

const GradientButton = ({ children, className, ...props }) => {
  return (
    <Button className={cn(className, "relative overflow-hidden")} {...props}>
      <span
        className={
          "w-full absolute -z-0 top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-seesaw"
        }
      ></span>
      <span
        className={
          "w-full absolute -z-10 top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
        }
      ></span>
      <span className={"relative z-10 flex justify-center items-center"}>
        {children}
      </span>
    </Button>
  );
};

export default GradientButton;
