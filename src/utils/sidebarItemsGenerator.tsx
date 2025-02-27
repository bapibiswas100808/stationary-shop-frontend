import { NavLink } from "react-router-dom";
import { TSidebarItems, TUserPath } from "../types/sidebar.type";

export const sidebarItemsGenerator = (
  items: TUserPath[],
  role: string
): TSidebarItems[] => {
  return items.map((item) => {
    const sidebarItem: TSidebarItems = {
      key: item.name || "defaultKey",
      label: item.children ? (
        item.name
      ) : (
        <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>
      ),
    };

    if (item.children) {
      sidebarItem.children = item.children.map((child) => ({
        key: child.name || "defaultKey",
        label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
        type: "item",
      }));
    }

    return sidebarItem;
  });
};
