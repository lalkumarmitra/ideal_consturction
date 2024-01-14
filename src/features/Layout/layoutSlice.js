import { createSlice } from "@reduxjs/toolkit";

const screenSize = (s) => {
  let sizes = {
    sm: 768,
    md: 992,
    lg: 1200,
  };
  return s >= sizes.md ? "lg" : s <= sizes.sm ? "sm" : "md";
};
const initialState = {
  lang: "en",
  layout: "vertical",

  topbar: "light",
  sidebar: window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : 'light',
  layoutMode: window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : 'light',

  sidebarImage: "none",
  sidebarSize: screenSize(window.innerWidth)==='md'?'sm':'lg',
  screenSize: screenSize(window.innerWidth),

  layoutStyle: "default",
  layoutPosition: "fixed",
  layoutWidth: "fluid",

  preloader: false,
};

const LayoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    changeLayoutMode: (state, action) => {
      const mode =
        action.payload === "dark"
          ? "dark"
          : action.payload === "light"
          ? "light"
          : state.layoutMode === "dark"
          ? "light"
          : "dark";
      state.layoutMode = mode;
      state.sidebar = mode;
    },
    changeSideBar: (state, action) =>{
        // console.log(action.payload);
        (state.sidebarSize = action.payload === "sm" ? "sm" : "lg")
    },
    changePreloader: (state, action) => (state.preloader = action.payload),
    updateScreenSize: (state, action) => {
        state.screenSize = action.payload
    },
    setLayout: (state, action) => {
      state.lang = action.payload.lang;
      state.layout = action.payload.layout;
      
      state.topbar = action.payload.topbar;
      state.sidebar = action.payload.sidebar;
      state.layoutMode = action.payload.layoutMode;

      state.sidebarImage = action.payload.sidebarImage;
      state.sidebarSize = action.payload.sidebarSize;
      state.screenSize = action.payload.screenSize;

      state.layoutStyle = action.payload.layoutStyle;
      state.layoutPosition = action.payload.layoutPosition;
      state.layoutWidth = action.payload.layoutWidth;
      state.preloader = action.payload.preloade;
    },
  },
});
export const { changeLayoutMode, changeSideBar, changePreloader, setLayout, updateScreenSize } =
  LayoutSlice.actions;
export default LayoutSlice.reducer;
