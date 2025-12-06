import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from '@clerk/nextjs'
import { onBoardUser } from "@/modules/auth/actions";


export default async function Home() {
  await onBoardUser();
  return (
    <div className="flex justify-center items-center h-screen ">
    <UserButton />
    </div>
  )
}
