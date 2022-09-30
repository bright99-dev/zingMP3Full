import { useSelector } from 'react-redux';
import { useEffect } from 'react';
export default function ThemProvider({ children }) {
    const themeCurrent = useSelector((state) => state.audio.themeCurrent);
    console.log(themeCurrent);
    document.documentElement.style.setProperty('--primary-bg', themeCurrent.primaryBg);
    document.documentElement.style.setProperty('--layout-bg', themeCurrent.layoutBg);
    document.documentElement.style.setProperty('--sidebar-popup-bg', themeCurrent.sideBarPopupBg);
    document.documentElement.style.setProperty('--alpha-layout-bg', themeCurrent.alphaLayoutBg);
    document.documentElement.style.setProperty('--queue-player-popup-bg', themeCurrent.queueLayoutPopupBg);
    document.documentElement.style.setProperty('--blur-queue-bg', themeCurrent.blurQueueBg);
    document.documentElement.style.setProperty('--purple-primary', themeCurrent.purplePrimary);
    document.documentElement.style.setProperty('--link-text-hover', themeCurrent.linkTextHover);
    document.documentElement.style.setProperty('--chart-bg-img-alpha', themeCurrent.chartBgImgAlpha);
    document.documentElement.style.setProperty('--alpha-active-sidebar', themeCurrent.alphaActiveSidebar);
    document.documentElement.style.setProperty('--white', themeCurrent.white);
    document.documentElement.style.setProperty('--link-text', themeCurrent.linkText);
    document.documentElement.style.setProperty('--grey: #333;', themeCurrent.grey);
    return <div>{children}</div>;
}
