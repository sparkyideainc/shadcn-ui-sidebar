import { Users, Shirt, ShoppingBag, Package } from "lucide-react";

export const SidebarMenu = [
  {
    label: "Helpdesk",
    icon: Users,
    href: "/helpdesk",
    subitem: [
      {
        label: "Messages",
        href: "/helpdesk/messages",
      },
      {
        label: "Cases",
        href: "/helpdesk/cases",
      },
    ],
  },
  {
    label: "Products",
    icon: Shirt,
    href: "/products",
  },
  {
    label: "Payments",
    icon: Package,
    href: "/payments",
  },
  {
    label: "Listings",
    icon: ShoppingBag,
    href: "/listings",
  },
  {
    label: "Orders",
    icon: Package,
    href: "/orders",
  },
];
