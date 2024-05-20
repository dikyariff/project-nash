import { UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";

const Home = () => {
  return ( 
    <UserButton afterSignOutUrl="/" />
  );
}

export default Home;