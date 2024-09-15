import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function DropdownMenuDemo({ signOut }: any) {
	const navigate = useRouter();

	const goToProfile = () => {
		navigate.push("/profile");
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="bg-background text-foreground hover:bg-background focus-visible:ring-0 border-none focus:ring-0 focus:outline-none shadow-none outline-none">
					<img
						src={"assets/p1.jpg"}
						alt=""
						className="w-8 h-8 rounded-full cursor-pointer"
					/>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<button onClick={goToProfile} className="w-full text-start">
							Profile
						</button>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuItem>
					<button onClick={signOut} className="w-full text-start">
						Sign out
					</button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
