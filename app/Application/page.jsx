"use client";
import { ActiveComponentWrapper } from "@/context/app/ActiveComponentContext";
import { useContext } from "react";
import Create from "../../components/App Components/Create";
import Home from "../../components/App Components/Home";
import Posts from "../../components/App Components/Posts";
import Stats from "../../components/App Components/Stats";
import Subscribers from "../../components/App Components/Subscribers";

const page = () => {
  const { activeComponent, setactiveComponent } = useContext(
    ActiveComponentWrapper
  );

  const renderComponent = () => {
    switch (activeComponent) {
      case "Create":
        return <Create />;

      case "Home":
        return <Home setactiveComponent={setactiveComponent} />;

      case "Posts":
        return <Posts />;

      case "Subscribers":
        return <Subscribers />;

      case "Stats":
        return <Stats />;
      default:
        return "Home";
    }
  };
  return (
    <>
      <div className="min-h-screen overflow-y-auto sm:min-h-0 sm:overflow-y-visible">
        {renderComponent()}
      </div>
    </>
  );
};

export default page;
