import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";

export default function SecondHeader() {
  const isEditActive = useSelector((state) => state.channel.isEditActive);
  const channelInfo = useSelector((state) => state.channel.channelInfo);
  const navItems = [
    {
      title: "Videos",
      slug: "/channel",
      active: !isEditActive,
    },
    {
      title: "Playlist",
      slug: "/playlist",
      active: !isEditActive,
    },
    {
      title: "Tweets",
      slug: `/tweets/${channelInfo?._id}`,
      active: !isEditActive,
    },
    {
      title: "Subscribed",
      slug: `/subscribed/${channelInfo?._id}`,
      active: !isEditActive,
    },
    {
      title: "Personal Information",
      slug: "/personal-info-edit",
      active: isEditActive,
    },
    {
      title: "Channel Information",
      slug: "/channel-info-edit",
      active: isEditActive,
    },
    {
      title: "change Password",
      slug: "/auth-info-edit",
      active: isEditActive,
    },
  ];
  return (
    <>
      <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row justify-around  gap-x-2 overflow-auto border-b-2  border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
        {navItems.map((item) =>
          item.active ? (
            <li className="" key={item.title}>
              <NavLink to={item.slug}>
                <Button className="bg-orange-500">{item.title}</Button>
              </NavLink>
            </li>
          ) : null
        )}
      </ul>
    </>
  );
}
