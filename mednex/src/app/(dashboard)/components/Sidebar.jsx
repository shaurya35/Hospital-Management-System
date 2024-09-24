"use client";


import { Button } from "../../../components/ui/button";
import {
  LayoutDashboardIcon,
  PillIcon,
  StethoscopeIcon,
  FileTextIcon,
  CreditCard,
  UserIcon,
  MenuIcon,
  ChevronLeft,
  Hospital,
  XIcon,
  CalendarDays,
  VideoIcon,
  Tablets,
  Bed,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useState, useEffect } from "react";
import { getRole } from "@/app/sign-in/role";

const sidebarItems = [
  {
    id: "",
    label: "Dashboard",
    icon: LayoutDashboardIcon,
    visible: ["admin", "doctors", "staff", "patient", "lab", "pharmacy"],
    href: "/dashboard",
  },
  {
    id: "patients",
    label: "Patients",
    icon: UserIcon,
    visible: ["admin", "doctors", "staff", "lab", "pharmacy"],
    href: "/list/patients",
  },
  {
    id: "doctors",
    label: "Doctors",
    icon: StethoscopeIcon,
    visible: ["admin", "doctors", "staff", "lab", "pharmacy", "patients"],
    href: "/list/doctors",
  },
  {
    id: "staffs",
    label: "Staffs",
    icon: Hospital,
    visible: ["admin", "staff", "pharmacy"],
    href: "/list/staffs",
  },
  {
    id: "billing",
    label: "Billing",
    icon: CreditCard,
    visible: ["admin", "staff", "pharmacy"],
    href: "/billing",
  },
  {
    id: "appointments",
    label: "Appointments",
    icon: CalendarDays,
    visible: ["admin", "doctors", "staff", "patient"],
    href: "/appointments",
  },
  {
    id: "consultations",
    label: "Consultations",
    icon: PillIcon,
    visible: ["admin", "doctors", "staff", "lab", "pharmacy", "patient"],
    href: "/consultations",
  },
  {
    id: "reports",
    label: "Reports",
    icon: FileTextIcon,
    visible: ["admin", "doctors", "staff", "lab", "patient"],
    href: "/reports",
  },
  {
    id: "pharmacy",
    label: "Pharmacy",
    icon: Tablets,
    visible: ["admin", "doctors", "staff", "lab", "pharmacy"],
    href: "/pharmacy",
  },
  {
    id: "bed",
    label: "Beds",
    icon: Bed,
    visible: ["admin", "doctors", "staff"],
    href: "/beds",
  },
  {
    id: "video",
    label: "Video Consultation",
    icon: VideoIcon,
    visible: ["admin", "doctors", "staff", "lab", "pharmacy", "patient"],
    href: "https://clone-qp3d.vercel.app/",
  },
];

function signOut() {
  localStorage.removeItem("userRole");
  window.location.href = "/sign-in"; // Redirect to sign-in page
}

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [role, setRole] = useState(null);
  useEffect(() => {
    // Retrieve the role from localStorage only on the client side
    setRole(getRole());
  }, []);

  return (
    <>
      <div className="flex h-screen bg-white relative">
        {/* Sidebar */}
        <div
          className={`bg-gray-100 transition-[width,opacity] duration-300 ${
            sidebarExpanded ? "w-64" : "w-20"
          } max-lg:absolute max-lg:w-0 ${
            sidebarExpanded ? "opacity-100" : "max-lg:opacity-0"
          } flex flex-col h-full`}
        >
          <div
            className={`max-lg:hidden flex items-center ${
              sidebarExpanded
                ? "justify-between px-8 pt-8 pb-3"
                : "justify-center px-4 pt-8 pb-3"
            }  transition-all duration-300 border-r border-gray-200`}
          >
            <h2
              className={`text-3xl font-bold transform transition-all duration-300 ${
                sidebarExpanded ? "opacity-100 translate-x-0" : "hidden"
              } `}
              style={{ transitionProperty: "opacity, transform" }}
            >
              Mednex
            </h2>
            <Button
              className={`max-lg:p-3 p-2 transition-all duration-300 ${
                !sidebarExpanded && "p-4"
              }`}
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
            >
              {sidebarExpanded ? (
                <ChevronLeft className="h-6 w-6 max-lg:size-4" />
              ) : (
                <MenuIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
          <aside
            className={`max-lg:absolute max-lg:bg-gray-100 border border-r border-gray-200 max-lg:transition-all max-lg:duration-300 max-lg:h-screen ${
              !sidebarExpanded && "max-lg:hidden"
            }  flex flex-col justify-between h-full p-4 text-green-dark transition-all duration-300 `}
          >
            <nav>
              <TooltipProvider>
                <ul className="space-y-4">
                  {sidebarItems
                    .filter((item) => item.visible.includes(role))
                    .map((item) => (
                      <li key={item.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a href={item.href}>
                              <Button
                                variant={
                                  activeTab === item.id ? "secondary" : "ghost"
                                }
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full justify-start ${
                                  activeTab === item.id
                                    ? "text-white"
                                    : "text-green-dark hover:text-green-800"
                                } ${!sidebarExpanded && "text-center"}`}
                              >
                                <item.icon
                                  className={`transition-all duration-300 ${
                                    sidebarExpanded
                                      ? "mr-2 h-4 w-4"
                                      : "h-4 w-4 mx-auto"
                                  }`}
                                />
                                {sidebarExpanded && item.label}
                              </Button>
                            </a>
                          </TooltipTrigger>
                          {!sidebarExpanded && (
                            <TooltipContent side="right">
                              <p>{item.label}</p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </li>
                    ))}
                </ul>
              </TooltipProvider>
            </nav>
            <div
              className={`${
                sidebarExpanded &&
                "flex items-center gap-2 w-full border border-gray-200 py-2 px-4  rounded-xl mt-auto"
              }  ${!sidebarExpanded && "px-2 border-0 flex justify-center"} `}
            >
              <Button onClick={signOut}>
              
              <div className={`${!sidebarExpanded && "hidden"}`}>Sign Out</div>
              </Button>
            </div>
          </aside>
        </div>
      </div>

      {/* Button in the top right corner */}
      <div className="absolute top-8 right-8">
        <Button
          className="lg:hidden p-4 transition-all duration-300"
          onClick={() => setSidebarExpanded(!sidebarExpanded)}
          variants="outline"
        >
          {sidebarExpanded ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </Button>
      </div>
    </>
  );
}
