import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "./store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

const Navbar = async () => {
    const { userId } = auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const stores = await prismadb.store.findMany({
        where: {
            userId
        }
    })

    return (
        // <div className="border-b">
        //     <div className="flex h-16 items-center px-4">
        //         <StoreSwitcher items={stores} />
        //         <MainNav className="mx-6" />
        //         <div className="ml-auto flex items-center space-x-4">
        //             <UserButton afterSignOutUrl="/" />
        //         </div>
        //     </div>
        // </div>
        <div className="border-b bg-white">
            <div className="container mx-auto flex h-16 items-center px-4">
                {/* Logo or Store Name */}
                <h1 className="text-3xl font-light text-gray-800 mr-4">Essor</h1>

                {/* Main Navigation */}
                <MainNav className="ml-auto mx-6" />
                {/* Store Switcher */}
                <StoreSwitcher items={stores} />
                {/* User Button */}
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>


    );
}

export default Navbar;