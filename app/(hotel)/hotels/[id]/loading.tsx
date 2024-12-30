import Spinner from "@/components/ui/Spinner";

const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Spinner className="w-12 h-12 border-t-primary" />
    </div>
  );
};

export default Loading;
