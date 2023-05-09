import { useStoreUser } from "../../hooks";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function Home(){
  const {user} = useStoreUser();
  return (<DashboardLayout>
  </DashboardLayout>)
}