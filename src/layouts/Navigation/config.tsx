import SvgColor from "../../components/SvgColor";
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const icon = (name: string, color?: string) => (
  <Iconify
    icon={name}
    color={color}
    sx={{
      width: 24,
      height: 24,
      display: "inline-block",
      // bgcolor: "currentColor",
    }}
  />
);

const navConfig = [
  {
    title: "My sessions",
    path: `${import.meta.env.BASE_URL}/dashboard/app`,
    icon: icon("mdi:view-dashboard-outline", '#76B0F1'),
  },
  {
    title: "record session",
    path: `${import.meta.env.BASE_URL}/dashboard/record`,
    icon: icon("mdi:record-circle-outline", '#FF4842'),
  },
  {
    title: "FAQ",
    path: `${import.meta.env.BASE_URL}/dashboard/faq`,
    icon: icon("ic:round-support-agent", '#76B0F1'),
  },
  {
    title: "Buy a coffee",
    path: `${import.meta.env.BASE_URL}/dashboard/support`,
    icon: icon("cib:buy-me-a-coffee", '#76B0F1'),
  },
];

export default navConfig;
